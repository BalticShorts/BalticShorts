import { DisplayedPlaylist } from "../DisplayedPlaylist/DisplayedPlaylist";

export const DisplayedPlaylistGroup = ({ elementsShown }) => {

  // Create an array with the specified number of elements
  const playlistElements = Array.from({ length: elementsShown }).map((_, index) => (
    <DisplayedPlaylist key={index} photoPosition={index % 2 === 0 ? 'left' : 'right'} />
  ));

  return <>{playlistElements}</>;
};
