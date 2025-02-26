import { useState, useEffect } from "react";
import AWS from "aws-sdk";

const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";

export function PlaylistEditGrid({ data, maxRows, maxColumns, modalOpen }) {
    const [rows, setRows] = useState(maxRows);
    const [columns, setColumns] = useState(maxColumns);
    const [photoSrc, setPhotoSrc] = useState({});

    async function getSrc(items) {
        const config = {
            region: "eu-north-1",
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: IdentityPoolId,
            }),
            bucketName: "balticshortsphotos",
        };
        const myBucket = new AWS.S3(config);
        await Promise.all(

            items.map(async (item) => {
                if (item === null) return;
                if (item.photo_location) {
                    const split = item.photo_location.split("/");
                    const key = split.pop();
                    const bucketLoc = split.join("/");
                    const params = {
                        Bucket: bucketLoc,
                        Key: key,
                    };
                    try {
                        const data = await myBucket.getObject(params).promise();
                        photoSrc[item.id] = URL.createObjectURL(
                            new Blob([data.Body], { type: "image/png" })
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                } else {
                    photoSrc[item.id] = require("../../assets/images/no_image_1.jpg");
                }
            })
        );
        setPhotoSrc({ ...photoSrc });
    }

    useEffect(() => {
        async function fetchData() {
            await getSrc(data);
        }
        fetchData();
    }, [data]);

    const checkRow = (idx) => {
        if ((idx + 1) / columns > rows) return false;
        return true;
    };

    return (
        <div className="left-[15%] w-3/4 h-fit gap-6 flex flex-col items-center relative justify-center p-4">
            <div className={`grid grid-cols-${columns} gap-4`}>
                {data.map((item, idx) => (
                    <>
                    {checkRow(idx) && item !== null && (
                        <div
                            key={item.id}
                            className="flex flex-col shadow-md bg-inherit border border-black max-h-[292px] sm:min-h-[292px] overflow-hidden"
                            onClick={() => modalOpen(item.id)}
                        >
                            <div className="relative w-full h-full sm:h-48 sm:min-h-[192px] overflow-hidden bg-inherit">
                                <img
                                    className="w-full h-full object-cover"
                                    src={photoSrc[item.id] || "https://via.placeholder.com/350x100"}
                                    alt={item.title}
                                />
                            </div>
                            <div className="mt-2 flex flex-col bg-inherit p-4">
                                <span className="text-black text-lg font-bold">
                                    {item.title}
                                </span>
                                <div className="text-sm text-gray-600 mt-1">
                                    by {item.creator}
                                </div>
                                <div className="text-sm text-gray-500">
                                    FILMAS {item.size}
                                </div>
                            </div>
                        </div>
                    )}
                    </>
                ))}
            </div>
            {data.length / columns > rows && (
                <div className="flex justify-center mt-6">
                    <button
                        className="px-4 py-2 text-black rounded-md shadow-md"
                        onClick={() => setRows(rows + 1)}
                    >
                        Vairāk
                    </button>
                </div>
            )}
        </div>
    );
}