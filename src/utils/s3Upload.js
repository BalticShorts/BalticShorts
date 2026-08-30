import { API } from "aws-amplify";
import { getUploadUrl } from "../graphql/mutations";

export async function uploadFileToS3({ file, uploadType, targetId }) {
  const fileExtension = file.name.split(".").pop();

  const result = await API.graphql({
    query: getUploadUrl,
    variables: {
      input: {
        uploadType,
        fileExtension,
        targetId: targetId || null,
      },
    },
    authMode: "AWS_IAM",
  });

  const { uploadUrl, key } = result.data.getUploadUrl;

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Upload failed with status ${uploadResponse.status}`);
  }

  return key;
}
