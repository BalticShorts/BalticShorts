import { useState } from "react";
import { ListMoviesByPerson } from "../../custom-queries/queries";
import { API } from "aws-amplify";
import { MyGridMovies } from "../Grid";
import { useNavigate } from "react-router-dom";

export const PersonList = ({ data }) => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const navigate = useNavigate();

  const fetchMovies = async (personID) => {
    if (movies[personID]) return;


    setLoading(personID);
    setError(null);

    try {
      const result = await API.graphql({
        query: ListMoviesByPerson,
        authMode: 'AWS_IAM',
        variables : {
          personID: personID
        },
      });
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const moviesData = result.data.listPersonMovieTeams.items.map(
        (item) => item.MovieTeam.Movie
      );

      setMovies((prev) => ({
        ...prev,
        [personID]: moviesData,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  const toggleCollapse = (personID) => {
    setCollapsed((prev) => ({
      ...prev,
      [personID]: !prev[personID],
    }));
  };


  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {data.map((person, index) => (
        <>
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-start md:items-end bg-inherit p-4 border-b-2 border-black w-4/5"
          >
          <div className="flex flex-col md:items-start items-start">
            <div className="flex items-center gap-2 ">
              <div className="text-black/80 text-2xl font-bold uppercase leading-tight">
                {person.name} {person.surname}
              </div>
              <div className="text-gray-500 text-xs tracking-wide align-top text-left pr-20">
                {person.nationality}
              </div>
            </div>
            <div className="text-black/70 text-sm uppercase font-medium">{person.role}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div
                className="text-right text-gray-500 text-xs tracking-wide cursor-pointer hover:underline"
                onClick={() => {
                  fetchMovies(person.id);
                  toggleCollapse(person.id);
                }}              >
              {collapsed[person.id] ? "AIZVĒRT" : "DARBI"}
              </div>
            <div className="text-right text-gray-500 text-xs tracking-wide cursor-pointer hover:underline" onClick={() => navigate('/profile/'+person.id)}>
              VAIRĀK
            </div>
          </div>
        </div>
        {collapsed[person.id] && movies[person.id]?.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end bg-inherit p-4 border-b-2 border-black w-4/5">
              <MyGridMovies
                data={movies[person.id]}
                maxRows={2}
                maxColumns={3}
              />
            </div>
          )}
        </>
      ))}
    </div>
  );
};
