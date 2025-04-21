import { useNavigate } from "react-router-dom";
import { ReactComponent as Triangle } from "../../assets/images/triangle.svg";

export const PersonList = ({ data }) => {
  const navigate = useNavigate();
  const countryNameToCode = {
    "Portugal": "PT",
    "Republic of Ireland": "IE",
    "Czech Republic": "CZ",
    "Malta": "MT",
    "Latvia": "LV",
    "Slovenia": "SI",
    "Poland": "PL",
    "Sweden": "SE",
    "Slovakia": "SK",
    "Luxembourg": "LU",
    "Belgium": "BE",
    "Bulgaria": "BG",
    "Italy": "IT",
    "Denmark": "DK",
    "Finland": "FI",
    "Croatia": "HR",
    "United Kingdom": "GB",
    "England": "EN",
    "France": "FR",
    "Ukraine": "UA",
    "Spain": "ES",
    "Lithuania": "LT",
    "Cyprus": "CY",
    "Russian Federation": "RU",
    "Estonia": "EE",
    "Netherlands": "NL",
    "Greece": "GR",
    "Romania": "RO",
    "Austria": "AT",
    "Germany": "DE",
  };


  return (
    <div className="flex flex-col gap-4 w-full items-center bg-inherit">
      {data.map((person, index) => {
        const teams = person?.PersonMovieTeams?.items || [];

        const uniqueMovieIds = new Set();
        teams.forEach(team => {
          const movieId = team?.MovieTeam?.Movie?.id;
          if (movieId) {
            uniqueMovieIds.add(movieId);
          }
        });

        const uniqueMovieCount = uniqueMovieIds.size;

        return (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-end bg-inherit border-b-2 border-black w-full hover-opacity cursor-pointer"
            onClick={() => navigate('/profile/' + person.id)}
          >
            <div className="flex flex-col md:items-start items-start">
              <div className="flex gap-2">
                <div className="typography-h1">
                  {person.name} {person.surname}
                </div>
                <div className="typography-technical align-top text-left">
                  {countryNameToCode[person.nationality] || person.nationality}
                </div>
              </div>
              <div className="typography-body-small uppercase">{person.role}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-right typography-technical">
                {uniqueMovieCount} {uniqueMovieCount === 1 ? "DARBS" : "DARBI"}
              </div>
              <div className="text-right typography-technical flex flex-row mb-1 items-center">
                <div className="mr-1">VAIRĀK</div>      
                <Triangle />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};