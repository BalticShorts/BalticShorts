import { useState, useEffect } from "react";
import config from "../../config";

export function PlaylistEditGrid({ data, maxRows, maxColumns, modalOpen }) {
    const [rows, setRows] = useState(maxRows);
    const [columns, setColumns] = useState(maxColumns);
    const [photoSrc, setPhotoSrc] = useState({});

    function getSrc(items) {
        const src = {};
        items.forEach((item) => {
            if (item === null) return;
            src[item.id] = item.photo_location
                ? `${config.photos_bucket_url}/${item.photo_location.replace("balticshortsphotos/", "")}`
                : require("../../assets/images/no_image_1.jpg");
        });
        setPhotoSrc(src);
    }

    useEffect(() => {
        getSrc(data);
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