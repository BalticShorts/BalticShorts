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
import { StorageManager } from "@aws-amplify/ui-react-storage";
import {
  fetchByPath,
  getOverrideProps,
  processFile,
  validateField,
} from "./utils";
import {
  getMoviePlaylist,
  listMovieMoviePlaylists,
  listMovies,
  movieMoviePlaylistsByMoviePlaylistId,
} from "../graphql/queries";
import { API } from "aws-amplify";
import {
  createMovieMoviePlaylist,
  deleteMovieMoviePlaylist,
  updateMoviePlaylist,
} from "../graphql/mutations";
import { Field } from "@aws-amplify/ui-react/internal";
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
    Title: "",
    movies: [],
    is_recommended: false,
    Field0: undefined,
    creator: "",
    title: "",
    description: "",
  };
  const [Creator, setCreator] = React.useState(initialValues.Creator);
  const [Title, setTitle] = React.useState(initialValues.Title);
  const [movies, setMovies] = React.useState(initialValues.movies);
  const [moviesLoading, setMoviesLoading] = React.useState(false);
  const [moviesRecords, setMoviesRecords] = React.useState([]);
  const [is_recommended, setIs_recommended] = React.useState(
    initialValues.is_recommended
  );
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [creator1, setCreator1] = React.useState(initialValues.creator);
  const [title1, setTitle1] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = moviePlaylistRecord
      ? { ...initialValues, ...moviePlaylistRecord, movies: linkedMovies }
      : initialValues;
    setCreator(cleanValues.Creator);
    setTitle(cleanValues.Title);
    setMovies(cleanValues.movies ?? []);
    setCurrentMoviesValue(undefined);
    setCurrentMoviesDisplayValue("");
    setIs_recommended(cleanValues.is_recommended);
    setField0(cleanValues.Field0);
    setCreator1(cleanValues.creator);
    setTitle1(cleanValues.title);
    setDescription(cleanValues.description);
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
      setMoviePlaylistRecord(record);
    };
    queryData();
  }, [idProp, moviePlaylistModelProp]);
  React.useEffect(resetStateValues, [moviePlaylistRecord, linkedMovies]);
  const [currentMoviesDisplayValue, setCurrentMoviesDisplayValue] =
    React.useState("");
  const [currentMoviesValue, setCurrentMoviesValue] = React.useState(undefined);
  const moviesRef = React.createRef();
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
  };
  const validations = {
    Creator: [],
    Title: [],
    movies: [],
    is_recommended: [],
    Field0: [],
    creator: [{ type: "Required" }],
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
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
  React.useEffect(() => {
    fetchMoviesRecords("");
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
          Creator: Creator ?? null,
          Title: Title ?? null,
          movies: movies ?? null,
          is_recommended: is_recommended ?? null,
          Field0: Field0 ?? null,
          creator: creator1,
          title: title1,
          description,
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
            is_recommended: modelFields.is_recommended ?? null,
            creator: modelFields.creator,
            title: modelFields.title,
            description: modelFields.description,
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
        label="Label"
        value={Creator}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator: value,
              Title,
              movies,
              is_recommended,
              Field0,
              creator: creator1,
              title: title1,
              description,
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
      <TextField
        label="Label"
        value={Title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator,
              Title: value,
              movies,
              is_recommended,
              Field0,
              creator: creator1,
              title: title1,
              description,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Creator,
              Title,
              movies: values,
              is_recommended,
              Field0,
              creator: creator1,
              title: title1,
              description,
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
      <SwitchField
        label="Is highlighted"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_recommended}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Creator,
              Title,
              movies,
              is_recommended: value,
              Field0,
              creator: creator1,
              title: title1,
              description,
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
      <Field
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        label={"Thumbnail"}
      >
        {moviePlaylistRecord && (
          <StorageManager
            defaultFiles={[{ key: moviePlaylistRecord.Field0 }]}
            onUploadSuccess={({ key }) => {
              setField0((prev) => {
                let value = key;
                if (onChange) {
                  const modelFields = {
                    Creator,
                    Title,
                    movies,
                    is_recommended,
                    Field0: value,
                    creator: creator1,
                    title: title1,
                    description,
                  };
                  const result = onChange(modelFields);
                  value = result?.Field0 ?? value;
                }
                return value;
              });
            }}
            onFileRemove={({ key }) => {
              setField0((prev) => {
                let value = initialValues?.Field0;
                if (onChange) {
                  const modelFields = {
                    Creator,
                    Title,
                    movies,
                    is_recommended,
                    Field0: value,
                    creator: creator1,
                    title: title1,
                    description,
                  };
                  const result = onChange(modelFields);
                  value = result?.Field0 ?? value;
                }
                return value;
              });
            }}
            processFile={processFile}
            accessLevel={"private"}
            acceptedFileTypes={["image/*"]}
            isResumable={false}
            showThumbnails={true}
            maxFileCount={1}
            {...getOverrideProps(overrides, "Field0")}
          ></StorageManager>
        )}
      </Field>
      <TextField
        label="Creator"
        isRequired={true}
        isReadOnly={false}
        value={creator1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator,
              Title,
              movies,
              is_recommended,
              Field0,
              creator: value,
              title: title1,
              description,
            };
            const result = onChange(modelFields);
            value = result?.creator ?? value;
          }
          if (errors.creator?.hasError) {
            runValidationTasks("creator", value);
          }
          setCreator1(value);
        }}
        onBlur={() => runValidationTasks("creator", creator1)}
        errorMessage={errors.creator?.errorMessage}
        hasError={errors.creator?.hasError}
        {...getOverrideProps(overrides, "creator")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator,
              Title,
              movies,
              is_recommended,
              Field0,
              creator: creator1,
              title: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle1(value);
        }}
        onBlur={() => runValidationTasks("title", title1)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Creator,
              Title,
              movies,
              is_recommended,
              Field0,
              creator: creator1,
              title: title1,
              description: value,
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
