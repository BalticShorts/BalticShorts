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
import { API } from "aws-amplify";
import {
  getMovieTeam,
  listMovies,
  listPersonMovieTeams,
} from "../graphql/queries";
import {
  updateMovie,
  updateMovieTeam,
  updatePersonMovieTeam,
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
export default function MovieTeamUpdateForm(props) {
  const {
    id: idProp,
    movieTeam: movieTeamModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    MovieName: "",
    PersonMovieTeams: [],
    Movie: undefined,
  };
  const [MovieName, setMovieName] = React.useState(initialValues.MovieName);
  const [PersonMovieTeams, setPersonMovieTeams] = React.useState(
    initialValues.PersonMovieTeams
  );
  const [PersonMovieTeamsLoading, setPersonMovieTeamsLoading] =
    React.useState(false);
  const [personMovieTeamsRecords, setPersonMovieTeamsRecords] = React.useState(
    []
  );
  const [Movie, setMovie] = React.useState(initialValues.Movie);
  const [MovieLoading, setMovieLoading] = React.useState(false);
  const [movieRecords, setMovieRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = movieTeamRecord
      ? {
          ...initialValues,
          ...movieTeamRecord,
          PersonMovieTeams: linkedPersonMovieTeams,
          Movie,
        }
      : initialValues;
    setMovieName(cleanValues.MovieName);
    setPersonMovieTeams(cleanValues.PersonMovieTeams ?? []);
    setCurrentPersonMovieTeamsValue(undefined);
    setCurrentPersonMovieTeamsDisplayValue("");
    setMovie(cleanValues.Movie);
    setCurrentMovieValue(undefined);
    setCurrentMovieDisplayValue("");
    setErrors({});
  };
  const [movieTeamRecord, setMovieTeamRecord] =
    React.useState(movieTeamModelProp);
  const [linkedPersonMovieTeams, setLinkedPersonMovieTeams] = React.useState(
    []
  );
  const canUnlinkPersonMovieTeams = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMovieTeam.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMovieTeam
        : movieTeamModelProp;
      const linkedPersonMovieTeams = record?.PersonMovieTeams?.items ?? [];
      setLinkedPersonMovieTeams(linkedPersonMovieTeams);
      const MovieRecord = record ? await record.Movie : undefined;
      setMovie(MovieRecord);
      setMovieTeamRecord(record);
    };
    queryData();
  }, [idProp, movieTeamModelProp]);
  React.useEffect(resetStateValues, [
    movieTeamRecord,
    linkedPersonMovieTeams,
    Movie,
  ]);
  const [
    currentPersonMovieTeamsDisplayValue,
    setCurrentPersonMovieTeamsDisplayValue,
  ] = React.useState("");
  const [currentPersonMovieTeamsValue, setCurrentPersonMovieTeamsValue] =
    React.useState(undefined);
  const PersonMovieTeamsRef = React.createRef();
  const [currentMovieDisplayValue, setCurrentMovieDisplayValue] =
    React.useState("");
  const [currentMovieValue, setCurrentMovieValue] = React.useState(undefined);
  const MovieRef = React.createRef();
  const getIDValue = {
    PersonMovieTeams: (r) => JSON.stringify({ id: r?.id }),
    Movie: (r) => JSON.stringify({ id: r?.id }),
  };
  const PersonMovieTeamsIdSet = new Set(
    Array.isArray(PersonMovieTeams)
      ? PersonMovieTeams.map((r) => getIDValue.PersonMovieTeams?.(r))
      : getIDValue.PersonMovieTeams?.(PersonMovieTeams)
  );
  const MovieIdSet = new Set(
    Array.isArray(Movie)
      ? Movie.map((r) => getIDValue.Movie?.(r))
      : getIDValue.Movie?.(Movie)
  );
  const getDisplayValue = {
    PersonMovieTeams: (r) => r?.id,
    Movie: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    MovieName: [],
    PersonMovieTeams: [],
    Movie: [],
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
  const fetchPersonMovieTeamsRecords = async (value) => {
    setPersonMovieTeamsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: [{ id: { contains: value } }] },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listPersonMovieTeams.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listPersonMovieTeams?.items;
      var loaded = result.filter(
        (item) =>
          !PersonMovieTeamsIdSet.has(getIDValue.PersonMovieTeams?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPersonMovieTeamsRecords(newOptions.slice(0, autocompleteLength));
    setPersonMovieTeamsLoading(false);
  };
  const fetchMovieRecords = async (value) => {
    setMovieLoading(true);
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
        (item) => !MovieIdSet.has(getIDValue.Movie?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMovieRecords(newOptions.slice(0, autocompleteLength));
    setMovieLoading(false);
  };
  React.useEffect(() => {
    fetchPersonMovieTeamsRecords("");
    fetchMovieRecords("");
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
          MovieName: MovieName ?? null,
          PersonMovieTeams: PersonMovieTeams ?? null,
          Movie: Movie ?? null,
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
          const personMovieTeamsToLink = [];
          const personMovieTeamsToUnLink = [];
          const personMovieTeamsSet = new Set();
          const linkedPersonMovieTeamsSet = new Set();
          PersonMovieTeams.forEach((r) =>
            personMovieTeamsSet.add(getIDValue.PersonMovieTeams?.(r))
          );
          linkedPersonMovieTeams.forEach((r) =>
            linkedPersonMovieTeamsSet.add(getIDValue.PersonMovieTeams?.(r))
          );
          linkedPersonMovieTeams.forEach((r) => {
            if (!personMovieTeamsSet.has(getIDValue.PersonMovieTeams?.(r))) {
              personMovieTeamsToUnLink.push(r);
            }
          });
          PersonMovieTeams.forEach((r) => {
            if (
              !linkedPersonMovieTeamsSet.has(getIDValue.PersonMovieTeams?.(r))
            ) {
              personMovieTeamsToLink.push(r);
            }
          });
          personMovieTeamsToUnLink.forEach((original) => {
            if (!canUnlinkPersonMovieTeams) {
              throw Error(
                `PersonMovieTeam ${original.id} cannot be unlinked from MovieTeam because undefined is a required field.`
              );
            }
            promises.push(
              API.graphql({
                query: updatePersonMovieTeam.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                  },
                },
              })
            );
          });
          personMovieTeamsToLink.forEach((original) => {
            promises.push(
              API.graphql({
                query: updatePersonMovieTeam.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                  },
                },
              })
            );
          });
          const movieToUnlink = await movieTeamRecord.Movie;
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
          const movieToLink = modelFields.Movie;
          if (movieToLink) {
            promises.push(
              API.graphql({
                query: updateMovie.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: Movie.id,
                    movieMovieTeamId: movieTeamRecord.id,
                  },
                },
              })
            );
            const movieTeamToUnlink = await movieToLink.MovieTeam;
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
          }
          const modelFieldsToSave = {
            MovieName: modelFields.MovieName ?? null,
            movieTeamMovieId: modelFields?.Movie?.id ?? null,
          };
          promises.push(
            API.graphql({
              query: updateMovieTeam.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: movieTeamRecord.id,
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
      {...getOverrideProps(overrides, "MovieTeamUpdateForm")}
      {...rest}
    >
      <TextField
        label="Movie name"
        isRequired={false}
        isReadOnly={false}
        value={MovieName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MovieName: value,
              PersonMovieTeams,
              Movie,
            };
            const result = onChange(modelFields);
            value = result?.MovieName ?? value;
          }
          if (errors.MovieName?.hasError) {
            runValidationTasks("MovieName", value);
          }
          setMovieName(value);
        }}
        onBlur={() => runValidationTasks("MovieName", MovieName)}
        errorMessage={errors.MovieName?.errorMessage}
        hasError={errors.MovieName?.hasError}
        {...getOverrideProps(overrides, "MovieName")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              MovieName,
              PersonMovieTeams: values,
              Movie,
            };
            const result = onChange(modelFields);
            values = result?.PersonMovieTeams ?? values;
          }
          setPersonMovieTeams(values);
          setCurrentPersonMovieTeamsValue(undefined);
          setCurrentPersonMovieTeamsDisplayValue("");
        }}
        currentFieldValue={currentPersonMovieTeamsValue}
        label={"Person movie teams"}
        items={PersonMovieTeams}
        hasError={errors?.PersonMovieTeams?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "PersonMovieTeams",
            currentPersonMovieTeamsValue
          )
        }
        errorMessage={errors?.PersonMovieTeams?.errorMessage}
        getBadgeText={getDisplayValue.PersonMovieTeams}
        setFieldValue={(model) => {
          setCurrentPersonMovieTeamsDisplayValue(
            model ? getDisplayValue.PersonMovieTeams(model) : ""
          );
          setCurrentPersonMovieTeamsValue(model);
        }}
        inputFieldRef={PersonMovieTeamsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Person movie teams"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PersonMovieTeam"
          value={currentPersonMovieTeamsDisplayValue}
          options={personMovieTeamsRecords.map((r) => ({
            id: getIDValue.PersonMovieTeams?.(r),
            label: getDisplayValue.PersonMovieTeams?.(r),
          }))}
          isLoading={PersonMovieTeamsLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonMovieTeamsValue(
              personMovieTeamsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPersonMovieTeamsDisplayValue(label);
            runValidationTasks("PersonMovieTeams", label);
          }}
          onClear={() => {
            setCurrentPersonMovieTeamsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPersonMovieTeamsRecords(value);
            if (errors.PersonMovieTeams?.hasError) {
              runValidationTasks("PersonMovieTeams", value);
            }
            setCurrentPersonMovieTeamsDisplayValue(value);
            setCurrentPersonMovieTeamsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "PersonMovieTeams",
              currentPersonMovieTeamsDisplayValue
            )
          }
          errorMessage={errors.PersonMovieTeams?.errorMessage}
          hasError={errors.PersonMovieTeams?.hasError}
          ref={PersonMovieTeamsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "PersonMovieTeams")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              MovieName,
              PersonMovieTeams,
              Movie: value,
            };
            const result = onChange(modelFields);
            value = result?.Movie ?? value;
          }
          setMovie(value);
          setCurrentMovieValue(undefined);
          setCurrentMovieDisplayValue("");
        }}
        currentFieldValue={currentMovieValue}
        label={"Movie"}
        items={Movie ? [Movie] : []}
        hasError={errors?.Movie?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Movie", currentMovieValue)
        }
        errorMessage={errors?.Movie?.errorMessage}
        getBadgeText={getDisplayValue.Movie}
        setFieldValue={(model) => {
          setCurrentMovieDisplayValue(
            model ? getDisplayValue.Movie(model) : ""
          );
          setCurrentMovieValue(model);
        }}
        inputFieldRef={MovieRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Movie"
          value={currentMovieDisplayValue}
          options={movieRecords
            .filter((r) => !MovieIdSet.has(getIDValue.Movie?.(r)))
            .map((r) => ({
              id: getIDValue.Movie?.(r),
              label: getDisplayValue.Movie?.(r),
            }))}
          isLoading={MovieLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieValue(
              movieRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMovieDisplayValue(label);
            runValidationTasks("Movie", label);
          }}
          onClear={() => {
            setCurrentMovieDisplayValue("");
          }}
          defaultValue={Movie}
          onChange={(e) => {
            let { value } = e.target;
            fetchMovieRecords(value);
            if (errors.Movie?.hasError) {
              runValidationTasks("Movie", value);
            }
            setCurrentMovieDisplayValue(value);
            setCurrentMovieValue(undefined);
          }}
          onBlur={() => runValidationTasks("Movie", currentMovieDisplayValue)}
          errorMessage={errors.Movie?.errorMessage}
          hasError={errors.Movie?.hasError}
          ref={MovieRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Movie")}
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
          isDisabled={!(idProp || movieTeamModelProp)}
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
              !(idProp || movieTeamModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
