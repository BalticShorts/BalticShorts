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
import {
  fetchByPath,
  getOverrideProps,
  validateField,
} from "./utils";
import { API } from "aws-amplify";
import {

  listMovieTypes,
} from "../../graphql/queries";
import {
  createMovie,
} from "../../graphql/mutations";
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
export default function MovieCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    type: "",
    genre: "",
    description: "",
    description_eng: "",
    screen_language: "",
    captions_language: "",
    origin_country: "",
    length: "",
    created_year: "",
    MovieType: undefined,
    photo_location: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [name_eng, setName_eng] = React.useState(initialValues.name_eng);
  const [type, setType] = React.useState(initialValues.type);
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
  const [MovieTeam, setMovieTeam] = React.useState(initialValues.MovieTeam);
  const [MovieInPlaylists, setMovieInPlaylists] = React.useState(
    initialValues.MovieInPlaylists
  );
  const [photo_location, setPhoto_location] = React.useState(
    initialValues.photo_location
  );
  const [MovieType, setMovieType] = React.useState(initialValues.MovieType);
  const [MovieTypeLoading, setMovieTypeLoading] = React.useState(false);
  const [movieTypeRecords, setMovieTypeRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setName_eng(initialValues.name_eng);
    setType(initialValues.type);
    setGenre(initialValues.genre);
    setDescription(initialValues.description);
    setDescription_eng(initialValues.description_eng);
    setScreen_language(initialValues.screen_language);
    setCaptions_language(initialValues.captions_language);
    setOrigin_country(initialValues.origin_country);
    setLength(initialValues.length);
    setCreated_year(initialValues.created_year);
    setMovieTeam(initialValues.MovieTeam);
    setMovieType(initialValues.MovieType);
    setCurrentMovieTypeValue(undefined);
    setCurrentMovieTypeDisplayValue("");
    setPhoto_location(initialValues.photo_location);
    setErrors({});
  };
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
  const MovieTypeIdSet = new Set(
    Array.isArray(MovieType)
      ? MovieType.map((r) => getIDValue.MovieType?.(r))
      : getIDValue.MovieType?.(MovieType)
  );
  const getDisplayValue = {
    MovieTeam: (r) => `${r?.director}`,
    MovieInPlaylists: (r) => `${r?.Title}${" by: "}${r?.Creator}`,
    MovieType: (r) => `${r?.type}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    name_eng: [{ type: "Required" }],
    genre: [{ type: "Required" }],
    description: [{ type: "Required" }],
    description_eng: [{ type: "Required" }],
    screen_language: [{ type: "Required" }],
    captions_language: [],
    origin_country: [],
    length: [],
    created_year: [],
    MovieType: [{ type: "Required" }],
    photo_location: [],
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
  const fetchMovieTypeRecords = async (value) => {
    setMovieTypeLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: [{ type: { contains: value } }] },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listMovieTypes.replaceAll("__typename", ""),
          variables,
          authMode: 'AWS_IAM',
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
          name,
          name_eng,
          type,
          genre,
          description,
          description_eng,
          screen_language,
          captions_language,
          origin_country,
          length,
          created_year,
          MovieType,
          photo_location,
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
          const modelFieldsToSave = {
            name: modelFields.name,
            name_eng: modelFields.name_eng,
            type: modelFields.type,
            genre: modelFields.genre,
            description: modelFields.description,
            description_eng: modelFields.description_eng,
            screen_language: modelFields.screen_language,
            captions_language: modelFields.captions_language,
            origin_country: modelFields.origin_country,
            length: modelFields.length,
            created_year: modelFields.created_year,
            movieMovieTeamId: modelFields?.MovieTeam?.id,
            movieMovieTypeId: modelFields?.MovieType?.id,
          };
          const movie = (
            await API.graphql({
              query: createMovie.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
              authMode: 'AWS_IAM',
            })
          )?.data?.createMovie;
          // console.log(movie);
          // await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
          props.changeState('team', movie);
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MovieCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              name_eng,
              type,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              MovieType,
          photo_location,
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
        label="Title in English"
        isRequired={true}
        isReadOnly={false}
        value={name_eng}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng: value,
              type,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              MovieType,
          photo_location,
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
        isRequired={true}
        isReadOnly={false}
        value={genre}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              type,
              genre: value,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              MovieType,
             photo_location,
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
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              type,
              genre,
              description: value,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              MovieTeam,
              MovieInPlaylists,
              MovieType,
              photo_location,
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
        label="Description in English"
        isRequired={true}
        isReadOnly={false}
        value={description_eng}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              type,
              genre,
              description,
              description_eng: value,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              MovieType,
             photo_location,
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
        isRequired={true}
        isReadOnly={false}
        value={screen_language}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              type,
              genre,
              description,
              description_eng,
              screen_language: value,
              captions_language,
              origin_country,
              length,
              created_year,
              MovieType,
             photo_location,
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
              type,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language: value,
              origin_country,
              length,
              created_year,
              MovieType,
             photo_location,
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
              type,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country: value,
              length,
              created_year,
              MovieType,
             photo_location,
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
              type,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length: value,
              created_year,
              MovieType,
              photo_location,
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
        value={created_year}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              type,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year: value,
              MovieType,
             photo_location,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              type,
              genre,
              description,
              description_eng,
              screen_language,
              captions_language,
              origin_country,
              length,
              created_year,
              MovieTeam,
              MovieInPlaylists,
              MovieType: value,
             photo_location,
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
          placeholder="Select Movie Type"
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}