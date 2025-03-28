import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaCheck } from "react-icons/fa";
import EditListModal from "../EditListModal/EditListModal";
import { API, graphqlOperation } from "aws-amplify";
import { updateMoviePlaylist, deleteMovieMoviePlaylist, createMovieMoviePlaylist } from "../../graphql/mutations";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { getUserPlaylists } from "../../custom-queries/queries";

const WatchlistModal = ({ isOpen, onClose, movieId }) => {
  const context = useContext(GlobalContext);
  const [lists, setLists] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [userId, setUserId] = useState(context.currentUser.id);
  const [personName, setPersonName] = useState(context.currentUser.name + ' ' + context.currentUser.surname);

  const fetchUserLists = async () => {
    try {
      const userData = await API.graphql({
        query: getUserPlaylists,
        variables: { id: userId },
        authMode: 'AWS_IAM'
      });
      const userLists = userData.data.getUserProfile.MoviePlaylists.items;
      const updatedLists = userLists.map((list) => ({
        ...list,
        selected: list.movies.items.some((movie) => movie.movie.id === movieId),
      }));
      updatedLists.sort((a, b) => (a.title === "Watch Later" ? -1 : b.title === "Watch Later" ? 1 : 0));
      setLists(updatedLists);
    } catch (error) {
      console.error("Error fetching user lists:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserLists();
    }
  }, [isOpen, movieId, userId]);

  const toggleSelection = (id) => {
    setLists(lists.map((list) =>
      list.id === id ? { ...list, selected: !list.selected } : list
    ));
  };

  const openEditModal = (list, mode = "edit") => {
    setEditingList(list);
    setEditModalOpen(true);
    setEditMode(mode);
  };

  const saveChanges = async () => {
    try {
      for (const list of lists) {
        const movieInList = list.movies.items.find((movie) => movie.movie.id === movieId);
        if (list.selected && !movieInList) {
          await API.graphql({
            query: createMovieMoviePlaylist,
            variables: { input: { moviePlaylistId: list.id, movieId: movieId } },
            authMode: 'AWS_IAM'
          });
          await API.graphql({
            query: updateMoviePlaylist,
            variables: { input: { id: list.id, size: list.size + 1 } },
            authMode: 'AWS_IAM'
          });
        } else if (!list.selected && movieInList) {
          await API.graphql({
            query: deleteMovieMoviePlaylist,
            variables: { input: { id: movieInList.id } },
            authMode: 'AWS_IAM'
          });
          await API.graphql({
            query: updateMoviePlaylist,
            variables: { input: { id: list.id, size: list.size - 1 } },
            authMode: 'AWS_IAM'
          });
        }
      }
      onClose();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-beige border border-black p-6 w-96 shadow-lg z-10">
        <div className="flex justify-between items-center border-b border-black pb-2">
          <h2 className="text-lg font-bold">Pievienot sarakstam</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => toggleSelection(list.id)}
              className="flex items-center w-full border border-black px-3 py-2 text-left hover:bg-gray-100"
            >
              {list.selected ? <FaCheck className="mr-2 text-black" /> : <FaPlus className="mr-2 text-black" />}
              <span className="flex-1">{list.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => openEditModal({ name: "", description: "", personName: personName, userId: userId}, "add")}
          className="mt-4 flex items-center mx-auto border border-black px-3 py-2 hover:bg-gray-100"
        >
          <FaPlus className="text-black" />
        </button>

        <button
          onClick={saveChanges}
          className="mt-4 w-full bg-black text-beige px-3 py-2 hover:bg-gray-800"
        >
          Saglabāt
        </button>
      </div>

      {isEditModalOpen && (
        <EditListModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            fetchUserLists();
          }}
          list={editingList}
          mode={editMode}
        />
      )}
    </div>
  );
};

export default WatchlistModal;
