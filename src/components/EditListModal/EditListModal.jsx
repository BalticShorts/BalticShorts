import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { API } from "aws-amplify";
import { createMoviePlaylist, updateMoviePlaylist } from "../../graphql/mutations";

const EditListModal = ({ isOpen, onClose, list, mode }) => {
  const [title, setTitle] = useState(list?.name || "");
  const [description, setDescription] = useState(list?.description || "");
  const [privacy, setPrivacy] = useState(list?.privacy || "Privāts");
  const [creator, setCreator] = useState(list?.personName || "");
  const [userprofileID, setUserprofileID] = useState(list?.userId || null);

  const saveList = async () => {
    try {
      if (mode === "add") {
        await API.graphql({
          query: createMoviePlaylist.replaceAll("__typename", ""),
          variables: {
            input: {
              creator,
              title,
              description,
              is_public: privacy === "Publisks",
              userprofileID,
              size: 0
            }
          },
          authMode: 'AWS_IAM'
        });
      } else if (mode === "edit") {
        await API.graphql({
          query: updateMoviePlaylist.replaceAll("__typename", ""),
          variables: {
            input: {
              id: list.id,
              creator,
              title,
              description,
              is_public: privacy === "Publisks",
              size: list.size
            }
          },
          authMode: 'AWS_IAM'
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-beige border border-black p-6 w-96 shadow-lg z-20">
        <div className="flex justify-between items-center border-b border-black pb-2">
          <h2 className="text-lg font-bold">
            {mode === "add" ? "Pievienot sarakstu" : "Rediģēt sarakstu"}
          </h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold">NOSAUKUMS</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black w-full p-2 mt-1"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold">APRAKSTS</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-black w-full p-2 mt-1 h-24"
          />
        </div>

        {mode === "edit" && (
          <div className="mt-4">
            <label className="block text-sm font-semibold">PIEEJAMĪBA</label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="border border-black w-full p-2 mt-1"
            >
              <option value="Privāts">Privāts</option>
              <option value="Publisks">Publisks</option>
            </select>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {mode === "edit" && (
            <button className="border border-black px-4 py-2 text-black hover:bg-red-100">
              Dzēst sarakstu
            </button>
          )}
          <button
            onClick={saveList}
            className="border border-black bg-black text-white px-4 py-2 hover:bg-gray-800 ml-auto"
          >
            Saglabāt izmaiņas
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditListModal;
