import { useState } from "react";
import moment from "moment";
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const MovieUploadComponent = (props) => {
  const [files, setFiles] = useState({});

  const processFile = async ({ file }) => {
    const fileExtension = file.name.split('.').pop();
  
    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const currentDate = moment().valueOf();
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, '0'))
          .join('');
        // console.log(`${hashHex}.${fileExtension}`)
        return { file, key: `${hashHex}${currentDate}.${fileExtension}` };
      });
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