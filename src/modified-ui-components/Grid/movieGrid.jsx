import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";
var AWS = require('aws-sdk');
export function getDirectors(data) {
    const result = {};
   
    data.forEach((item) => {
        const itemId = item.id;
        const rez = {}
        const names = []
        rez[itemId] = []
        if(item.MovieTeam === null)
            return;
       item.MovieTeam.PersonMovieTeams.items.forEach((person) => {
         if (person.Role.name === 'Režisors') {
            names.push(
             person.Person.name + ' ' + person.Person.surname,
           );
         }
       });
       result[itemId] = names.join(', ');
    });
    return result;
   }
export function MyGridMovies({data, maxRows, maxColumns}) {
    const [photoSrc, setPhotoSrc] = useState({});
    AWS.config.region = "eu-north-1";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(IdentityPoolId);
    
    const navigate = useNavigate();

    const [rows, setRows] = useState(maxRows);
    const [columns, setColumns] = useState(maxColumns);
    const [directors, setDirectors] = useState(getDirectors(data));

    async function getSrc(items) {
        const config = {
            region: "eu-north-1",
            credentials: new AWS.CognitoIdentityCredentials({
              IdentityPoolId: IdentityPoolId,
            }),
            bucketName : "balticshortsphotos",
        };
        var myBucket = new AWS.S3(config);
        items.forEach((item) => {
            if(item.thumbnail_location){
                const split = item.thumbnail_location.split("/");
                const key = split.pop()
                const bucketLoc = split.join("/");
                var params = {
                    Bucket: bucketLoc, 
                    Key: key
                };
                myBucket.getObject(params, function(err, data) {
                    if (err) console.log(err, err.stack);
                    else {
                        photoSrc[item.id] = URL.createObjectURL(new Blob([data.Body], { type: 'image/png' }));
                    }
                });      
            }else{
                photoSrc[item.id] = require("../../assets/images/no_image_1.jpg");
                // "https://via.placeholder.com/350x144"
            }
        });    
        console.log(photoSrc)
    }

    useEffect(async() => {
        await getSrc(data);
        setRows(maxRows);
        setColumns(maxColumns);
        setDirectors(getDirectors(data));
    }, [])

    useEffect(() => {
        // fix photo loading
    }, [photoSrc])

    const checkRow = (idx) => {    
        if((idx + 1) / columns > rows)
            return false
        return true
    }

    return (
        
        <div className='w-[75%] h-fit gap-6 flex flex-col items-center relative justify-center '>
            <div className={`grid grid-cols-3 items-center`}>
                {data.map((item, idx) => (
                    <>
                    {checkRow(idx) && (
                        <div key={item.id} className="p-4 h-full">
                            <div className="SarakstsInLists m-auto w-80 h-48 relative" onClick={() => navigate('/movie/'+item.id)} >
                                <img className="Thumb w-80 h-36 left-0 top-0 relative" src={photoSrc[item.id]} />
                                <div className="w-80 h-48 left-0 top-0 absolute bg-white bg-opacity-0 border border-black" />
                                <div className="w-80 h-10 relative ml-4 items-center justify-center">
                                <div>
                                    <span className="text-black text-base font-bold font-['SchoolBook']">{item.name}<br/></span>
                                    <div className="flex inline-col justify-end items-end">
                                        <span className="text-black text-start text-sm font-normal font-['SchoolBook']">{directors[item.id]}</span>
                                        <span className="text-black text-sm font-normal font-['SchoolBook'] mx-auto">{item.length}', {item.created_year}, {item.origin_country}</span>
                                    </div>

                                </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
                ))}
                {data.length / columns > rows && (
                    <div className={`h-24 relative flex -top-8 mb-4 col-span-3`}>
                        <div className='w-full h-20 relative flex opacity-60'>
                            <div className="w-full h-16 relative bg-gradient-to-b from-stone-50 to-zinc-300" />
                        </div>
                            <div className="w-full h-2.5 m-auto mt-12 absolute flex items-center justify-center">
                            <div className="w-full h-2 top-[1px] relative text-black text-xs font-normal font-['Arial'] tracking-wide text-center" onClick={() => setRows(rows+1)}>Vairāk</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  }