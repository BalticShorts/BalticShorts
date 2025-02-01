import { DisplayedPlaylist } from "../DisplayedPlaylist/DisplayedPlaylist";

export const DisplayedPlaylistGroup = ({ elementsShown, playlists }) => {

  // Create an array with the specified number of elements
  const playlistElements = playlists.slice(0, elementsShown).map((playlist, index) => (
    <DisplayedPlaylist key={index} photoPosition={index % 2 === 0 ? 'left' : 'right'} playlist={playlist} />
  ));

  return <>{playlistElements}</>;
};
