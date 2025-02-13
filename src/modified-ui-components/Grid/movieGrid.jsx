import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";
var AWS = require("aws-sdk");

export function getDirectors(data) {
  const result = {};
  data.forEach((item) => {
    if (item === null) return;
    const itemId = item.id;
    const names = [];
    if (item.MovieTeam === null) return;
    item.MovieTeam?.PersonMovieTeams.items.forEach((person) => {
      if (person.Role.name === "Režisors") {
        names.push(`${person.Person.name} ${person.Person.surname}`);
      }
    });
    result[itemId] = names.join(", ");
  });
  return result;
}

export function MyGridMovies({ data, maxRows, maxColumns }) {
    const [photoSrc, setPhotoSrc] = useState({});
    AWS.config.region = "eu-north-1";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(IdentityPoolId);
  
    const navigate = useNavigate();
    const [rows, setRows] = useState(maxRows);
    const [directors, setDirectors] = useState(getDirectors(data));
  
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
          if (item.thumbnail_location) {
            const split = item.thumbnail_location.split("/");
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
    }
  
    useEffect(() => {
      async function fetchData() {
        await getSrc(data);
        setDirectors(getDirectors(data));
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
                  className="flex flex-col shadow-md bg-inherit border border-black max-h-[292px] sm:min-h-[292px] overflow-hidden"
                  onClick={() => navigate('/movie/'+encodeURIComponent(item.name) + '/' + encodeURIComponent(item.id))}
                >
                  <div className="relative w-full h-full sm:h-48 sm:min-h-[192px] overflow-hidden bg-inherit">
                    <img
                      className="w-full h-full object-cover"
                      src={photoSrc[item.id]}
                      alt={item.name}
                    />
                  </div>
                  <div className="mt-2 flex flex-col bg-inherit p-4 ">
                    <span className="text-black text-lg font-bold">
                      {item.name}
                    </span>
                    <div className="text-sm text-gray-600 mt-1">
                      {directors[item.id]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.length}', {item.created_year}, {item.origin_country}
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
  