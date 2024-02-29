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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { listTestMovieRoles, listTestPersonRoles } from "../graphql/queries";
import {
  createTestRole,
  updateTestMovieRole,
  updateTestPersonRole,
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
export default function TestRoleCreateForm(props) {
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
    movieRoles: [],
    personRoles: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [movieRoles, setMovieRoles] = React.useState(initialValues.movieRoles);
  const [movieRolesLoading, setMovieRolesLoading] = React.useState(false);
  const [movieRolesRecords, setMovieRolesRecords] = React.useState([]);
  const [personRoles, setPersonRoles] = React.useState(
    initialValues.personRoles
  );
  const [personRolesLoading, setPersonRolesLoading] = React.useState(false);
  const [personRolesRecords, setPersonRolesRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setMovieRoles(initialValues.movieRoles);
    setCurrentMovieRolesValue(undefined);
    setCurrentMovieRolesDisplayValue("");
    setPersonRoles(initialValues.personRoles);
    setCurrentPersonRolesValue(undefined);
    setCurrentPersonRolesDisplayValue("");
    setErrors({});
  };
  const [currentMovieRolesDisplayValue, setCurrentMovieRolesDisplayValue] =
    React.useState("");
  const [currentMovieRolesValue, setCurrentMovieRolesValue] =
    React.useState(undefined);
  const movieRolesRef = React.createRef();
  const [currentPersonRolesDisplayValue, setCurrentPersonRolesDisplayValue] =
    React.useState("");
  const [currentPersonRolesValue, setCurrentPersonRolesValue] =
    React.useState(undefined);
  const personRolesRef = React.createRef();
  const getIDValue = {
    movieRoles: (r) => JSON.stringify({ id: r?.id }),
    personRoles: (r) => JSON.stringify({ id: r?.id }),
  };
  const movieRolesIdSet = new Set(
    Array.isArray(movieRoles)
      ? movieRoles.map((r) => getIDValue.movieRoles?.(r))
      : getIDValue.movieRoles?.(movieRoles)
  );
  const personRolesIdSet = new Set(
    Array.isArray(personRoles)
      ? personRoles.map((r) => getIDValue.personRoles?.(r))
      : getIDValue.personRoles?.(personRoles)
  );
  const getDisplayValue = {
    movieRoles: (r) => r?.id,
    personRoles: (r) => r?.id,
  };
  const validations = {
    name: [{ type: "Required" }],
    movieRoles: [],
    personRoles: [],
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
  const fetchMovieRolesRecords = async (value) => {
    setMovieRolesLoading(true);
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
          query: listTestMovieRoles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTestMovieRoles?.items;
      var loaded = result.filter(
        (item) => !movieRolesIdSet.has(getIDValue.movieRoles?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMovieRolesRecords(newOptions.slice(0, autocompleteLength));
    setMovieRolesLoading(false);
  };
  const fetchPersonRolesRecords = async (value) => {
    setPersonRolesLoading(true);
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
          query: listTestPersonRoles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTestPersonRoles?.items;
      var loaded = result.filter(
        (item) => !personRolesIdSet.has(getIDValue.personRoles?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPersonRolesRecords(newOptions.slice(0, autocompleteLength));
    setPersonRolesLoading(false);
  };
  React.useEffect(() => {
    fetchMovieRolesRecords("");
    fetchPersonRolesRecords("");
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
          movieRoles,
          personRoles,
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
          };
          const testRole = (
            await API.graphql({
              query: createTestRole.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createTestRole;
          const promises = [];
          promises.push(
            ...movieRoles.reduce((promises, original) => {
              promises.push(
                API.graphql({
                  query: updateTestMovieRole.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...personRoles.reduce((promises, original) => {
              promises.push(
                API.graphql({
                  query: updateTestPersonRole.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "TestRoleCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              movieRoles,
              personRoles,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              movieRoles: values,
              personRoles,
            };
            const result = onChange(modelFields);
            values = result?.movieRoles ?? values;
          }
          setMovieRoles(values);
          setCurrentMovieRolesValue(undefined);
          setCurrentMovieRolesDisplayValue("");
        }}
        currentFieldValue={currentMovieRolesValue}
        label={"Movie roles"}
        items={movieRoles}
        hasError={errors?.movieRoles?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("movieRoles", currentMovieRolesValue)
        }
        errorMessage={errors?.movieRoles?.errorMessage}
        getBadgeText={getDisplayValue.movieRoles}
        setFieldValue={(model) => {
          setCurrentMovieRolesDisplayValue(
            model ? getDisplayValue.movieRoles(model) : ""
          );
          setCurrentMovieRolesValue(model);
        }}
        inputFieldRef={movieRolesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie roles"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TestMovieRole"
          value={currentMovieRolesDisplayValue}
          options={movieRolesRecords.map((r) => ({
            id: getIDValue.movieRoles?.(r),
            label: getDisplayValue.movieRoles?.(r),
          }))}
          isLoading={movieRolesLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieRolesValue(
              movieRolesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMovieRolesDisplayValue(label);
            runValidationTasks("movieRoles", label);
          }}
          onClear={() => {
            setCurrentMovieRolesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMovieRolesRecords(value);
            if (errors.movieRoles?.hasError) {
              runValidationTasks("movieRoles", value);
            }
            setCurrentMovieRolesDisplayValue(value);
            setCurrentMovieRolesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("movieRoles", currentMovieRolesDisplayValue)
          }
          errorMessage={errors.movieRoles?.errorMessage}
          hasError={errors.movieRoles?.hasError}
          ref={movieRolesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "movieRoles")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              movieRoles,
              personRoles: values,
            };
            const result = onChange(modelFields);
            values = result?.personRoles ?? values;
          }
          setPersonRoles(values);
          setCurrentPersonRolesValue(undefined);
          setCurrentPersonRolesDisplayValue("");
        }}
        currentFieldValue={currentPersonRolesValue}
        label={"Person roles"}
        items={personRoles}
        hasError={errors?.personRoles?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("personRoles", currentPersonRolesValue)
        }
        errorMessage={errors?.personRoles?.errorMessage}
        getBadgeText={getDisplayValue.personRoles}
        setFieldValue={(model) => {
          setCurrentPersonRolesDisplayValue(
            model ? getDisplayValue.personRoles(model) : ""
          );
          setCurrentPersonRolesValue(model);
        }}
        inputFieldRef={personRolesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Person roles"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TestPersonRole"
          value={currentPersonRolesDisplayValue}
          options={personRolesRecords.map((r) => ({
            id: getIDValue.personRoles?.(r),
            label: getDisplayValue.personRoles?.(r),
          }))}
          isLoading={personRolesLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonRolesValue(
              personRolesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPersonRolesDisplayValue(label);
            runValidationTasks("personRoles", label);
          }}
          onClear={() => {
            setCurrentPersonRolesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPersonRolesRecords(value);
            if (errors.personRoles?.hasError) {
              runValidationTasks("personRoles", value);
            }
            setCurrentPersonRolesDisplayValue(value);
            setCurrentPersonRolesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("personRoles", currentPersonRolesDisplayValue)
          }
          errorMessage={errors.personRoles?.errorMessage}
          hasError={errors.personRoles?.hasError}
          ref={personRolesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "personRoles")}
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
