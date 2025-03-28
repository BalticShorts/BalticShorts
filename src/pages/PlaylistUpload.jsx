import { useContext, useEffect, useState } from "react";
import { PhotoUpload } from "../components/PhotoUpload";
import { API } from "aws-amplify";
import { listMovies } from "../graphql/queries";
import { SearchableMovieDropdown } from "../components/SearchableMovieDropdown";
import { getMoviePlaylistWithMovie } from "../custom-queries/queries";
import { createMovieMoviePlaylist, createMoviePlaylist, deleteMovieMoviePlaylist, deleteMoviePlaylist, updateMoviePlaylist } from "../graphql/mutations";
import { GlobalContext } from "../App";
import AWS from "aws-sdk";

const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";

const PlaylistUpload = ({onClose, id, recommendedCount}) => {
    const context = useContext(GlobalContext)

    const [playlist, setPlaylist] = useState({})
    const [upload, setUpload] = useState(false);
    const [thumbnail, setThumbnail] = useState([]);
    const [photoSrc, setPhotoSrc] = useState("");

    const [listTitle, setListTitle] = useState('');
    const [description, setDescription] = useState('');
    const [availability, setAvailability] = useState('Privāts');
    const [recommended, setRecommended] = useState(false);
    const [movies, setMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);    
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setUpload(true);
        const thumbLoc = await getThumbnailLocation();
        setMessage('Playlist is saving... Please wait...');
        var response = null;
        var variables = {
            input : {
                title: listTitle,
                description: description,
                is_public: availability === 'Publisks',
                is_recommended: recommended,
                photo_location: thumbLoc,
                size: selectedMovies.length
            }
        }

        if(id !== ''){
            variables.input.id = id;
            response = await API.graphql({
                query: updateMoviePlaylist.replaceAll("__typename", ""),
                variables : variables,
                authMode: 'AWS_IAM'
            }).then(res => res.data.updateMoviePlaylist );        
        }else{
            variables.input.creator = context.currentUser.name + " " + context.currentUser.surname;
            variables.input.userprofileID = context.currentUser.id;
            response = await API.graphql({
                query: createMoviePlaylist.replaceAll("__typename", ""),
                variables : variables,
                authMode: 'AWS_IAM'
            }).then(res => res.data.createMoviePlaylist);
            id = response.id;
        }

        response.movies.items.map(async (link) => {
            await API.graphql({
                query: deleteMovieMoviePlaylist.replaceAll("__typename", ""),
                variables : {
                    input : {
                        id: link.id
                    }
                },
                authMode: 'AWS_IAM'
            });
        })

        selectedMovies.map(async (movie) => {
            const res = await API.graphql({
                query: createMovieMoviePlaylist.replaceAll("__typename", ""),
                variables : {
                    input : {
                        movieId: movie.id,
                        moviePlaylistId: id
                    }
                },
                authMode: 'AWS_IAM'
            });
        })
        clearState();
        await sleep(2000);
        onClose(true); 
        // add the picture preview if there is photo location
    };

    const handleDelete = async () => {
        setMessage('Playlist is deleting... Please wait...');
        await API.graphql({
            query: deleteMoviePlaylist.replaceAll("__typename", ""),
            variables : {
                input : {
                    id: id
                }
            },
            authMode: 'AWS_IAM'
        });
        clearState();
        await sleep(2000);
        onClose(true); 
    };
    
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function checkRecommended(value){
        if((value && recommendedCount < 3) || !value){
            setRecommended(value);
        }else{
            alert('You can only add 3 recommended Playlists\nPlease remove one to add another');
            setRecommended(false);
        }
    }

    async function getThumbnailLocation(){
        for (let index = 0; index < 10; index++) {
            if(thumbnail.length === 0){
                await sleep(200)
            }else{
                setUpload(false);
                return thumbnail[0];
            }
        }
        setUpload(false);
        return thumbnail[0]
    }

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        setMessage('');
        API.graphql({
            query: listMovies,
            authMode: 'AWS_IAM'
        }).then(res => {
            setMovies(res.data.listMovies.items);
        })
      }, []);
    useEffect(() => {
        // scroll to top on page load
        if(id !== ''){
            API.graphql({
                query: getMoviePlaylistWithMovie,
                variables: {
                        id: id
                },
                authMode: 'AWS_IAM'
            }).then(res => {
                setListTitle(res.data.getMoviePlaylist.title);
                setDescription(res.data.getMoviePlaylist.description);
                setAvailability(res.data.getMoviePlaylist.is_public? 'Publisks' : 'Privāts');
                setSelectedMovies(res.data.getMoviePlaylist.movies.items.map(item => item.movie));
                setRecommended(res.data.getMoviePlaylist.is_recommended);
                setPlaylist(res.data.getMoviePlaylist);
                setThumbnail(res.data.getMoviePlaylist.photo_location ? [res.data.getMoviePlaylist.photo_location] : []);
                fetchPhoto(res.data.getMoviePlaylist.photo_location);
            })
        }
      }, [id]);

    async function fetchPhoto(thumbnail_location) {
        if (thumbnail_location) {
            const config = {
                region: "eu-north-1",
                credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId }),
                bucketName: "balticshortsphotos",
            };
            const myBucket = new AWS.S3(config);
            const split = thumbnail_location.split("/");
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
                setPhotoSrc(require("../assets/images/no_image_1.jpg"));
            }
        } else {
            setPhotoSrc(require("../assets/images/no_image_1.jpg"));
        }
    }

    async function clearState(){
        setPlaylist({});
        setUpload(false);
        setThumbnail([]);
    }

    const handleRemoveThumbnail = () => {
        setThumbnail([]);
        setPhotoSrc("");
    };

    return(
        <>
            <div className="w-full h-fit relative bg-beige py-10">

                <div className="bg-beige p-4 rounded-lg shadow-md max-w-md mx-auto">
                {message === '' ? (
                    <>
                <h1 className="text-xl font-semibold mb-4">{id ? "Rediģēt sarakstu"  : "Izveidot sarakstu"}</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="listTitle">
                    NOSAUKUMS
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="listTitle"
                    type="text"
                    placeholder="Title"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    APRAKSTS
                    </label>
                    <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
                    PIEJAMĪBA
                    </label>
                    <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    >
                    <option>Privāts</option>
                    <option>Publisks</option>
                    </select>
                </div>
                <div className="mb-6 flex items-center">
                    <div className="mr-3 text-gray-700 font-medium">
                        RECOMMENDED
                    </div>
                    <div className="relative cursor-pointer">
                        <input
                        type="checkbox"
                        id="toggle"
                        className="sr-only"
                        checked={recommended}
                        onChange={(e) => checkRecommended(e.target.checked)}
                        />
                        <label htmlFor="toggle" className={`block w-14 h-8 ${recommended ? 'bg-green-700' : 'bg-slate-700'} rounded-full`}>
                        <span className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${recommended ? 'translate-x-6'  : ''}`}></span>
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
                    FILMAS
                    </label>
                    <SearchableMovieDropdown items={movies} selectedItems={selectedMovies} setSelectedItems={setSelectedMovies} />
                </div>

                <div className="mb-6">       
                    <div className="flex justify-center flex-col gap-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Thumbnail">THUMBNAIL</label>
                        <PhotoUpload upload = {upload} photo_type = {'thumbnail'} photoLoc = {thumbnail}/>
                        {thumbnail.length > 0 && (
                            photoSrc && <img className="w-full h-auto mt-4" src={photoSrc} alt="Thumbnail Preview" />
                        )}
                        {(thumbnail.length > 0) && (
                            <button
                                className="bg-red-500 hover:bg-red-700 text-beige font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mt-4"
                                type="button"
                                onClick={handleRemoveThumbnail}
                            >
                                Noņemt attēlu
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="bg-slate-500 hover:bg-slate-700 text-beige font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => onClose(false)}
                    >
                    Atpakaļ
                    </button>
                    <button
                    className="bg-red-500 hover:bg-red-700 text-beige font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleDelete}
                    >
                    Dzēst sarakstu
                    </button>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-beige font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSave}
                    >
                    Saglabāt izmaiņas
                    </button>
                </div>
                </>) : (
                    <>
                        <div className="flex justify-center items-center min-h-[50vh]">
                            <div className="text-xl font-semibold mb-4 text-center">{message}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
        
        </>
    );
}

export default PlaylistUpload;