import { useState, useEffect } from "react";
import AWS from "aws-sdk";

const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";

export const DisplayedPlaylist = ({ photoPosition, playlist }) => {
    const [position, setPosition] = useState(photoPosition);
    const [photoSrc, setPhotoSrc] = useState("");

    useEffect(() => {
        async function fetchPhoto() {
            if (playlist.photo_location) {
                const config = {
                    region: "eu-north-1",
                    credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId }),
                    bucketName: "balticshortsphotos",
                };
                const myBucket = new AWS.S3(config);
                const split = playlist.photo_location.split("/");
                const key = split.pop();
                const bucketLoc = split.join("/");
                const params = {
                    Bucket: bucketLoc,
                    Key: key,
                };
                try {
                    const data = await myBucket.getObject(params).promise();
                    setPhotoSrc(URL.createObjectURL(new Blob([data.Body], { type: "image/png" })));
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setPhotoSrc(require("../../assets/images/no_image_1.jpg"));
                }
            } else {
                setPhotoSrc(require("../../assets/images/no_image_1.jpg"));
            }
        }
        fetchPhoto();
    }, [playlist]);

    return(
        <>
        {position === 'left' ? (
        <div className="w-full h-fit border border-black justify-center items-center flex flex-row" onClick={() => window.location.href=`/playlist/${playlist.id}`}>
            <div className="relative w-[750px] h-[360px] border-r border-black">
                <img className="w-[750px] h-[360px] object-cover" src={photoSrc} alt={playlist.title} />
                <div className="pl-2 absolute bottom-0 w-4/5 text-stone-50 typography-h1-small uppercase mb-15">{playlist.title}</div>
            </div>
            <div className="w-1/3 max-h-[360px] p-7 flex-col justify-between items-start inline-flex ">
                <div></div>
                <div className="m-auto w-72 h-60 text-black text-base font-normal font-['SchoolBook'] break-words">{playlist.description}</div>
                <button className="flex items-center button-default button-white" onClick={() => window.location.href=`/playlist/${playlist.id}`}>
                ▶ Skatīties
              </button>
            </div>
        </div>
        ) : (
        <div className="w-fit h-fit border border-black justify-center items-center flex flex-row" onClick={() => window.location.href=`/playlist/${playlist.id}`}>
            <div className="w-1/3 max-h-[360px] p-7 flex-col justify-between items-start inline-flex ">
                <div></div>
                <div className="m-auto w-72 h-60 text-black text-base font-normal font-['SchoolBook'] break-words">{playlist.description}</div>
                <button className="flex items-center button-default button-white" onClick={() => window.location.href=`/playlist/${playlist.id}`}>
                ▶ Skatīties
                </button>
            </div>
            <div className="relative w-[750px] h-[360px] border-l border-black">
                <img className="w-[750px] h-[360px] object-cover" src={photoSrc} alt={playlist.title} />
                <div className="pl-2 absolute bottom-0 w-4/5 text-stone-50 typography-h1-small uppercase mb-15">{playlist.title}</div>
            </div>
        </div>  
        )}
        </>
    )
}