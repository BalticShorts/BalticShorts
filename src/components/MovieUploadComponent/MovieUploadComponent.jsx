import { useState } from "react";
import moment from "moment";
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const MovieUploadComponent = (props) => {
  const [files, setFiles] = useState({});

  const processFile = async ({ file }) => {
    const fileExtension = file.name.split('.').pop();
    const hashArray = Array.from(new Uint8Array(file.name));
    const currentDate = moment().valueOf();
    const hashHex = hashArray
      .map((a) => a.toString(16).padStart(2, '0'))
      .join('');
    const key = `${hashHex}${currentDate}.${fileExtension}`;
    return { file, key: key };
  };

  return (
    <div>
      <StorageManager
        acceptedFileTypes={['video/*']}
        accessLevel="public"
        maxFileCount={1}
        autoUpload={false}
        isResumable
        processFile={processFile}
        onUploadSuccess={({ key }) => {
          setFiles((prevFiles) => {
            props.setMovieFile(key);
            return {
              ...prevFiles,
              [key]: {
                status: 'success',
              },
            };
          });
        }}
    />
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div key={key}>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}

    </div>
  )
}