import { useEffect, useState } from "react";
import { Footer } from "../modified-ui-components/Footer";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { listMoviePlaylists } from "../graphql/queries";
import { MyGridPlaylists } from "../modified-ui-components/Grid";
import { PlaylistEditGrid } from "../modified-ui-components/Grid/playlistEditGrid";
import PlaylistUpload from "./PlaylistUpload";

const Playlist = () => {
    const navigate = useNavigate();
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const [allPlaylists, setAllPlaylists] = useState([]);
    const [highlightedPlaylists, setHighPlaylists] = useState([]);
    const [otherPlaylists, setOtherPlaylists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [playlistId, setPlaylistId] = useState('');

    const handleModalClose = (changes_made) => {
        setShowModal(false);
        console.log('changes made', changes_made);
        if (changes_made) fetchPlaylists();
    };

    const handleModalOpen = (id) => {
        setShowModal(true);
        setPlaylistId(id);
    };

    const fetchPlaylists = async () => {
        try {
          const playlistData = await API.graphql({
            query : listMoviePlaylists,
            variables :  {
              filter: {
                is_public: {
                  eq: true
                }
              }
            },
            authMode: 'AWS_IAM'
          });
          setAllPlaylists(playlistData.data.listMoviePlaylists.items);
          await splitPlaylists(playlistData.data.listMoviePlaylists.items);
        } catch (error) {
          console.log('Error on fetchnig playlists', error);
        }
    }
    const splitPlaylists = async (playlists) => {
        setHighPlaylists([]);
        setOtherPlaylists([]);
        playlists.map( (item) => {
            console.log(item)
            console.log(item.is_recommended)
            if(item.is_recommended){
                setHighPlaylists(prev => [...prev, item]);
            } else {
                setOtherPlaylists(prev => [...prev, item]);
            }
        })
        console.log(highlightedPlaylists)
        console.log(otherPlaylists)
    }

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        fetchPlaylists();
      }, []);


    return(
        <>
            <div className="w-full h-fit relative bg-beige">
            {showModal ? (
                <PlaylistUpload onClose={handleModalClose} id={playlistId} recommendedCount={highlightedPlaylists.length}></PlaylistUpload>
            ) : (
                <>
                    <div className="flex justify-end items-end px-20 mt-5">
                        <div className="w-fit h-fit button bg-green-300 text-black px-4 py-2 rounded-md cursor-pointer" onClick={() => handleModalOpen('')}>Add Playlist</div>
                    </div>
                    <div className="w-full h-fit relative bg-beige pb-20">
                        <div className='w-[75%] py-8 flex flex-col m-auto'>
                            <div className="Komanda w-full h-5 relative text-black text-xl font-bold font-['Arial'] tracking-wide">Highlighted Playlists (On main page - maximum 3)</div>
                            {highlightedPlaylists.length > 0 &&
                                <PlaylistEditGrid data = {highlightedPlaylists !== undefined ? highlightedPlaylists : []} maxRows={1} maxColumns={3} modalOpen={handleModalOpen}></PlaylistEditGrid>
                            }
                        </div>
                        <div className='w-[75%] py-8 flex flex-col m-auto'>
                            <div className="Komanda w-full h-5 relative text-black text-xl font-bold font-['Arial'] tracking-wide">Other Playlists</div>
                            {otherPlaylists.length > 0 &&
                                <PlaylistEditGrid data = {otherPlaylists !== undefined ? otherPlaylists : []} maxRows={2} maxColumns={3} modalOpen={handleModalOpen}></PlaylistEditGrid>
                            }
                        </div>
                    </div>
                </>
                )
            }

                <Footer/>
            </div>
        </>
    );
}


export default Playlist;