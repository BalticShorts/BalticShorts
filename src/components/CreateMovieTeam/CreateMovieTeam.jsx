import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import awsExports from '../../aws-exports';
import { Amplify, API } from 'aws-amplify';
import { listCountryCodes, listPeople, listRoles } from '../../graphql/queries';
import Select from 'react-select';
import { createMovieTeam, createPerson, createPersonMovieTeam } from '../../graphql/mutations';
import { PhotoUpload } from '../PhotoUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function CreateMovieTeam(props) {
  Amplify.configure(awsExports);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const [roles, setRoles] = useState([]);
  const [personList, setPersonList] = useState([]);
  const [entityList, setEntityList] = useState([]);
  const [rows, setRows] = useState([{ person: {}, role: '' }]);
  const [entityRows, setEntityRows] = useState([{ entity: {}, role: '' }]);
  const [isNewPersonMode, setIsNewPersonMode] = useState(false);
  const [isNewEntityMode, setIsNewEntityMode] = useState(false);
  const [personName, setPersonName] = useState('');
  const [personSurname, setPersonSurname] = useState('');
  const [personDescription, setPersonDescription] = useState('');
  const [personPhotoLocation, setPersonPhotoLocation] = useState('');
  const [upload, setUpload] = useState(false);
  const [photoFieldUsed, setPhotoFieldUsed] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loc, setLoc] = useState([]);
  const [countryCodeRecords, setCountryCodeRecords] = useState([]);
  const [personCountry, setPersonCountry] = useState(null);
  const [companyId, setCompanyId] = useState('');

  const getPersons = async () => {
    const { data } = await API.graphql({
      query: listPeople,
      authMode: 'AWS_IAM'
     });
    const persons = data.listPeople.items;
    var personList = [];
    var entityList = [];
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].is_entity) {
        entityList.push(persons[i]);
      }else{
        personList.push(persons[i]);
      }
    }
    setPersonList(personList);
    setEntityList(entityList);
    return persons;
  };

  const getRoles = async () => {
    const { data } = await API.graphql({
      query: listRoles,
      authMode: 'AWS_IAM'
     });
    const roles = data.listRoles.items;
    for (let role in roles) {
      if (roles[role].name_eng === 'Production company'){
        setCompanyId(roles[role].id);
        roles.splice(role,1)
      }
    }
    setRoles(roles);
  };

  const handleAddRow = (type) => {
    type === 'person'? setRows([...rows, { person: '', role: '' }]) : setEntityRows([...entityRows, {entity: '', role: ''}]);
  };

  const handleRemoveRow = (index, type) => {
    if(type === 'person') {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }else{
      const newRows = [...entityRows];
      newRows.splice(index, 1);
      setEntityRows(newRows);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
    // console.log(newRows);
  };

  const handleInputChangeName = (index, selectedOption, type) => {
    if (type === 'person') {
    console.log(selectedOption);
    console.log(rows);

    const newRows = [...rows];
    newRows[index].person = selectedOption;
    setRows(newRows);
    }else{
      const newRows = [...entityRows];
      newRows[index].role = companyId;

      if (!entityRows.some(row => row.entity.value === selectedOption.value)) {
        newRows[index].entity = selectedOption;
        setEntityRows(newRows);
      }
    }
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
      if (!person || !role) {
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
    for (let i = 0; i < entityRows.length; i++) {
      const { entity, role } = entityRows[i];
      if (!entity || !role) {
        continue;
      }
      console.log(entity);
      console.log(role)

      const personTeamSaveQuery = {
        personID: entity.value,
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
    notification.innerText = isNewEntityMode ? 'Entity created! Please wait...' : 'Person created! Please wait...';
    if(isNewEntityMode) setPersonSurname('');
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
          nationality: personCountry.label,
          is_entity: isNewEntityMode,
        },
      },
    });
    console.log(res)
    await sleep(2000);
    clearNewPerson();

    setIsNewPersonMode(false);
    notification.innerText = '';
    await getPersons()
  };
  function clearNewPerson(){
    setPersonName('')
    setPersonSurname('')
    setPersonDescription('');
    setPersonPhotoLocation('');
    setLoc([]);
    setShowOptions(false);
    setPersonCountry(null);
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
  const entityOptions = entityList.map((entity) => ({ value: entity.id, label: entity.name}));

  const fetchCountryCodeRecords = async (value) => {
    const newOptions = [];
    const result = (
      await API.graphql({
        query: listCountryCodes.replaceAll("__typename", ""),
        authMode: 'AWS_IAM',
      })
    )?.data?.listCountryCodes?.items;
    console.log(result);
    setCountryCodeRecords(result);
  };

  useEffect(() => {

    async function getData () {
      try {
        await getPersons();
        await fetchCountryCodeRecords();
        await getRoles()
      }catch (err) {
        console.log(err)
      }
    }
    getData();
  }, []);

  const countryOptions = countryCodeRecords.map(record => ({
    label: record.Country,
    value: record.id,
  }));

  const handleCountryChange = selectedOption => {
    setPersonCountry(selectedOption);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full pb-6">
          <div className="bg-beige p-6">
          <div className='text-2xl pb-5'>{isNewPersonMode ? isNewEntityMode ? 'Create an Entity' : 'Create Person': 'Create Movie Team'}</div>

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
                  className={`${isNewEntityMode ? 'w-full' : 'w-1/2'} border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {!isNewEntityMode && (
                  <input
                    type="text"
                    name="Surname"
                    value={personSurname}
                    onChange={(event) => setPersonSurname(event.target.value)}
                    placeholder="Surname"
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
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
                <div className='justify-center flex items-center flex-col min-w-full'><span>{isNewEntityMode ? 'Entity country' : 'Person country'}</span>
                  <Select
                    value={personCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    isSearchable
                    placeholder="Select a country code..."
                    className='min-w-full'
                  />
                  </div>
                <div className='flex items-center gap-6'>
                <div className='flex items-center gap-6'>
                  <div className='justify-center flex items-center flex-col w-2/3'>
                  <span>{isNewEntityMode ? 'Entity photo' : 'Person photo'}</span>

                  <PhotoUpload upload = {upload} photo_type = {'person'} setFieldUsed = {setPhotoFieldUsed} photoLoc = {loc}/>
                  </div>
                  <div className='justify-center flex items-center flex-col'><span>{isNewEntityMode ? 'Entity Description' : 'Person Description'}</span>
                  <input
                    type="text"
                    name="Description"
                    value={personDescription}
                    onChange={(event) => setPersonDescription(event.target.value)}
                    placeholder={isNewEntityMode ? 'Entity Description' : 'Person Description'}
                    className="h-36 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  </div>
                </div>
              </div>
              </div>
              )}
            </div>
            <div className='flex p-6 mt-10 justify-center'>
              <Button className='bg-slate-500' onClick={() => {setIsNewPersonMode(false); setIsNewEntityMode(false)}}>Cancel</Button >
              <Button onClick={handleSubmitPerson} color="blue">
                Submit
              </Button>
            </div>
          </>
            ):(
              <>
              <div className='text-xl pb-5'>Persons</div>
            <div>
              {rows.map((row, index) => (
                <div key={index} className="flex items-center space-x-4 gap-2 p-1">
                <Select
                  options={options}
                  value={{ value: row.person.id, label: row.person.label }}
                  onChange={(selectedOption) => handleInputChangeName(index, selectedOption, 'person')}
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
                  <button type="button" onClick={() => handleRemoveRow(index, 'person')} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddRow('person')} className="mb-4 p-2 ">
                Add a row
              </button>
            </div>
            <div className='text-xl pb-5'>Producējošā kompānija(s)</div>
            <div>
              {entityRows.length !== 0 ? (entityRows.map((row, index) => (
                <div key={index} className="flex items-center space-x-4 gap-2 p-1">
                <Select
                  options={entityOptions}
                  value={{ value: row.entity.id, label: row.entity.label }}
                  onChange={(selectedOption) => handleInputChangeName(index, selectedOption, 'entity')}
                  placeholder="Entity"
                  className="w-1/2"
                />
                  <div>Producējošā kompānija</div>
                  <button type="button" onClick={() => handleRemoveRow(index, 'entity')} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))):(
              <>
              <div className='text-red-500 text-l'>You are making a movie team without a production company!!!</div>
              </>)}
              <button type="button" onClick={() => handleAddRow('entity')} className="mb-4 p-2 ">
                Add a row
              </button>
            </div>
            <div className='m-auto w-full flex p-4 gap-5 justify-center'>
            <Button className='m-auto p-2 text-black bg-slate-300' onClick={() => {setIsNewPersonMode(true); clearNewPerson();}}>Create new person</Button>
            <Button className='m-auto p-2 text-black bg-slate-300' onClick={() => {setIsNewEntityMode(true); setIsNewPersonMode(true); clearNewPerson();}}>Create new production company</Button>
              {/* <Button onClick={() => props.changeState('movie')}>Back</Button> */}
              <Button className='m-auto p-2 text-black' onClick={handleSubmit} color="blue">
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
