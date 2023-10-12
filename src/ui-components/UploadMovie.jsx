/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { createMovie } from "../graphql/mutations";
export default function UploadMovie(props) {
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
    uploaded_at: "",
    guid: "",
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
  const [uploaded_at, setUploaded_at] = React.useState(
    initialValues.uploaded_at
  );
  const [guid, setGuid] = React.useState(initialValues.guid);
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
    setUploaded_at(initialValues.uploaded_at);
    setGuid(initialValues.guid);
    setErrors({});
  };
  const validations = {
    name: [],
    name_eng: [],
    type: [],
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
          uploaded_at,
          guid,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
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
          await API.graphql({
            query: createMovie,
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UploadMovie")}
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
              type,
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
              type,
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
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              name_eng,
              type: value,
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
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></SelectField>
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
              type,
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
              type,
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
              type,
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
              type,
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
              uploaded_at,
              guid,
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
              uploaded_at,
              guid,
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
              uploaded_at,
              guid,
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
              uploaded_at,
              guid,
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
              type,
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
              type,
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
        ></Flex>
      </Flex>
    </Grid>
  );
}
