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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import {
  getMoviePlaylist,
  getUserProfile,
  listMovieMoviePlaylists,
  listMovies,
  listUserProfiles,
  movieMoviePlaylistsByMoviePlaylistId,
} from "../graphql/queries";
import { API } from "aws-amplify";
import {
  createMovieMoviePlaylist,
  deleteMovieMoviePlaylist,
  updateMoviePlaylist,
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
export default function MoviePlaylistUpdateForm(props) {
  const {
    id: idProp,
    moviePlaylist: moviePlaylistModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Creator: "",
    movies: [],
    Title: "",
    is_public: false,
    is_recommended: false,
    photo_location: "",
    userprofileID: undefined,
  };
  const [Creator, setCreator] = React.useState(initialValues.Creator);
  const [movies, setMovies] = React.useState(initialValues.movies);
  const [moviesLoading, setMoviesLoading] = React.useState(false);
  const [moviesRecords, setMoviesRecords] = React.useState([]);
  const [Title, setTitle] = React.useState(initialValues.Title);
  const [is_public, setIs_public] = React.useState(initialValues.is_public);
  const [is_recommended, setIs_recommended] = React.useState(
    initialValues.is_recommended
  );
  const [photo_location, setPhoto_location] = React.useState(
    initialValues.photo_location
  );
  const [userprofileID, setUserprofileID] = React.useState(
    initialValues.userprofileID
  );
  const [userprofileIDLoading, setUserprofileIDLoading] = React.useState(false);
  const [userprofileIDRecords, setUserprofileIDRecords] = React.useState([]);
  const [selectedUserprofileIDRecords, setSelectedUserprofileIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = moviePlaylistRecord
      ? {
          ...initialValues,
          ...moviePlaylistRecord,
          movies: linkedMovies,
          userprofileID,
        }
      : initialValues;
    setCreator(cleanValues.Creator);
    setMovies(cleanValues.movies ?? []);
    setCurrentMoviesValue(undefined);
    setCurrentMoviesDisplayValue("");
    setTitle(cleanValues.Title);
    setIs_public(cleanValues.is_public);
    setIs_recommended(cleanValues.is_recommended);
    setPhoto_location(cleanValues.photo_location);
    setUserprofileID(cleanValues.userprofileID);
    setCurrentUserprofileIDValue(undefined);
    setCurrentUserprofileIDDisplayValue("");
    setErrors({});
  };
  const [moviePlaylistRecord, setMoviePlaylistRecord] = React.useState(
    moviePlaylistModelProp
  );
  const [linkedMovies, setLinkedMovies] = React.useState([]);
  const canUnlinkMovies = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMoviePlaylist.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMoviePlaylist
        : moviePlaylistModelProp;
      const linkedMovies = record
        ? (
            await API.graphql({
              query: movieMoviePlaylistsByMoviePlaylistId.replaceAll(
                "__typename",
                ""
              ),
              variables: {
                moviePlaylistId: record.id,
              },
            })
          ).data.movieMoviePlaylistsByMoviePlaylistId.items.map((t) => t.movie)
        : [];
      setLinkedMovies(linkedMovies);
      const userprofileIDRecord = record ? record.userprofileID : undefined;
      const userProfileRecord = userprofileIDRecord
        ? (
            await API.graphql({
              query: getUserProfile.replaceAll("__typename", ""),
              variables: { id: userprofileIDRecord },
            })
          )?.data?.getUserProfile
        : undefined;
      setUserprofileID(userprofileIDRecord);
      setSelectedUserprofileIDRecords([userProfileRecord]);
      setMoviePlaylistRecord(record);
    };
    queryData();
  }, [idProp, moviePlaylistModelProp]);
  React.useEffect(resetStateValues, [
    moviePlaylistRecord,
    linkedMovies,
    userprofileID,
  ]);
  const [currentMoviesDisplayValue, setCurrentMoviesDisplayValue] =
    React.useState("");
  const [currentMoviesValue, setCurrentMoviesValue] = React.useState(undefined);
  const moviesRef = React.createRef();
  const [
    currentUserprofileIDDisplayValue,
    setCurrentUserprofileIDDisplayValue,
  ] = React.useState("");
  const [currentUserprofileIDValue, setCurrentUserprofileIDValue] =
    React.useState(undefined);
  const userprofileIDRef = React.createRef();
  const getIDValue = {
    movies: (r) => JSON.stringify({ id: r?.id }),
  };
  const moviesIdSet = new Set(
    Array.isArray(movies)
      ? movies.map((r) => getIDValue.movies?.(r))
      : getIDValue.movies?.(movies)
  );
  const getDisplayValue = {
    movies: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    userprofileID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    Creator: [{ type: "Required" }],
    movies: [],
    Title: [{ type: "Required" }],
    is_public: [{ type: "Required" }],
    is_recommended: [],
    photo_location: [],
    userprofileID: [],
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
  const fetchMoviesRecords = async (value) => {
    setMoviesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listMovies.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMovies?.items;
      var loaded = result.filter(
        (item) => !moviesIdSet.has(getIDValue.movies?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMoviesRecords(newOptions.slice(0, autocompleteLength));
    setMoviesLoading(false);
  };
  const fetchUserprofileIDRecords = async (value) => {
    setUserprofileIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listUserProfiles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listUserProfiles?.items;
      var loaded = result.filter((item) => userprofileID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setUserprofileIDRecords(newOptions.slice(0, autocompleteLength));
    setUserprofileIDLoading(false);
  };
  React.useEffect(() => {
    fetchMoviesRecords("");
    fetchUserprofileIDRecords("");
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
          Creator,
          movies: movies ?? null,
          Title,
          is_public,
          is_recommended: is_recommended ?? null,
          photo_location: photo_location ?? null,
          userprofileID: userprofileID ?? null,
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
          const moviesToLinkMap = new Map();
          const moviesToUnLinkMap = new Map();
          const moviesMap = new Map();
          const linkedMoviesMap = new Map();
          movies.forEach((r) => {
            const count = moviesMap.get(getIDValue.movies?.(r));
            const newCount = count ? count + 1 : 1;
            moviesMap.set(getIDValue.movies?.(r), newCount);
          });
          linkedMovies.forEach((r) => {
            const count = linkedMoviesMap.get(getIDValue.movies?.(r));
            const newCount = count ? count + 1 : 1;
            linkedMoviesMap.set(getIDValue.movies?.(r), newCount);
          });
          linkedMoviesMap.forEach((count, id) => {
            const newCount = moviesMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                moviesToUnLinkMap.set(id, diffCount);
              }
            } else {
              moviesToUnLinkMap.set(id, count);
            }
          });
          moviesMap.forEach((count, id) => {
            const originalCount = linkedMoviesMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                moviesToLinkMap.set(id, diffCount);
              }
            } else {
              moviesToLinkMap.set(id, count);
            }
          });
          moviesToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const movieMoviePlaylistRecords = (
              await API.graphql({
                query: listMovieMoviePlaylists.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { movieId: { eq: recordKeys.id } },
                      { moviePlaylistId: { eq: moviePlaylistRecord.id } },
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
          moviesToLinkMap.forEach((count, id) => {
            const movieToLink = moviesRecords.find((r) =>
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
                      moviePlaylistId: moviePlaylistRecord.id,
                      movieId: movieToLink.id,
                    },
                  },
                })
              );
            }
          });
          const modelFieldsToSave = {
            Creator: modelFields.Creator,
            Title: modelFields.Title,
            is_public: modelFields.is_public,
            is_recommended: modelFields.is_recommended ?? null,
            photo_location: modelFields.photo_location ?? null,
            userprofileID: modelFields.userprofileID ?? null,
          };
          promises.push(
            API.graphql({
              query: updateMoviePlaylist.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: moviePlaylistRecord.id,
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
      {...getOverrideProps(overrides, "MoviePlaylistUpdateForm")}
      {...rest}
    >
      <TextField
        label="Creator"
        isRequired={true}
        isReadOnly={false}
        value={Creator}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator: value,
              movies,
              Title,
              is_public,
              is_recommended,
              photo_location,
              userprofileID,
            };
            const result = onChange(modelFields);
            value = result?.Creator ?? value;
          }
          if (errors.Creator?.hasError) {
            runValidationTasks("Creator", value);
          }
          setCreator(value);
        }}
        onBlur={() => runValidationTasks("Creator", Creator)}
        errorMessage={errors.Creator?.errorMessage}
        hasError={errors.Creator?.hasError}
        {...getOverrideProps(overrides, "Creator")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Creator,
              movies: values,
              Title,
              is_public,
              is_recommended,
              photo_location,
              userprofileID,
            };
            const result = onChange(modelFields);
            values = result?.movies ?? values;
          }
          setMovies(values);
          setCurrentMoviesValue(undefined);
          setCurrentMoviesDisplayValue("");
        }}
        currentFieldValue={currentMoviesValue}
        label={"Movies"}
        items={movies}
        hasError={errors?.movies?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("movies", currentMoviesValue)
        }
        errorMessage={errors?.movies?.errorMessage}
        getBadgeText={getDisplayValue.movies}
        setFieldValue={(model) => {
          setCurrentMoviesDisplayValue(
            model ? getDisplayValue.movies(model) : ""
          );
          setCurrentMoviesValue(model);
        }}
        inputFieldRef={moviesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movies"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Movie"
          value={currentMoviesDisplayValue}
          options={moviesRecords.map((r) => ({
            id: getIDValue.movies?.(r),
            label: getDisplayValue.movies?.(r),
          }))}
          isLoading={moviesLoading}
          onSelect={({ id, label }) => {
            setCurrentMoviesValue(
              moviesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMoviesDisplayValue(label);
            runValidationTasks("movies", label);
          }}
          onClear={() => {
            setCurrentMoviesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMoviesRecords(value);
            if (errors.movies?.hasError) {
              runValidationTasks("movies", value);
            }
            setCurrentMoviesDisplayValue(value);
            setCurrentMoviesValue(undefined);
          }}
          onBlur={() => runValidationTasks("movies", currentMoviesDisplayValue)}
          errorMessage={errors.movies?.errorMessage}
          hasError={errors.movies?.hasError}
          ref={moviesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "movies")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={Title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator,
              movies,
              Title: value,
              is_public,
              is_recommended,
              photo_location,
              userprofileID,
            };
            const result = onChange(modelFields);
            value = result?.Title ?? value;
          }
          if (errors.Title?.hasError) {
            runValidationTasks("Title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("Title", Title)}
        errorMessage={errors.Title?.errorMessage}
        hasError={errors.Title?.hasError}
        {...getOverrideProps(overrides, "Title")}
      ></TextField>
      <SwitchField
        label="Is public"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_public}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Creator,
              movies,
              Title,
              is_public: value,
              is_recommended,
              photo_location,
              userprofileID,
            };
            const result = onChange(modelFields);
            value = result?.is_public ?? value;
          }
          if (errors.is_public?.hasError) {
            runValidationTasks("is_public", value);
          }
          setIs_public(value);
        }}
        onBlur={() => runValidationTasks("is_public", is_public)}
        errorMessage={errors.is_public?.errorMessage}
        hasError={errors.is_public?.hasError}
        {...getOverrideProps(overrides, "is_public")}
      ></SwitchField>
      <SwitchField
        label="Is recommended"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_recommended}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Creator,
              movies,
              Title,
              is_public,
              is_recommended: value,
              photo_location,
              userprofileID,
            };
            const result = onChange(modelFields);
            value = result?.is_recommended ?? value;
          }
          if (errors.is_recommended?.hasError) {
            runValidationTasks("is_recommended", value);
          }
          setIs_recommended(value);
        }}
        onBlur={() => runValidationTasks("is_recommended", is_recommended)}
        errorMessage={errors.is_recommended?.errorMessage}
        hasError={errors.is_recommended?.hasError}
        {...getOverrideProps(overrides, "is_recommended")}
      ></SwitchField>
      <TextField
        label="Photo location"
        isRequired={false}
        isReadOnly={false}
        value={photo_location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator,
              movies,
              Title,
              is_public,
              is_recommended,
              photo_location: value,
              userprofileID,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Creator,
              movies,
              Title,
              is_public,
              is_recommended,
              photo_location,
              userprofileID: value,
            };
            const result = onChange(modelFields);
            value = result?.userprofileID ?? value;
          }
          setUserprofileID(value);
          setCurrentUserprofileIDValue(undefined);
        }}
        currentFieldValue={currentUserprofileIDValue}
        label={"Userprofile id"}
        items={userprofileID ? [userprofileID] : []}
        hasError={errors?.userprofileID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("userprofileID", currentUserprofileIDValue)
        }
        errorMessage={errors?.userprofileID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.userprofileID(
                userprofileIDRecords.find((r) => r.id === value) ??
                  selectedUserprofileIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentUserprofileIDDisplayValue(
            value
              ? getDisplayValue.userprofileID(
                  userprofileIDRecords.find((r) => r.id === value) ??
                    selectedUserprofileIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentUserprofileIDValue(value);
          const selectedRecord = userprofileIDRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedUserprofileIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={userprofileIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Userprofile id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search UserProfile"
          value={currentUserprofileIDDisplayValue}
          options={userprofileIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.userprofileID?.(r),
            }))}
          isLoading={userprofileIDLoading}
          onSelect={({ id, label }) => {
            setCurrentUserprofileIDValue(id);
            setCurrentUserprofileIDDisplayValue(label);
            runValidationTasks("userprofileID", label);
          }}
          onClear={() => {
            setCurrentUserprofileIDDisplayValue("");
          }}
          defaultValue={userprofileID}
          onChange={(e) => {
            let { value } = e.target;
            fetchUserprofileIDRecords(value);
            if (errors.userprofileID?.hasError) {
              runValidationTasks("userprofileID", value);
            }
            setCurrentUserprofileIDDisplayValue(value);
            setCurrentUserprofileIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("userprofileID", currentUserprofileIDValue)
          }
          errorMessage={errors.userprofileID?.errorMessage}
          hasError={errors.userprofileID?.hasError}
          ref={userprofileIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "userprofileID")}
        ></Autocomplete>
      </ArrayField>
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
          isDisabled={!(idProp || moviePlaylistModelProp)}
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
              !(idProp || moviePlaylistModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
