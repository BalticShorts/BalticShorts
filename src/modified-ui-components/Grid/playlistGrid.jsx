import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";

const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";

export function MyGridPlaylists({ data, maxRows, maxColumns }) {
  const [photoSrc, setPhotoSrc] = useState({});
  const [columns, setColumns] = useState(maxColumns);

  AWS.config.region = "eu-north-1";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId });

  const navigate = useNavigate();
  const [rows, setRows] = useState(maxRows);

  async function getSrc(items) {
    try {
      const newPhotoSrc = {};
      items.forEach((item) => {
        if (item.photo_location && item.photo_location !== null && item.photo_location !== undefined)
          newPhotoSrc[item.id] = `https://balticshortsphotos.s3.eu-north-1.amazonaws.com/${item.photo_location.replace("balticshortsphotos/", "")}`;
        else
          newPhotoSrc[item.id] = require("../../assets/images/no_image_1.jpg");
      });
      setPhotoSrc(newPhotoSrc);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (data.length === 0) return;
      await getSrc(data);
    }
    fetchData();
  }, [data]);

  const checkRow = (idx) => {
    if ((idx + 1) / maxColumns > rows) return false;
    return true;
  };

  return (
    <div className="w-full h-auto p-4 flex flex-col items-center bg-inherit">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center w-full bg-inherit`}
      >
        {data.map((item, idx) => (
          <>
            {checkRow(idx) && (
              <>
                {item !== null && (
                  <div
                    key={item.id}
                    className="relative flex flex-col shadow-md bg-inherit border border-black max-h-[292px] sm:min-h-[292px] overflow-hidden"
                    onClick={() => navigate(`/playlist/${item.id}`)}
                  >
                    <div className="relative w-full h-full sm:h-48 sm:min-h-[192px] overflow-hidden bg-inherit">
                      <img
                        className="w-full h-full object-cover"
                        src={photoSrc[item.id]}
                        alt={item.title}
                      />
                    </div>
                    <div className="mt-2 flex flex-col bg-inherit p-4 ">
                      <span className="text-black text-lg font-bold">
                        {item.title}
                      </span>
                      <div className="text-sm text-gray-600 mt-1">
                        by {item.creator}
                      </div>
                      <div className="text-sm text-gray-500">
                        FILMAS {item.size} | SEKOTĀJI 10
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>
      {data.length / maxColumns > rows && (
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