import { useEffect, useState } from "react";
import { MovieUpload } from "../modified-ui-components/MovieUpload";
import { PhotoUpload } from "../components/PhotoUpload";
import { CreateMovieTeam } from "../components/CreateMovieTeam";
import { MovieUploadComponent } from "../components/MovieUploadComponent";
import { API } from "aws-amplify";
import { updateMovie } from "../graphql/mutations";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { SubtitleUpload } from "../components/SubtitleUpload";
import { CreateAwards } from "../components/CreateAwards";
import { TrailerUploadComponent } from "../components/TrailerUploadComponent/TrailerUploadComponent";

const Upload = () => {
    const navigate = useNavigate();

    const [tab, setTab] = useState('movie')
    const [movie, setMovie] = useState({})
    const [movieFile, setMovieFile] = useState('')
    const [guid, setGuid] = useState('');
    const [upload, setUpload] = useState(false);
    const [photoLoc, setPhotoLoc] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [trailerLoc, setTrailerLoc] = useState([]);
    
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function changeState(value, movie = null){
        setTab(value);
        if(movie!== null){
            setMovie(movie);
        }
    }

    async function handleFileUpload(){
        if(movieFile === ''){
            alert("Please add the movie file!")
            setUpload(false);
            return;
        }
        setUpload(true);
        await sleep(1000);
        changeState('done')
        movie.uploaded_at = moment().format();
        const photoL = await getPhotoLocation();
        const movId = await guidGotten('movie');
        const trailerL = await getTrailerLocation();
        const thumbLoc = await getThumbnailLocation();

        movie.guid = movId;
        movie.photo_location = photoL;
        movie.thumbnail_location = thumbLoc;
        movie.trailer_location = trailerL;
        delete movie.createdAt;
        delete movie.updatedAt;
        delete movie.MovieInPlaylists;
        delete movie.MovieTeam;
        delete movie.MovieType;
        delete movie.awards;
        
        const response = await API.graphql({
            query: updateMovie.replaceAll("__typename", ""),
            variables : {
                input: movie
            },
            authMode: 'AWS_IAM'
        });
        clearState();
        sleep(2000);
        navigate('/');
    }
    async function getPhotoLocation(){

        for (let index = 0; index < 10; index++) {
          if(photoLoc.length === 0){
            await sleep(200)
          }else{
            setUpload(false);
            return photoLoc[0];
          }
        }
        setUpload(false);
        return photoLoc[0]
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

      async function getTrailerLocation(){

        for (let index = 0; index < 10; index++) {
          if(trailerLoc.length === 0){
            await sleep(200)
          }else{
            setUpload(false);
            return trailerLoc[0];
          }
        }
        setUpload(false);
        return trailerLoc[0]
      }

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        setTab('movie');
      }, []);
    
    const guidGotten = async (type) => {
        var g = guid;
        const requestOptions = {
            method: 'POST',
        };
        const addOn = type === 'movie' ? movieFile : trailerLoc
        for (let index = 0; index < 10; index++) {
            if(g === ''){
                await sleep(2000);
                const data = await fetch(
                    'https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/uploadFile/' + addOn ,
                    requestOptions
                ).then((response) => response.json());
                if(data.Items.length > 0){
                    g = data.Items[0].guid.S;
                }
            }else{
                return g;
            }
        }
        return g;
    }

    async function clearState(){
        setMovieFile('');
        setMovie({});
        setUpload(false);
        setGuid('');
        setPhotoLoc([]);
        setThumbnail([]);
        setTrailerLoc([]);
    }

    return(
        <>
        <div className="w-full h-fit relative bg-beige">
            <div className="py-10 w-full h-full relative">
            {tab ==='movie' && <MovieUpload tab = {tab} changeState = {changeState}/>}
            {tab ==='awards' && <CreateAwards tab = {tab} changeState = {changeState} movie = {movie}/>}
            {tab === 'team' && (
                <>
                    <CreateMovieTeam changeState = {changeState} movie = {movie}/>
                </>
                )}
                {tab === 'files' && 
                (
                <>
                    <div className="flex justify-center flex-col gap-4">
                        <h1 className="text-2xl">Upload Movie Thumbnail</h1>
                        <PhotoUpload movie = {movie} upload = {upload} photo_type = {'thumbnail'} photoLoc = {thumbnail}/>
                    </div>
                    <div className="flex justify-center flex-col gap-4">
                        <h1 className="text-2xl">Upload Movie Photos</h1>
                        <PhotoUpload movie = {movie} upload = {upload} photo_type = {'movies'} photoLoc = {photoLoc}/>
                    </div>
                    <div className="flex justify-center flex-col gap-4">
                        <h1 className="text-2xl">Upload Movie Video file</h1>
                        <MovieUploadComponent movie = {movie} setMovieFile = {setMovieFile}/>
                    </div>
                    <div className="flex justify-center flex-col gap-4">
                        <h1 className="text-2xl">Upload Movie Subtitle file</h1>
                        <SubtitleUpload movie = {movie} upload = {upload}/>
                    </div>
                    <div className="flex justify-center flex-col gap-4">
                        <h1 className="text-2xl">Upload Movie Trailer file</h1>
                        <TrailerUploadComponent movie = {movie} upload = {upload} video_type = {'trailer'} videoLoc = {trailerLoc}/>
                    </div>
                    <div className="flex justify-center gap-4 p-5">
                        {/* <button className="button rounded-xl border w-fit p-2" onClick={() => changeState('team')}>Back</button> */}
                        <button className="btn rounded-xl border w-fit p-2" onClick={() => {handleFileUpload()}}>BE DONE</button>
                    </div>

                </>
                )
                }
                {tab ==='done' && 
                    <div className="w-full m-auto text-center text-3xl">
                        Filma ir Pievienota. Lūdzu uzgaidiet, kamēr tiekat pārsūtīts uz sākumlapu!
                    </div>
                }

            </div>
        </div>
        </>
    );
}


export default Upload;