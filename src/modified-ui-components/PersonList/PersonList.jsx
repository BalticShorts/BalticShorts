import { useNavigate } from "react-router-dom";
import { ReactComponent as Triangle } from "../../assets/images/triangle.svg";

export const PersonList = ({ data, onPersonClick }) => {
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
          if (movieId) uniqueMovieIds.add(movieId);
        });

        const uniqueMovieCount = uniqueMovieIds.size;

        const handleClick = () => {
          if (typeof onPersonClick === 'function') {
            onPersonClick(person.id);
          } else {
            navigate('/profile/' + person.id);
          }
        };

        // Get up to 2 roles from PersonRoles
        const rolesArr = (person.PersonRoles?.items || [])
          .map(r => r.Role?.name)
          .filter(Boolean)
          .slice(0, 2);

        return (
          <div
            key={index}
            className="!border-b !border-black flex flex-col md:flex-row justify-between items-start md:items-end bg-inherit w-full hover-opacity cursor-pointer"
            onClick={handleClick}
          >
            <div className="flex flex-col md:items-start items-start my-25">
              <div className="flex gap-2">
                <div className="typography-h1">
                  {person.name} {person.surname}
                </div>
                <div className="typography-technical align-top text-left">
                  {countryNameToCode[person.nationality] || person.nationality}
                </div>
              </div>
              <div className="typography-body-small uppercase">
                {rolesArr.length > 0 ? rolesArr.join(" | ") : ""}
              </div>
            </div>

            <div className="flex flex-col items-end my-25">
              <div className="text-right typography-technical !align-bottom">
                {uniqueMovieCount} {uniqueMovieCount === 1 ? "DARBS" : "DARBI"}
              </div>
              <div className="text-right typography-technical flex flex-row items-center">
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