import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFileToS3 } from "../../utils/s3Upload";

export const MovieUploadComponent = (props) => {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState(null);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("uploading");
    try {
      const key = await uploadFileToS3({
        file,
        uploadType: "raw-video",
        targetId: props.movie?.id,
      });
      props.setMovieFile(key);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    maxFiles: 1,
    onDrop: handleDrop,
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div {...getRootProps()} className="bg-white border w-full h-36 text-center justify-center align-middle flex flex-col items-center text-black">
        <input {...getInputProps()} />
        <p>Drag and drop the movie file here or </p>
        <div className="text-black font-bold py-2 px-4 border border-grey-900 rounded cursor-pointer">Browse files</div>
      </div>
      {fileName && (
        <div>
          {fileName}: {status}
        </div>
      )}
    </div>
  );
};
