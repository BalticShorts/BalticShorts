import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import Select from "react-select";
import awsExports from '../../aws-exports';
import { Amplify, API } from 'aws-amplify';
import { createAward } from "../../graphql/mutations";

export function CreateAwards(props) {
  Amplify.configure(awsExports);
  const [awards, setAwards] = useState([
    { name: "", year: "", category: "", comment: "" },
  ]);

  const handleAddAward = () => {
    setAwards((prev) => [
      ...prev,
      { name: "", year: "", category: "", comment: "" },
    ]);
  };

  const handleRemoveAward = (index) => {
    const newAwards = [...awards];
    newAwards.splice(index, 1);
    setAwards(newAwards);
  };

  const handleInputChange = (index, field, value) => {
    const newAwards = [...awards];
    newAwards[index][field] = value;
    setAwards(newAwards);
  };

  const handleSubmit = async () => {
    try {
      for (const award of awards) {
        if (!award.name || !award.year || !award.category) {
          alert("Please fill all required fields for each award.");
          return;
        }

        const awardInput = {
          name: award.name,
          year: parseInt(award.year),
          category: award.category,
          comment: award.comment || null,
          movieID: props.movie.id,
        };

        await API.graphql({
          query: createAward.replaceAll("__typename", ""),
          variables: { input: {...awardInput} },
          authMode: "AWS_IAM",
        });
      }

      alert("Awards added successfully!");
      props.changeState("team", props.movie);
    } catch (error) {
      console.error("Error creating awards:", error);
      alert("Failed to create awards.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <div className="bg-beige p-6">
        <div className="text-2xl pb-5">Create Awards</div>

        {awards.map((award, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Award Name"
                value={award.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Year"
                value={award.year}
                onChange={(e) =>
                  handleInputChange(index, "year", e.target.value)
                }
                className="w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Category"
                value={award.category}
                onChange={(e) =>
                  handleInputChange(index, "category", e.target.value)
                }
                className="w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center mt-4">
              <textarea
                placeholder="Comment (optional)"
                value={award.comment}
                onChange={(e) =>
                  handleInputChange(index, "comment", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleRemoveAward(index)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddAward}
          className="mb-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Add an Award
        </button>

        <div className="m-auto w-full flex p-4 gap-5 justify-center">
          <Button
            className="m-auto p-2 text-black bg-slate-300"
            onClick={() => props.changeState("movie")}
          >
            Back
          </Button>
          <Button
            className="m-auto p-2 text-black bg-blue-500"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
