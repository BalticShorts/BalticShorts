import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listPeople, listMoviePlaylists, listAwards, getDownloadUrl } from "../graphql/queries";
import { updatePerson, updateMoviePlaylist, updateAward } from "../graphql/mutations";
import { updateMovieMinimal, listMoviesForReview } from "../custom-queries/queries";

const PENDING_FILTER = { approved: { ne: true } };

const URL_FIELDS = ["hls_url", "dash_url", "cmaf_hls_url", "cmaf_dash_url"];
const REQUIRED_FIELDS = ["hls_url"];

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const MovieTeamRoster = ({ movie, onPersonApproved }) => {
  const credits = movie.MovieTeam?.PersonMovieTeams?.items || [];

  if (credits.length === 0) {
    return <div className="text-sm italic">No cast/crew attached yet.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-sm">Cast / Crew</div>
      {credits.map((credit) => (
        <div key={credit.id} className="flex justify-between items-center border-b border-black/20 pb-1">
          <div className="text-sm">
            {credit.Person?.name} {credit.Person?.surname}
            {credit.Person?.is_entity ? " (Entity)" : ""} — {credit.Role?.name}
            {credit.Person?.approved !== true && (
              <span className="text-red-600 font-bold"> (pending)</span>
            )}
          </div>
          {credit.Person?.approved !== true && credit.Person?.id && (
            <button
              className="btn rounded-xl border w-fit px-2 py-1 text-xs bg-green-300"
              onClick={() => onPersonApproved(credit.Person.id)}
            >
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const MovieReviewForm = ({ movie, onApproved, onApprovePerson }) => {
  const [rawVideoUrl, setRawVideoUrl] = useState("");
  const [fields, setFields] = useState({
    hls_url: movie.hls_url || "",
    dash_url: movie.dash_url || "",
    cmaf_hls_url: movie.cmaf_hls_url || "",
    cmaf_dash_url: movie.cmaf_dash_url || "",
    drm_key_id: movie.drm_key_id || "",
    drm_resource_id: movie.drm_resource_id || "",
  });
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  const loadRawVideo = async () => {
    if (!movie.raw_video_location) return;
    const result = await API.graphql({
      query: getDownloadUrl,
      variables: { key: movie.raw_video_location },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setRawVideoUrl(result.data.getDownloadUrl);
  };

  const handleChange = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    for (const field of REQUIRED_FIELDS) {
      if (!fields[field]) {
        return `${field} is required.`;
      }
    }
    for (const field of URL_FIELDS) {
      if (fields[field] && !isValidUrl(fields[field])) {
        return `${field} must be a valid URL.`;
      }
    }
    return "";
  };

  const handlePublish = async () => {
    const error = validate();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");
    setSaving(true);
    try {
      const payload = { id: movie.id, approved: true };
      Object.keys(fields).forEach((field) => {
        payload[field] = fields[field] || null;
      });
      await API.graphql({
        query: updateMovieMinimal,
        variables: { input: payload },
        authMode: "AWS_IAM",
      });
      onApproved(movie.id);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-black rounded-md p-4 mt-2 flex flex-col gap-3">
      <MovieTeamRoster movie={movie} onPersonApproved={onApprovePerson} />
      <div>
        <button className="btn rounded-xl border w-fit p-2" onClick={loadRawVideo} disabled={!movie.raw_video_location}>
          {movie.raw_video_location ? "Load raw video for review" : "No raw video uploaded"}
        </button>
      </div>
      {rawVideoUrl && (
        <video controls src={rawVideoUrl} className="w-full max-h-[400px]" />
      )}
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(fields).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-bold">
              {field}{REQUIRED_FIELDS.includes(field) && <span className="text-red-600"> *</span>}
            </label>
            <input
              className="border rounded p-2"
              value={fields[field]}
              onChange={handleChange(field)}
              required={REQUIRED_FIELDS.includes(field)}
            />
          </div>
        ))}
      </div>
      {validationError && <div className="text-red-600 text-sm">{validationError}</div>}
      <button
        className="btn rounded-xl border w-fit p-2 bg-green-300"
        onClick={handlePublish}
        disabled={saving}
      >
        {saving ? "Publishing..." : "Publish & Approve"}
      </button>
    </div>
  );
};

const AdminReview = () => {
  const [tab, setTab] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [awards, setAwards] = useState([]);
  const [expandedMovieId, setExpandedMovieId] = useState("");

  const fetchAll = async () => {
    const [movieRes, peopleRes, playlistRes, awardRes] = await Promise.all([
      API.graphql({ query: listMoviesForReview, variables: { filter: PENDING_FILTER }, authMode: "AWS_IAM" }),
      API.graphql({ query: listPeople, variables: { filter: PENDING_FILTER }, authMode: "AWS_IAM" }),
      API.graphql({ query: listMoviePlaylists, variables: { filter: PENDING_FILTER }, authMode: "AWS_IAM" }),
      API.graphql({ query: listAwards, variables: { filter: PENDING_FILTER }, authMode: "AWS_IAM" }),
    ]);
    setMovies(movieRes.data.listMovies.items);
    setPeople(peopleRes.data.listPeople.items);
    setPlaylists(playlistRes.data.listMoviePlaylists.items);
    setAwards(awardRes.data.listAwards.items);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchAll();
  }, []);

  const approve = async (mutation, id) => {
    await API.graphql({
      query: mutation,
      variables: { input: { id, approved: true } },
      authMode: "AWS_IAM",
    });
    fetchAll();
  };

  const approvePerson = (id) => approve(updatePerson, id);

  const tabs = [
    { key: "movies", label: `Movies (${movies.length})` },
    { key: "people", label: `Persons / Teams (${people.length})` },
    { key: "playlists", label: `Playlists (${playlists.length})` },
    { key: "awards", label: `Awards (${awards.length})` },
  ];

  return (
    <div className="w-full h-fit relative bg-beige py-10">
      <div className="w-3/4 m-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Pending Review</h1>
        <div className="flex gap-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`px-4 py-2 rounded-md border ${tab === t.key ? "bg-slate-700 text-white" : "bg-white text-black"}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "movies" && (
          <div className="flex flex-col gap-3">
            {movies.length === 0 && <div>Nothing pending.</div>}
            {movies.map((movie) => (
              <div key={movie.id} className="border border-black rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">{movie.name} ({movie.name_eng})</div>
                    <div className="text-sm">{movie.created_year} | {movie.origin_country}</div>
                  </div>
                  <button
                    className="btn rounded-xl border w-fit p-2"
                    onClick={() => setExpandedMovieId(expandedMovieId === movie.id ? "" : movie.id)}
                  >
                    {expandedMovieId === movie.id ? "Close" : "Review & Publish"}
                  </button>
                </div>
                {expandedMovieId === movie.id && (
                  <MovieReviewForm movie={movie} onApproved={fetchAll} onApprovePerson={approvePerson} />
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "people" && (
          <div className="flex flex-col gap-3">
            {people.length === 0 && <div>Nothing pending.</div>}
            {people.map((person) => (
              <div key={person.id} className="border border-black rounded-md p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold">{person.name} {person.surname}</div>
                  <div className="text-sm">{person.is_entity ? "Entity / Team" : "Person"}</div>
                </div>
                <button className="btn rounded-xl border w-fit p-2 bg-green-300" onClick={() => approve(updatePerson, person.id)}>
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "playlists" && (
          <div className="flex flex-col gap-3">
            {playlists.length === 0 && <div>Nothing pending.</div>}
            {playlists.map((playlist) => (
              <div key={playlist.id} className="border border-black rounded-md p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold">{playlist.title}</div>
                  <div className="text-sm">by {playlist.creator}</div>
                </div>
                <button className="btn rounded-xl border w-fit p-2 bg-green-300" onClick={() => approve(updateMoviePlaylist, playlist.id)}>
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "awards" && (
          <div className="flex flex-col gap-3">
            {awards.length === 0 && <div>Nothing pending.</div>}
            {awards.map((award) => (
              <div key={award.id} className="border border-black rounded-md p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold">{award.name} ({award.year})</div>
                  <div className="text-sm">{award.category}</div>
                </div>
                <button className="btn rounded-xl border w-fit p-2 bg-green-300" onClick={() => approve(updateAward, award.id)}>
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReview;
