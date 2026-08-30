const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");

const REGION = process.env.REGION;
const PUBLIC_BUCKET = process.env.PUBLIC_BUCKET;
const RAW_BUCKET = process.env.RAW_BUCKET;
const UPLOAD_URL_EXPIRY_SECONDS = 300;
const DOWNLOAD_URL_EXPIRY_SECONDS = 900;

const UPLOAD_TYPE_CONFIG = {
  thumbnail: { bucket: PUBLIC_BUCKET, prefix: "movies" },
  photo: { bucket: PUBLIC_BUCKET, prefix: "movies" },
  trailer: { bucket: PUBLIC_BUCKET, prefix: "movies" },
  subtitle: { bucket: PUBLIC_BUCKET, prefix: "movies" },
  "person-photo": { bucket: PUBLIC_BUCKET, prefix: "people" },
  "playlist-thumbnail": { bucket: PUBLIC_BUCKET, prefix: "playlists" },
  "raw-video": { bucket: RAW_BUCKET, prefix: "raw-video" },
};

const s3 = new S3Client({ region: REGION });

function sanitizeExtension(fileExtension) {
  const cleaned = (fileExtension || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  if (!cleaned) {
    throw new Error("A valid fileExtension is required");
  }
  return cleaned;
}

function buildKey(uploadType, targetId, fileExtension) {
  const config = UPLOAD_TYPE_CONFIG[uploadType];
  if (!config) {
    throw new Error(`Unsupported uploadType: ${uploadType}`);
  }
  if (!config.bucket) {
    throw new Error(`No bucket configured for uploadType: ${uploadType}`);
  }
  const ext = sanitizeExtension(fileExtension);
  const id = targetId || "unassigned";
  const uuid = crypto.randomUUID();
  const fileName = uploadType === "raw-video" ? `original-${uuid}.${ext}` : `${uuid}.${ext}`;
  const key = `${config.prefix}/${id}/${uploadType}/${fileName}`;
  return { bucket: config.bucket, key };
}

async function handleGetUploadUrl(input) {
  const { uploadType, fileExtension, targetId } = input || {};
  const { bucket, key } = buildKey(uploadType, targetId, fileExtension);

  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: UPLOAD_URL_EXPIRY_SECONDS });

  return { uploadUrl, key };
}

async function handleGetDownloadUrl(key) {
  if (!key || typeof key !== "string") {
    throw new Error("A key is required");
  }
  const command = new GetObjectCommand({ Bucket: RAW_BUCKET, Key: key });
  return getSignedUrl(s3, command, { expiresIn: DOWNLOAD_URL_EXPIRY_SECONDS });
}

async function handleListFolder(prefix) {
  if (!prefix || typeof prefix !== "string") {
    throw new Error("A prefix is required");
  }
  const normalizedPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
  const command = new ListObjectsV2Command({ Bucket: PUBLIC_BUCKET, Prefix: normalizedPrefix });
  const result = await s3.send(command);
  return (result.Contents || []).map((item) => item.Key);
}

exports.handler = async (event) => {
  switch (event.fieldName) {
    case "getUploadUrl":
      return handleGetUploadUrl(event.arguments.input);
    case "getDownloadUrl":
      return handleGetDownloadUrl(event.arguments.key);
    case "listFolder":
      return handleListFolder(event.arguments.prefix);
    default:
      throw new Error(`Unsupported fieldName: ${event.fieldName}`);
  }
};
