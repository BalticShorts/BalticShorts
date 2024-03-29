/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import {
  getMovie,
  listMovieMoviePlaylists,
  listMoviePlaylists,
  listMovieTeams,
  listMovieTypes,
  movieMoviePlaylistsByMovieId,
} from "../graphql/queries";
import { API } from "aws-amplify";
import {
  createMovieMoviePlaylist,
  deleteMovieMoviePlaylist,
  updateMovie,
  updateMovieTeam,
} from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function MovieUpdateForm(props) {
  const {
    id: idProp,
    movie: movieModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    name_eng: "",
    genre: "",
    description: "",
    description_eng: "",
    screen_language: "",
    captions_language: "",
    origin_country: "",
    length: "",
    created_year: "",
    uploaded_at: "",
    guid: "",
    MovieTeam: undefined,
    MovieInPlaylists: [],
    times_watched: "",
    MovieType: undefined,
    photo_location: "",
    thumbnail_location: "",
    age_rating: "",
    subtitles_location: "",
    creators_comment: "",
    trailerGuid: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [name_eng, setName_eng] = React.useState(initialValues.name_eng);
  const [genre, setGenre] = React.useState(initialValues.genre);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [description_eng, setDescription_eng] = React.useState(
    initialValues.description_eng
  );
  const [screen_language, setScreen_language] = React.useState(
    initialValues.screen_language
  );
  const [captions_language, setCaptions_language] = React.useState(
    initialValues.captions_language
  );
  const [origin_country, setOrigin_country] = React.useState(
    initialValues.origin_country
  );
  const [length, setLength] = React.useState(initialValues.length);
  const [created_year, setCreated_year] = React.useState(
    initialValues.created_year
  );
  const [uploaded_at, setUploaded_at] = React.useState(
    initialValues.uploaded_at
  );
  const [guid, setGuid] = React.useState(initialValues.guid);
  const [MovieTeam, setMovieTeam] = React.useState(initialValues.MovieTeam);
  const [MovieTeamLoading, setMovieTeamLoading] = React.useState(false);
  const [movieTeamRecords, setMovieTeamRecords] = React.useState([]);
  const [MovieInPlaylists, setMovieInPlaylists] = React.useState(
    initialValues.MovieInPlaylists
  );
  const [MovieInPlaylistsLoading, setMovieInPlaylistsLoading] =
    React.useState(false);
  const [movieInPlaylistsRecords, setMovieInPlaylistsRecords] = React.useState(
    []
  );
  const [times_watched, setTimes_watched] = React.useState(
    initialValues.times_watched
  );
  const [MovieType, setMovieType] = React.useState(initialValues.MovieType);
  const [MovieTypeLoading, setMovieTypeLoading] = React.useState(false);
  const [movieTypeRecords, setMovieTypeRecords] = React.useState([]);
  const [photo_location, setPhoto_location] = React.useState(
    initialValues.photo_location
  );
  const [thumbnail_location, setThumbnail_location] = React.useState(
    initialValues.thumbnail_location
  );
  const [age_rating, setAge_rating] = React.useState(initialValues.age_rating);
  const [subtitles_location, setSubtitles_location] = React.useState(
    initialValues.subtitles_location
  );
  const [creators_comment, setCreators_comment] = React.useState(
    initialValues.creators_comment
  );
  const [trailerGuid, setTrailerGuid] = React.useState(
    initialValues.trailerGuid
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = movieRecord
      ? {
          ...initialValues,
          ...movieRecord,
          MovieTeam,
          MovieInPlaylists: linkedMovieInPlaylists,
          MovieType,
        }
      : initialValues;
    setName(cleanValues.name);
    setName_eng(cleanValues.name_eng);
    setGenre(cleanValues.genre);
    setDescription(cleanValues.description);
    setDescription_eng(cleanValues.description_eng);
    setScreen_language(cleanValues.screen_language);
    setCaptions_language(cleanValues.captions_language);
    setOrigin_country(cleanValues.origin_country);
    setLength(cleanValues.length);
    setCreated_year(cleanValues.created_year);
    setUploaded_at(cleanValues.uploaded_at);
    setGuid(cleanValues.guid);
    setMovieTeam(cleanValues.MovieTeam);
    setCurrentMovieTeamValue(undefined);
    setCurrentMovieTeamDisplayValue("");
    setMovieInPlaylists(cleanValues.MovieInPlaylists ?? []);
    setCurrentMovieInPlaylistsValue(undefined);
    setCurrentMovieInPlaylistsDisplayValue("");
    setTimes_watched(cleanValues.times_watched);
    setMovieType(cleanValues.MovieType);
    setCurrentMovieTypeValue(undefined);
    setCurrentMovieTypeDisplayValue("");
    setPhoto_location(cleanValues.photo_location);
    setThumbnail_location(cleanValues.thumbnail_location);
    setAge_rating(cleanValues.age_rating);
    setSubtitles_location(cleanValues.subtitles_location);
    setCreators_comment(cleanValues.creators_comment);
    setTrailerGuid(cleanValues.trailerGuid);
    setErrors({});
  };
  const [movieRecord, setMovieRecord] = React.useState(movieModelProp);
  const [linkedMovieInPlaylists, setLinkedMovieInPlaylists] = React.useState(
    []
  );
  const canUnlinkMovieInPlaylists = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMovie.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMovie
        : movieModelProp;
      const MovieTeamRecord = record ? await record.MovieTeam : undefined;
      setMovieTeam(MovieTeamRecord);
      const linkedMovieInPlaylists = record
        ? (
            await API.graphql({
              query: movieMoviePlaylistsByMovieId.replaceAll("__typename", ""),
              variables: {
                movieId: record.id,
              },
            })
          ).data.movieMoviePlaylistsByMovieId.items.map((t) => t.moviePlaylist)
        : [];
      setLinkedMovieInPlaylists(linkedMovieInPlaylists);
      const MovieTypeRecord = record ? await record.MovieType : undefined;
      setMovieType(MovieTypeRecord);
      setMovieRecord(record);
    };
    queryData();
  }, [idProp, movieModelProp]);
  React.useEffect(resetStateValues, [
    movieRecord,
    MovieTeam,
    linkedMovieInPlaylists,
    MovieType,
  ]);
  const [currentMovieTeamDisplayValue, setCurrentMovieTeamDisplayValue] =
    React.useState("");
  const [currentMovieTeamValue, setCurrentMovieTeamValue] =
    React.useState(undefined);
  const MovieTeamRef = React.createRef();
  const [
    currentMovieInPlaylistsDisplayValue,
    setCurrentMovieInPlaylistsDisplayValue,
  ] = React.useState("");
  const [currentMovieInPlaylistsValue, setCurrentMovieInPlaylistsValue] =
    React.useState(undefined);
  const MovieInPlaylistsRef = React.createRef();
  const [currentMovieTypeDisplayValue, setCurrentMovieTypeDisplayValue] =
    React.useState("");
  const [currentMovieTypeValue, setCurrentMovieTypeValue] =
    React.useState(undefined);
  const MovieTypeRef = React.createRef();
  const getIDValue = {
    MovieTeam: (r) => JSON.stringify({ id: r?.id }),
    MovieInPlaylists: (r) => JSON.stringify({ id: r?.id }),
    MovieType: (r) => JSON.stringify({ id: r?.id }),
  };
  const MovieTeamIdSet = new Set(
    Array.isArray(MovieTeam)
      ? MovieTeam.map((r) => getIDValue.MovieTeam?.(r))
      : getIDValue.MovieTeam?.(MovieTeam)
  );
  const MovieInPlaylistsIdSet = new Set(
    Array.isArray(MovieInPlaylists)
      ? MovieInPlaylists.map((r) => getIDValue.MovieInPlaylists?.(r))
      : getIDValue.MovieInPlaylists?.(MovieInPlaylists)
  );
  const MovieTypeIdSet = new Set(
    Array.isArray(MovieType)
      ? MovieType.map((r) => getIDValue.MovieType?.(r))
      : getIDValue.MovieType?.(MovieType)
  );
  const getDisplayValue = {
    MovieTeam: (r) => `${r?.MovieName ? r?.MovieName + " - " : ""}${r?.id}`,
    MovieInPlaylists: (r) => `${r?.creator ? r?.creator + " - " : ""}${r?.id}`,
    MovieType: (r) => `${r?.type ? r?.type + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    name_eng: [],
    genre: [],
    description: [],
    description_eng: [],
    screen_language: [],
    captions_language: [],
    origin_country: [],
    length: [],
    created_year: [],
    uploaded_at: [],
    guid: [],
    MovieTeam: [],
    MovieInPlaylists: [],
    times_watched: [],
    MovieType: [],
    photo_location: [],
    thumbnail_location: [],
    age_rating: [],
    subtitles_location: [],
    creators_comment: [],
    trailerGuid: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchMovieTeamRecords = async (value) => {
    setMovieTeamLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ MovieName: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listMovieTeams.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMovieTeams?.items;
      var loaded = result.filter(
        (item) => !MovieTeamIdSet.has(getIDValue.MovieTeam?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMovieTeamRecords(newOptions.slice(0, autocompleteLength));
    setMovieTeamLoading(false);
  };
  const fetchMovieInPlaylistsRecords = async (value) => {
    setMovieInPlaylistsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ creator: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listMoviePlaylists.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMoviePlaylists?.items;
      var loaded = result.filter(
        (item) =>
          !MovieInPlaylistsIdSet.has(getIDValue.MovieInPlaylists?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMovieInPlaylistsRecords(newOptions.slice(0, autocompleteLength));
    setMovieInPlaylistsLoading(false);
  };
  const fetchMovieTypeRecords = async (value) => {
    setMovieTypeLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ type: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listMovieTypes.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMovieTypes?.items;
      var loaded = result.filter(
        (item) => !MovieTypeIdSet.has(getIDValue.MovieType?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMovieTypeRecords(newOptions.slice(0, autocompleteLength));
    setMovieTypeLoading(false);
  };
  React.useEffect(() => {
    fetchMovieTeamRecords("");
    fetchMovieInPlaylistsRecords("");
    fetchMovieTypeRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name: name ?? null,
          name_eng: name_eng ?? null,
          genre: genre ?? null,
          description: description ?? null,
          description_eng: description_eng ?? null,
          screen_language: screen_language ?? null,
          captions_language: captions_language ?? null,
          origin_country: origin_country ?? null,
          length: length ?? null,
          created_year: created_year ?? null,
          uploaded_at: uploaded_at ?? null,
          guid: guid ?? null,
          MovieTeam: MovieTeam ?? null,
          MovieInPlaylists: MovieInPlaylists ?? null,
          times_watched: times_watched ?? null,
          MovieType: MovieType ?? null,
          photo_location: photo_location ?? null,
          thumbnail_location: thumbnail_location ?? null,
          age_rating: age_rating ?? null,
          subtitles_location: subtitles_location ?? null,
          creators_comment: creators_comment ?? null,
          trailerGuid: trailerGuid ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const movieTeamToUnlink = await movieRecord.MovieTeam;
          if (movieTeamToUnlink) {
            promises.push(
              API.graphql({
                query: updateMovieTeam.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: movieTeamToUnlink.id,
                    movieTeamMovieId: null,
                  },
                },
              })
            );
          }
          const movieTeamToLink = modelFields.MovieTeam;
          if (movieTeamToLink) {
            promises.push(
              API.graphql({
                query: updateMovieTeam.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: MovieTeam.id,
                    movieTeamMovieId: movieRecord.id,
                  },
                },
              })
            );
            const movieToUnlink = await movieTeamToLink.Movie;
            if (movieToUnlink) {
              promises.push(
                API.graphql({
                  query: updateMovie.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: movieToUnlink.id,
                      movieMovieTeamId: null,
                    },
                  },
                })
              );
            }
          }
          const movieInPlaylistsToLinkMap = new Map();
          const movieInPlaylistsToUnLinkMap = new Map();
          const movieInPlaylistsMap = new Map();
          const linkedMovieInPlaylistsMap = new Map();
          MovieInPlaylists.forEach((r) => {
            const count = movieInPlaylistsMap.get(
              getIDValue.MovieInPlaylists?.(r)
            );
            const newCount = count ? count + 1 : 1;
            movieInPlaylistsMap.set(getIDValue.MovieInPlaylists?.(r), newCount);
          });
          linkedMovieInPlaylists.forEach((r) => {
            const count = linkedMovieInPlaylistsMap.get(
              getIDValue.MovieInPlaylists?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedMovieInPlaylistsMap.set(
              getIDValue.MovieInPlaylists?.(r),
              newCount
            );
          });
          linkedMovieInPlaylistsMap.forEach((count, id) => {
            const newCount = movieInPlaylistsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                movieInPlaylistsToUnLinkMap.set(id, diffCount);
              }
            } else {
              movieInPlaylistsToUnLinkMap.set(id, count);
            }
          });
          movieInPlaylistsMap.forEach((count, id) => {
            const originalCount = linkedMovieInPlaylistsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                movieInPlaylistsToLinkMap.set(id, diffCount);
              }
            } else {
              movieInPlaylistsToLinkMap.set(id, count);
            }
          });
          movieInPlaylistsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const movieMoviePlaylistRecords = (
              await API.graphql({
                query: listMovieMoviePlaylists.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { moviePlaylistId: { eq: recordKeys.id } },
                      { movieId: { eq: movieRecord.id } },
                    ],
                  },
                },
              })
            )?.data?.listMovieMoviePlaylists?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                API.graphql({
                  query: deleteMovieMoviePlaylist.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: movieMoviePlaylistRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          movieInPlaylistsToLinkMap.forEach((count, id) => {
            const moviePlaylistToLink = movieInPlaylistsRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                API.graphql({
                  query: createMovieMoviePlaylist.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      movieId: movieRecord.id,
                      moviePlaylistId: moviePlaylistToLink.id,
                    },
                  },
                })
              );
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name ?? null,
            name_eng: modelFields.name_eng ?? null,
            genre: modelFields.genre ?? null,
            description: modelFields.description ?? null,
            description_eng: modelFields.description_eng ?? null,
            screen_language: modelFields.screen_language ?? null,
            captions_language: modelFields.captions_language ?? null,
            origin_country: modelFields.origin_country ?? null,
            length: modelFields.length ?? null,
            created_year: modelFields.created_year ?? null,
            uploaded_at: modelFields.uploaded_at ?? null,
            guid: modelFields.guid ?? null,
            movieMovieTeamId: modelFields?.MovieTeam?.id ?? null,
            times_watched: modelFields.times_watched ?? null,
            movieMovieTypeId: modelFields?.MovieType?.id ?? null,
            photo_location: modelFields.photo_location ?? null,
            thumbnail_location: modelFields.thumbnail_location ?? null,
            age_rating: modelFields.age_rating ?? null,
            subtitles_location: modelFields.subtitles_location ?? null,
            creators_comment: modelFields.creators_comment ?? null,
            trailerGuid: modelFields.trailerGuid ?? null,
          };
          promises.push(
            API.graphql({
              query: updateMovie.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: movieRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MovieUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Name eng"
        isRequired={false}
        isReadOnly={false}
        value={name_eng}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng: value,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.name_eng ?? value;
          }
          if (errors.name_eng?.hasError) {
            runValidationTasks("name_eng", value);
          }
          setName_eng(value);
        }}
        onBlur={() => runValidationTasks("name_eng", name_eng)}
        errorMessage={errors.name_eng?.errorMessage}
        hasError={errors.name_eng?.hasError}
        {...getOverrideProps(overrides, "name_eng")}
      ></TextField>
      <TextField
        label="Genre"
        isRequired={false}
        isReadOnly={false}
        value={genre}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre: value,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.genre ?? value;
          }
          if (errors.genre?.hasError) {
            runValidationTasks("genre", value);
          }
          setGenre(value);
        }}
        onBlur={() => runValidationTasks("genre", genre)}
        errorMessage={errors.genre?.errorMessage}
        hasError={errors.genre?.hasError}
        {...getOverrideProps(overrides, "genre")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description: value,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Description eng"
        isRequired={false}
        isReadOnly={false}
        value={description_eng}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng: value,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.description_eng ?? value;
          }
          if (errors.description_eng?.hasError) {
            runValidationTasks("description_eng", value);
          }
          setDescription_eng(value);
        }}
        onBlur={() => runValidationTasks("description_eng", description_eng)}
        errorMessage={errors.description_eng?.errorMessage}
        hasError={errors.description_eng?.hasError}
        {...getOverrideProps(overrides, "description_eng")}
      ></TextField>
      <TextField
        label="Screen language"
        isRequired={false}
        isReadOnly={false}
        value={screen_language}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language: value,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.screen_language ?? value;
          }
          if (errors.screen_language?.hasError) {
            runValidationTasks("screen_language", value);
          }
          setScreen_language(value);
        }}
        onBlur={() => runValidationTasks("screen_language", screen_language)}
        errorMessage={errors.screen_language?.errorMessage}
        hasError={errors.screen_language?.hasError}
        {...getOverrideProps(overrides, "screen_language")}
      ></TextField>
      <TextField
        label="Captions language"
        isRequired={false}
        isReadOnly={false}
        value={captions_language}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language: value,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.captions_language ?? value;
          }
          if (errors.captions_language?.hasError) {
            runValidationTasks("captions_language", value);
          }
          setCaptions_language(value);
        }}
        onBlur={() =>
          runValidationTasks("captions_language", captions_language)
        }
        errorMessage={errors.captions_language?.errorMessage}
        hasError={errors.captions_language?.hasError}
        {...getOverrideProps(overrides, "captions_language")}
      ></TextField>
      <TextField
        label="Origin country"
        isRequired={false}
        isReadOnly={false}
        value={origin_country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country: value,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.origin_country ?? value;
          }
          if (errors.origin_country?.hasError) {
            runValidationTasks("origin_country", value);
          }
          setOrigin_country(value);
        }}
        onBlur={() => runValidationTasks("origin_country", origin_country)}
        errorMessage={errors.origin_country?.errorMessage}
        hasError={errors.origin_country?.hasError}
        {...getOverrideProps(overrides, "origin_country")}
      ></TextField>
      <TextField
        label="Length"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={length}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length: value,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.length ?? value;
          }
          if (errors.length?.hasError) {
            runValidationTasks("length", value);
          }
          setLength(value);
        }}
        onBlur={() => runValidationTasks("length", length)}
        errorMessage={errors.length?.errorMessage}
        hasError={errors.length?.hasError}
        {...getOverrideProps(overrides, "length")}
      ></TextField>
      <TextField
        label="Created year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={created_year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year: value,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.created_year ?? value;
          }
          if (errors.created_year?.hasError) {
            runValidationTasks("created_year", value);
          }
          setCreated_year(value);
        }}
        onBlur={() => runValidationTasks("created_year", created_year)}
        errorMessage={errors.created_year?.errorMessage}
        hasError={errors.created_year?.hasError}
        {...getOverrideProps(overrides, "created_year")}
      ></TextField>
      <TextField
        label="Uploaded at"
        isRequired={false}
        isReadOnly={false}
        value={uploaded_at}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at: value,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.uploaded_at ?? value;
          }
          if (errors.uploaded_at?.hasError) {
            runValidationTasks("uploaded_at", value);
          }
          setUploaded_at(value);
        }}
        onBlur={() => runValidationTasks("uploaded_at", uploaded_at)}
        errorMessage={errors.uploaded_at?.errorMessage}
        hasError={errors.uploaded_at?.hasError}
        {...getOverrideProps(overrides, "uploaded_at")}
      ></TextField>
      <TextField
        label="Guid"
        isRequired={false}
        isReadOnly={false}
        value={guid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid: value,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.guid ?? value;
          }
          if (errors.guid?.hasError) {
            runValidationTasks("guid", value);
          }
          setGuid(value);
        }}
        onBlur={() => runValidationTasks("guid", guid)}
        errorMessage={errors.guid?.errorMessage}
        hasError={errors.guid?.hasError}
        {...getOverrideProps(overrides, "guid")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam: value,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.MovieTeam ?? value;
          }
          setMovieTeam(value);
          setCurrentMovieTeamValue(undefined);
          setCurrentMovieTeamDisplayValue("");
        }}
        currentFieldValue={currentMovieTeamValue}
        label={"Movie team"}
        items={MovieTeam ? [MovieTeam] : []}
        hasError={errors?.MovieTeam?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("MovieTeam", currentMovieTeamValue)
        }
        errorMessage={errors?.MovieTeam?.errorMessage}
        getBadgeText={getDisplayValue.MovieTeam}
        setFieldValue={(model) => {
          setCurrentMovieTeamDisplayValue(
            model ? getDisplayValue.MovieTeam(model) : ""
          );
          setCurrentMovieTeamValue(model);
        }}
        inputFieldRef={MovieTeamRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie team"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search MovieTeam"
          value={currentMovieTeamDisplayValue}
          options={movieTeamRecords
            .filter((r) => !MovieTeamIdSet.has(getIDValue.MovieTeam?.(r)))
            .map((r) => ({
              id: getIDValue.MovieTeam?.(r),
              label: getDisplayValue.MovieTeam?.(r),
            }))}
          isLoading={MovieTeamLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieTeamValue(
              movieTeamRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMovieTeamDisplayValue(label);
            runValidationTasks("MovieTeam", label);
          }}
          onClear={() => {
            setCurrentMovieTeamDisplayValue("");
          }}
          defaultValue={MovieTeam}
          onChange={(e) => {
            let { value } = e.target;
            fetchMovieTeamRecords(value);
            if (errors.MovieTeam?.hasError) {
              runValidationTasks("MovieTeam", value);
            }
            setCurrentMovieTeamDisplayValue(value);
            setCurrentMovieTeamValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("MovieTeam", currentMovieTeamDisplayValue)
          }
          errorMessage={errors.MovieTeam?.errorMessage}
          hasError={errors.MovieTeam?.hasError}
          ref={MovieTeamRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MovieTeam")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists: values,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            values = result?.MovieInPlaylists ?? values;
          }
          setMovieInPlaylists(values);
          setCurrentMovieInPlaylistsValue(undefined);
          setCurrentMovieInPlaylistsDisplayValue("");
        }}
        currentFieldValue={currentMovieInPlaylistsValue}
        label={"Movie in playlists"}
        items={MovieInPlaylists}
        hasError={errors?.MovieInPlaylists?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "MovieInPlaylists",
            currentMovieInPlaylistsValue
          )
        }
        errorMessage={errors?.MovieInPlaylists?.errorMessage}
        getBadgeText={getDisplayValue.MovieInPlaylists}
        setFieldValue={(model) => {
          setCurrentMovieInPlaylistsDisplayValue(
            model ? getDisplayValue.MovieInPlaylists(model) : ""
          );
          setCurrentMovieInPlaylistsValue(model);
        }}
        inputFieldRef={MovieInPlaylistsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie in playlists"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search MoviePlaylist"
          value={currentMovieInPlaylistsDisplayValue}
          options={movieInPlaylistsRecords.map((r) => ({
            id: getIDValue.MovieInPlaylists?.(r),
            label: getDisplayValue.MovieInPlaylists?.(r),
          }))}
          isLoading={MovieInPlaylistsLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieInPlaylistsValue(
              movieInPlaylistsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMovieInPlaylistsDisplayValue(label);
            runValidationTasks("MovieInPlaylists", label);
          }}
          onClear={() => {
            setCurrentMovieInPlaylistsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMovieInPlaylistsRecords(value);
            if (errors.MovieInPlaylists?.hasError) {
              runValidationTasks("MovieInPlaylists", value);
            }
            setCurrentMovieInPlaylistsDisplayValue(value);
            setCurrentMovieInPlaylistsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "MovieInPlaylists",
              currentMovieInPlaylistsDisplayValue
            )
          }
          errorMessage={errors.MovieInPlaylists?.errorMessage}
          hasError={errors.MovieInPlaylists?.hasError}
          ref={MovieInPlaylistsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MovieInPlaylists")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Times watched"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={times_watched}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched: value,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.times_watched ?? value;
          }
          if (errors.times_watched?.hasError) {
            runValidationTasks("times_watched", value);
          }
          setTimes_watched(value);
        }}
        onBlur={() => runValidationTasks("times_watched", times_watched)}
        errorMessage={errors.times_watched?.errorMessage}
        hasError={errors.times_watched?.hasError}
        {...getOverrideProps(overrides, "times_watched")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType: value,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.MovieType ?? value;
          }
          setMovieType(value);
          setCurrentMovieTypeValue(undefined);
          setCurrentMovieTypeDisplayValue("");
        }}
        currentFieldValue={currentMovieTypeValue}
        label={"Movie type"}
        items={MovieType ? [MovieType] : []}
        hasError={errors?.MovieType?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("MovieType", currentMovieTypeValue)
        }
        errorMessage={errors?.MovieType?.errorMessage}
        getBadgeText={getDisplayValue.MovieType}
        setFieldValue={(model) => {
          setCurrentMovieTypeDisplayValue(
            model ? getDisplayValue.MovieType(model) : ""
          );
          setCurrentMovieTypeValue(model);
        }}
        inputFieldRef={MovieTypeRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie type"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search MovieType"
          value={currentMovieTypeDisplayValue}
          options={movieTypeRecords
            .filter((r) => !MovieTypeIdSet.has(getIDValue.MovieType?.(r)))
            .map((r) => ({
              id: getIDValue.MovieType?.(r),
              label: getDisplayValue.MovieType?.(r),
            }))}
          isLoading={MovieTypeLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieTypeValue(
              movieTypeRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMovieTypeDisplayValue(label);
            runValidationTasks("MovieType", label);
          }}
          onClear={() => {
            setCurrentMovieTypeDisplayValue("");
          }}
          defaultValue={MovieType}
          onChange={(e) => {
            let { value } = e.target;
            fetchMovieTypeRecords(value);
            if (errors.MovieType?.hasError) {
              runValidationTasks("MovieType", value);
            }
            setCurrentMovieTypeDisplayValue(value);
            setCurrentMovieTypeValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("MovieType", currentMovieTypeDisplayValue)
          }
          errorMessage={errors.MovieType?.errorMessage}
          hasError={errors.MovieType?.hasError}
          ref={MovieTypeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MovieType")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Photo location"
        isRequired={false}
        isReadOnly={false}
        value={photo_location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location: value,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.photo_location ?? value;
          }
          if (errors.photo_location?.hasError) {
            runValidationTasks("photo_location", value);
          }
          setPhoto_location(value);
        }}
        onBlur={() => runValidationTasks("photo_location", photo_location)}
        errorMessage={errors.photo_location?.errorMessage}
        hasError={errors.photo_location?.hasError}
        {...getOverrideProps(overrides, "photo_location")}
      ></TextField>
      <TextField
        label="Thumbnail location"
        isRequired={false}
        isReadOnly={false}
        value={thumbnail_location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location: value,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.thumbnail_location ?? value;
          }
          if (errors.thumbnail_location?.hasError) {
            runValidationTasks("thumbnail_location", value);
          }
          setThumbnail_location(value);
        }}
        onBlur={() =>
          runValidationTasks("thumbnail_location", thumbnail_location)
        }
        errorMessage={errors.thumbnail_location?.errorMessage}
        hasError={errors.thumbnail_location?.hasError}
        {...getOverrideProps(overrides, "thumbnail_location")}
      ></TextField>
      <TextField
        label="Age rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={age_rating}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating: value,
              subtitles_location,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.age_rating ?? value;
          }
          if (errors.age_rating?.hasError) {
            runValidationTasks("age_rating", value);
          }
          setAge_rating(value);
        }}
        onBlur={() => runValidationTasks("age_rating", age_rating)}
        errorMessage={errors.age_rating?.errorMessage}
        hasError={errors.age_rating?.hasError}
        {...getOverrideProps(overrides, "age_rating")}
      ></TextField>
      <TextField
        label="Subtitles location"
        isRequired={false}
        isReadOnly={false}
        value={subtitles_location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location: value,
              creators_comment,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.subtitles_location ?? value;
          }
          if (errors.subtitles_location?.hasError) {
            runValidationTasks("subtitles_location", value);
          }
          setSubtitles_location(value);
        }}
        onBlur={() =>
          runValidationTasks("subtitles_location", subtitles_location)
        }
        errorMessage={errors.subtitles_location?.errorMessage}
        hasError={errors.subtitles_location?.hasError}
        {...getOverrideProps(overrides, "subtitles_location")}
      ></TextField>
      <TextField
        label="Creators comment"
        isRequired={false}
        isReadOnly={false}
        value={creators_comment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment: value,
              trailerGuid,
            };
            const result = onChange(modelFields);
            value = result?.creators_comment ?? value;
          }
          if (errors.creators_comment?.hasError) {
            runValidationTasks("creators_comment", value);
          }
          setCreators_comment(value);
        }}
        onBlur={() => runValidationTasks("creators_comment", creators_comment)}
        errorMessage={errors.creators_comment?.errorMessage}
        hasError={errors.creators_comment?.hasError}
        {...getOverrideProps(overrides, "creators_comment")}
      ></TextField>
      <TextField
        label="Trailer guid"
        isRequired={false}
        isReadOnly={false}
        value={trailerGuid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              uploaded_at,
              guid,
              MovieTeam,
              MovieInPlaylists,
              times_watched,
              MovieType,
              photo_location,
              thumbnail_location,
              age_rating,
              subtitles_location,
              creators_comment,
              trailerGuid: value,
            };
            const result = onChange(modelFields);
            value = result?.trailerGuid ?? value;
          }
          if (errors.trailerGuid?.hasError) {
            runValidationTasks("trailerGuid", value);
          }
          setTrailerGuid(value);
        }}
        onBlur={() => runValidationTasks("trailerGuid", trailerGuid)}
        errorMessage={errors.trailerGuid?.errorMessage}
        hasError={errors.trailerGuid?.hasError}
        {...getOverrideProps(overrides, "trailerGuid")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || movieModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || movieModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
