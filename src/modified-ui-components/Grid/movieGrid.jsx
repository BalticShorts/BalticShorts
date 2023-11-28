import { useNavigate } from "react-router-dom";
export function getDirectors(data) {
    const result = {};
   
    data.forEach((item) => {
        const itemId = item.id;
        const rez = {}
        const names = []
        rez[itemId] = []
       item.MovieTeam.PersonMovieTeams.items.forEach((person) => {
         if (person.Role.name === 'Režisors') {
            names.push(
             person.Person.name + ' ' + person.Person.surname,
           );
         }
       });
       result[itemId] = names.join(', ');
    });
    return result;
   }
export function MyGridMovies({data}) {
    const navigate = useNavigate();
    const directors = getDirectors(data);
    return (
        
        <div className='left-[15%] w-[75%] h-fit gap-6 flex flex-col items-center relative justify-center '>
            <div className="grid grid-cols-3 items-center">
                {data.map((item) => (
                <div key={item.id} className="p-4 h-full">
                    <div className="SarakstsInLists m-auto w-80 h-48 relative" onClick={() => navigate('/movie/'+item.id)} >
                        <img className="Thumb w-80 h-36 left-0 top-0 relative" src="https://via.placeholder.com/350x144" />
                        <div className="w-80 h-48 left-0 top-0 absolute bg-white bg-opacity-0 border border-black" />
                        <div className="w-80 h-10 relative ml-4 items-center justify-center">
                        <div>
                            <span className="text-black text-base font-bold font-['SchoolBook']">{item.name}<br/></span>
                            <div className="flex inline-col justify-end items-end">
                                <span className="text-black text-start text-sm font-normal font-['SchoolBook']">{directors[item.id]}</span>
                                <span className="text-black text-sm font-normal font-['SchoolBook'] mx-auto">{item.length}', {item.created_year}, {item.origin_country}</span>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
  }