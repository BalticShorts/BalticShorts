import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFileToS3 } from "../../utils/s3Upload";

export function S3FileUpload(props) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const files = uploadedFiles;
    setUploadedFiles([]);
    if (files.length === 0) {
      setUploading(false);
      return;
    }

    for (const file of files) {
      try {
        const key = await uploadFileToS3({
          file,
          uploadType: props.uploadType,
          targetId: props.targetId,
        });
        const location = props.folderMode ? key.substring(0, key.lastIndexOf("/")) : key;
        props.photoLoc.push(location);
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err);
      }
    }
    setUploading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: props.accept,
    maxFiles: props.maxFiles,
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      if (props.setFieldUsed && acceptedFiles.length > 0) {
        props.setFieldUsed(true);
      }
    },
  });

  useEffect(() => {
    if (props.upload && !uploading) {
      setUploading(true);
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.upload]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div {...getRootProps()} className="bg-white border w-full h-36 text-center justify-center align-middle flex flex-col items-center text-black">
        <input {...getInputProps()} />
        <p>Drag and drop files here or </p>
        <div className="text-black font-bold py-2 px-4 border border-grey-900 rounded cursor-pointer">Browse files</div>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
