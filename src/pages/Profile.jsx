import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProfile, updatePerson, deletePersonRole, createPersonRole } from "../custom-queries/queries";
import { API } from 'aws-amplify';
import { MyGridMovies } from "../modified-ui-components/Grid/movieGrid";
import { GlobalContext } from "../App";
import { listRoles } from "../graphql/queries";
import { useTranslation } from "react-i18next";

const fetchProfile = async id => {
    const profileData = await API.graphql({
        query : getProfile,
        variables :  {
            id:id
        },
        authMode: 'AWS_IAM'
    });
    const roleData = await API.graphql({
        query : listRoles,
        authMode: 'AWS_IAM'
    });
    const person = profileData.data.getPerson;
    const roles = roleData.data.listRoles?.items || [];
    return { profile: person, roles };
}

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

function Profile({ personId }) {
    const context = useContext(GlobalContext);
    const [profile, setProfile] = useState({});
    const [movieCount, setMovieCount] = useState(0);
    const [editing, setEditing] = useState(false);
    const [editProfile, setEditProfile] = useState({});
    const [saving, setSaving] = useState(false);
    const [roles, setRoles] = useState([]);
    var { id, mode } = useParams();
    if (personId !== undefined && personId !== null) {
        id = personId;
    }
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const get = async () => {
          if (id === undefined || id === null)
            return;
          const { profile: profileData, roles: rolesList } = await fetchProfile(id);
          const filteredMovies = profileData.PersonMovieTeams?.items.filter(team => team.MovieTeam.Movie !== null);
          profileData.PersonMovieTeams.items = filteredMovies;
          try {     
            setProfile(profileData);
            setEditProfile({
              ...profileData,
              roleIds: Array.isArray(profileData.PersonRoles?.items)
                ? profileData.PersonRoles.items.map(r => r.roleID)
                : []
            });
            setRoles(rolesList);
            const uniqueMovies = new Set(filteredMovies?.map(team => team.MovieTeam.Movie.id));
            setMovieCount(uniqueMovies.size);
          } catch (error) {
            console.log('Error on fetching: ', error);
          }
        }
        get();
      }, [id]);

    const groupedMovies = profile.PersonMovieTeams?.items.reduce((acc, team) => {
      const roleName = team.Role.name;
      if (!acc[roleName]) {
        acc[roleName] = [];
      }
      acc[roleName].push(team.MovieTeam.Movie);
      return acc;
    }, {});

    useEffect(() => {
      document.title = `Baltic Shorts - ${t("Persona")}`;
    }, []);

    const isAdmin = context.currentUser && context.currentUser.is_admin;

    const handleChange = (e) => {
      const { name, value, type, multiple, options } = e.target;
      if (name === "roleIds" && multiple) {
        const selected = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selected.push(options[i].value);
          }
        }
        setEditProfile(prev => ({
          ...prev,
          roleIds: selected
        }));
      } else {
        setEditProfile(prev => ({
          ...prev,
          [name]: type === "checkbox" ? e.target.checked : value
        }));
      }
    };

    const handleSave = async () => {
      setSaving(true);
      try {
        const existingRoles = profile.PersonRoles?.items || [];
        for (const pr of existingRoles) {
          if (pr && pr.id) {
            await API.graphql({
              query: deletePersonRole,
              variables: { input: { id: pr.id } },
              authMode: 'AWS_IAM'
            });
          }
        }

        for (const roleId of editProfile.roleIds || []) {
          await API.graphql({
            query: createPersonRole,
            variables: {
              input: {
                personID: editProfile.id,
                roleID: roleId
              }
            },
            authMode: 'AWS_IAM'
          });
        }

        await API.graphql({
          query: updatePerson,
          variables: {
            input: {
              id: editProfile.id,
              name: editProfile.name,
              surname: editProfile.surname,
              description: editProfile.description,
              Instagram: editProfile.Instagram,
              Facebook: editProfile.Facebook,
              IMBD: editProfile.IMBD,
              email: editProfile.email,
              is_entity: editProfile.is_entity,
              nationality: editProfile.nationality
            }
          },
          authMode: 'AWS_IAM'
        });

        setEditing(false);
        const { profile: updatedProfile } = await fetchProfile(editProfile.id);
        setProfile(updatedProfile);
        setEditProfile({
          ...updatedProfile,
          roleIds: (updatedProfile.PersonRoles?.items || []).map(r => r.roleID)
        });
      } catch (err) {
        alert("Failed to save changes.");
        console.error(err);
      }
      setSaving(false);
    };

    const handleCancel = () => {
      setEditProfile({
        ...profile,
        roleIds: (profile.Roles || []).map(r => r.id)
      });
      setEditing(false);
    };

    return (
      <div className="min-h-screen bg-inherit text-black max-w-[1100px] desktop:m-auto mobile:mx-25">
        <section className="mt-25 mb-50 flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex gap-2">
              {editing ? (
                <>
                  <input
                    className="typography-h1"
                    name="name"
                    value={editProfile.name || ""}
                    onChange={handleChange}
                  />
                  <input
                    className="typography-h1"
                    name="surname"
                    value={editProfile.surname || ""}
                    onChange={handleChange}
                  />
                  <select
                    className="typography-technical align-top text-left"
                    name="nationality"
                    value={editProfile.nationality || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select nationality</option>
                    {Object.keys(countryNameToCode).map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <div className="typography-h1">
                    {profile.name} {profile.surname}
                  </div>
                  <div className="typography-technical align-top text-left">
                    {countryNameToCode[profile.nationality] || profile.nationality}
                  </div>
                </>
              )}
            </div>
            {editing ? (
              <>
                <div className="typography-body-small mt-2 mb-1">
                  {roles
                    .filter(role => (editProfile.roleIds || []).includes(role.id))
                    .map(role => role.name)
                    .join(", ") || <span style={{color:'#888'}}>No roles selected</span>}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {roles.map(role => {
                    const selected = (editProfile.roleIds || []).includes(role.id);
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => {
                          setEditProfile(prev => {
                            const ids = prev.roleIds || [];
                            if (ids.includes(role.id)) {
                              return { ...prev, roleIds: ids.filter(id => id !== role.id) };
                            } else {
                              return { ...prev, roleIds: [...ids, role.id] };
                            }
                          });
                        }}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "16px",
                          border: selected ? "2px solid #2563eb" : "1px solid #ccc",
                          background: selected ? "#2563eb" : "#f3f3f3",
                          color: selected ? "#fff" : "#222",
                          cursor: "pointer",
                          fontWeight: selected ? "bold" : "normal"
                        }}
                      >
                        {role.name}
                      </button>
                    );
                  })}
                </div>
                <textarea
                  className="typography-body mt-4 max-w-3xl"
                  name="description"
                  value={editProfile.description || ""}
                  onChange={handleChange}
                />
                <div className="flex gap-2 mt-2">
                  <label>
                    <input
                      type="checkbox"
                      name="is_entity"
                      checked={!!editProfile.is_entity}
                      onChange={handleChange}
                    /> Entity
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="typography-body-small mt-2 !uppercase">
                  {(profile.PersonRoles?.items || []).map(r => t(r.Role?.name)).filter(Boolean).join(", ")}
                </div>
                <div className="typography-technical mt-2 uppercase">{movieCount} {movieCount === 1 ? t("Darbs") : t("Darbi")}</div>
                <p className="typography-body mt-4 max-w-3xl">
                  {profile.description}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-end">
            {editing ? (
              <>
                <input
                  className="mb-2 typography-technical"
                  name="email"
                  value={editProfile.email || ""}
                  onChange={handleChange}
                  placeholder="E-PASTS"
                />
                <input
                  className="mb-2 typography-technical"
                  name="Instagram"
                  value={editProfile.Instagram || ""}
                  onChange={handleChange}
                  placeholder="INSTAGRAM"
                />
                <input
                  className="mb-2 typography-technical"
                  name="Facebook"
                  value={editProfile.Facebook || ""}
                  onChange={handleChange}
                  placeholder="FACEBOOK"
                />
                <input
                  className="typography-technical"
                  name="IMBD"
                  value={editProfile.IMBD || ""}
                  onChange={handleChange}
                  placeholder="IMDB"
                />
              </>
            ) : (
              <>
                <a href={`mailto:${profile.email}`} className="mb-2 typography-technical hover-opacity cursor-pointer uppercase">{t("E-pasts")}</a>
                <a href={profile.Instagram} className="mb-2 typography-technical hover-opacity cursor-pointer uppercase">{t("Instagram")}</a>
                <a href={profile.IMBD} className="typography-technical hover-opacity cursor-pointer uppercase">{t("IMDB")}</a>
              </>
            )}
            {isAdmin && !editing && (
              <div
                className="button-white p-1"
                onClick={() => setEditing(true)}
              >
                Edit User
              </div>
            )}
            {editing && (
              <div className="flex gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>

        {groupedMovies && Object.keys(groupedMovies).map((roleName, index) => (
          <section key={index} className="w-full mx-auto mb-100">
            <div className="flex flex-row mb-25">
              <div className="typography-h2 font-bold mr-1">{t(roleName)}</div>
              <div className="typography-technical">{groupedMovies[roleName].length}</div>
            </div>
            <MyGridMovies data={groupedMovies[roleName]} maxRows={1} maxColumns={3} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}/>
          </section>
        ))}
      </div>
    );
}

export default Profile;