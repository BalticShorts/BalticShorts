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
    <div className="w-full h-auto flex flex-col items-center bg-inherit">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25 items-center w-full bg-inherit`}
      >
        {data.map((item, idx) => (
          <>
            {checkRow(idx) && (
              <>
                {item !== null && (
                  <div
                    key={item.id}
                    className="relative flex flex-col bg-inherit border border-black max-h-[200px] overflow-hidden"
                    onClick={() => navigate(`/playlist/${item.id}`)}
                  >
                    <div className="relative w-full h-full max-h-[100px] overflow-hidden bg-inherit">
                      <img
                        className="w-full h-full object-cover"
                        src={photoSrc[item.id]}
                        alt={item.title}
                      />
                    </div>
                    <div className="m-15 flex flex-col bg-inherit">
                      <span className="typography-body-bold mb-10 uppercase">
                        {item.title}
                      </span>
                      <div className="typography-body-small mb-10">
                        {item.creator}
                      </div>
                      <div className="typography-technical">
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
        <>
          <div className="relative w-full h-10">
            <div className="w-full absolute inset-x-0 -top-20 h-28 bg-gradient-to-t from-gray-100 to-transparent"/>
            <div className="flex justify-center mt-20 ">
              <button
                className="typography-technical z-10"
                onClick={() => setRows(rows + 1)}
              >
                Vairāk ▼
              </button>
            </div>
          </div>
        </>
        )}
    </div>
  );
}