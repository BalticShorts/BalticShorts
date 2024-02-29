import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import moment from "moment";

export function PhotoUpload(props) {
    var AWS = require('aws-sdk');

    const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

  function updateAWSConfigAndGetClient(cognitoIdentityCredentials, region) {
    if (cognitoIdentityCredentials != null) {
      AWS.config.region = region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoIdentityCredentials);
    }
  }

  useEffect(() => {
    updateAWSConfigAndGetClient(IdentityPoolId, "eu-north-1");
  }, []);   

const handleUpload = async () => {
  const uId = uuid() + "-" + moment().valueOf();
  const location = `balticshortsphotos/${props.photo_type}/${uId}`
  console.log("uploadedFiles")
  console.log(uploadedFiles)
  if(uploadedFiles.length !== 0){
    if(props.movie){
      props.movie.photo_location = location;
    }
    if(props.photo_type === 'thumbnail'){
      const thumbLoc = location + "/" + uploadedFiles[0].name;
      props.photoLoc.push(thumbLoc);
    }else{
      props.photoLoc.push(location);
    }
    console.log("props.photoLoc")
    console.log(props.photoLoc)
  }else{
    setUploading(false);
    return;
  }
  const files = uploadedFiles;
  setUploadedFiles([]);

    const config = {
      region: "eu-north-1",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
      }),
      bucketName : "balticshortsphotos",
    };
    var myBucket = new AWS.S3(config);
    
    Array.from(files).forEach(file => {
        const params = {
            Body: file,
            Key: file.name,
            ACL: 'public-read',
            Bucket: location,
        }
        myBucket.putObject(params).on("httpUploadProgress", (evt) => {
            console.log(
              "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
            );
          })
          .promise();
    });
    // console.log("photo done")
    setUploading(false);

  }
    const { getRootProps, getInputProps } = useDropzone({
        accept: {'image/*': []},
        maxFiles: props.photo_type === 'thumbnail' ? 1 : undefined,
    onDrop: (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
        // console.log(acceptedFiles);
    },
    });

    useEffect(() => {
        if(props.upload && !uploading){
          setUploading(true);
          handleUpload();
        }
    }, [props.upload]);

    useEffect(() => {
      if(props.photo_type === 'person'){
        if(uploadedFiles.length > 0){
          console.log("here")
          props.setFieldUsed(true)
        }
      }
  }, [uploadedFiles]);
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
        <div {...getRootProps()} className="bg-white border w-full h-36 text-center justify-center align-middle flex flex-col items-center text-black">
            <input {...getInputProps()} />
            <p>Drag and drop files here or </p>
            <div className="text-black font-bold py-2 px-4 border border-grey-900 rounded cursor-pointer" >Browse files</div>
            <ul>
                {uploadedFiles.map((file) => (
                <li key={file.name}>{file.name}</li>
                ))}
            </ul>
        </div>
    </div>
  );
}