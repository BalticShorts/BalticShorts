import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import awsExports from '../../aws-exports';
import { Amplify, API } from 'aws-amplify';
import { listPeople, listRoles } from '../../graphql/queries';
import Select from 'react-select';
import { createMovieTeam, createPerson, createPersonMovieTeam } from '../../graphql/mutations';
import { PhotoUpload } from '../PhotoUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function CreateMovieTeam(props) {
  Amplify.configure(awsExports);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const [roles, setRoles] = useState([]);
  const [personList, setPersonList] = useState([]);
  const [rows, setRows] = useState([{ person: {}, role: '' }]);
  const [isNewPersonMode, setIsNewPersonMode] = useState(false);
  const [personName, setPersonName] = useState('');
  const [personSurname, setPersonSurname] = useState('');
  const [personDescription, setPersonDescription] = useState('');
  const [personPhotoLocation, setPersonPhotoLocation] = useState('');
  const [upload, setUpload] = useState(false);
  const [photoFieldUsed, setPhotoFieldUsed] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loc, setLoc] = useState([]);


  const getPersons = async () => {
    const { data } = await API.graphql({
      query: listPeople,
      authMode: 'AWS_IAM'
     });
    const persons = data.listPeople.items;
    return persons;
  };

  const getRoles = async () => {
    const { data } = await API.graphql({
      query: listRoles,
      authMode: 'AWS_IAM'
     });
    const roles = data.listRoles.items;
    return roles;
  };

  const handleAddRow = () => {
    setRows([...rows, { person: '', role: '' }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
    // console.log(newRows);
  };

  const handleInputChangeName = (index, selectedOption) => {
    // console.log(selectedOption);
    const newRows = [...rows];
    newRows[index].person = selectedOption;
    setRows(newRows);
    // console.log(newRows);
  };

  const handleCreateMovieTeam = async () => {
    const movieTeamSaveQuery = {
      movieTeamMovieId: props.movie.id,
      MovieName: props.movie.name,
    };

    const res = await API.graphql({
      query: createMovieTeam.replaceAll("__typename", ""),
      authMode: 'AWS_IAM',
      variables: {
        input: {
         ...movieTeamSaveQuery,
        },
      },
    });
    return res.data.createMovieTeam.id;
  };

  const handleSubmit = async () => {
    const teamID = await handleCreateMovieTeam();

    
    for (let i = 0; i < rows.length; i++) {
      const { person, role } = rows[i];
      if (!person ||!role) {
        continue;
      }

      const personTeamSaveQuery = {
        personID: person.value,
        roleID: role,
        movieteamID: teamID,
      };

      await API.graphql({
        query: createPersonMovieTeam.replaceAll("__typename", ""),
        authMode: 'AWS_IAM',
        variables: {
          input: {
           ...personTeamSaveQuery,
          },
        },
      });
    }
    await sleep(1000);
    props.movie.movieMovieTeamId = teamID;
    props.changeState('files')
  };

  const handleSubmitPerson = async () => {
    setUpload(true);
    const notification = document.getElementById('notification');
    notification.innerText = 'Person created! Please wait...';
    const photoLoc = await getPhotoLocation();
    const description_confirmed = personDescription === '';
    const photo_confirmed = personPhotoLocation === '';
    const res = await API.graphql({
      query: createPerson.replaceAll("__typename", ""),
      authMode: 'AWS_IAM',
      variables: {
        input: {
          name: personName,
          surname: personSurname,
          description: personDescription,
          photo_location: photoLoc,
          description_confirmed: description_confirmed,
          photo_confirmed: photo_confirmed,
        },
      },
    });
    console.log(res)
    await sleep(2000);
    clearNewPerson();

    setIsNewPersonMode(false);
    notification.innerText = '';
    getPersons().then(persons => {
      setPersonList(persons);
    });
  };
  function clearNewPerson(){
    setPersonName('')
    setPersonSurname('')
    setPersonDescription('');
    setPersonPhotoLocation('');
    setLoc([]);
    setShowOptions(false);
  }
  async function getPhotoLocation(){

    for (let index = 0; index < 10; index++) {
      if((loc.length === 0 && photoFieldUsed) || upload){
        await sleep(200)
      }else{
        setUpload(false);
        setPhotoFieldUsed(false);

        return loc[0];
      }
    }
    setUpload(false);
    setPhotoFieldUsed(false);
    return loc[0]
  }

  const options = personList.map((person) => ({ value: person.id, label: person.name + " " + person.surname }));


  useEffect(() => {
    getRoles().then(roles => {
      setRoles(roles);
    });
    getPersons().then(persons => {
      setPersonList(persons);
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center w-full pb-6">
          <div className="bg-beige p-6">
          <div className='text-2xl pb-5'>{isNewPersonMode ? 'Create Person':'Create Movie Team'}</div>

          {isNewPersonMode ? (
            <>
            <div id='notification' className='text-red-500 text-center w-full'></div>
            <div className='flex gap-6 flex-col'>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="Name"
                  value={personName}
                  onChange={(event) => setPersonName(event.target.value)}
                  placeholder="Name"
                  className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="Surname"
                  value={personSurname}
                  onChange={(event) => setPersonSurname(event.target.value)}
                  placeholder="Surname"
                  className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-6 flex-col">

              <div className='flex items-center flex-row cursor-pointer' onClick={() => setShowOptions(!showOptions)}>
                  <ArrowDropDownIcon />
                  <span>Optional fields</span>
                  <ArrowDropDownIcon/>
                </div>
              </div>
              {showOptions && (
              <div className="flex items-center gap-6 flex-col">

                <div className='flex items-center gap-6'>
                  <div className='justify-center flex items-center flex-col w-2/3'>
                  <span>Person photo</span>

                  <PhotoUpload upload = {upload} photo_type = {'person'} setFieldUsed = {setPhotoFieldUsed} photoLoc = {loc}/>
                  </div>
                  <div className='justify-center flex items-center flex-col'><span>Person description</span>
                  <input
                    type="text"
                    name="Description"
                    value={personDescription}
                    onChange={(event) => setPersonDescription(event.target.value)}
                    placeholder="Person Description"
                    className="h-36 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  </div>
                </div>
              </div>
              )}
            </div>
            <div className='flex p-6 mt-10 justify-center'>
              <Button onClick={() => setIsNewPersonMode(false)}>Cancel</Button>
              <Button onClick={handleSubmitPerson} color="blue">
                Submit
              </Button>
            </div>
          </>
            ):(
              <>
            <div>
              {rows.map((row, index) => (
                <div key={index} className="flex items-center space-x-4 gap-2 p-1">
                <Select
                  options={options}
                  value={{ value: row.person.id, label: row.person.label }}
                  onChange={(selectedOption) => handleInputChangeName(index, selectedOption)}
                  placeholder="Person"
                  className="w-1/2"
                />
                  <select
                    name="role"
                    value={row.role}
                    onChange={(event) => handleInputChange(index, event)}
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.name} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => handleRemoveRow(index)} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddRow} className="mb-4 p-2 ">
                Add a row
              </button>
            </div>
            <div>
              <Button className='left-0 mr-auto' onClick={() => {setIsNewPersonMode(true); clearNewPerson();}}>Create new person</Button>
              {/* <Button onClick={() => props.changeState('movie')}>Back</Button> */}
              <Button onClick={handleSubmit} color="blue">
                Submit
              </Button>
            </div>
            </>

            )}
                      
          </div>
      </div>
    </>
  );
}
