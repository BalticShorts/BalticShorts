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
import { listPersonMovieTeams } from "../graphql/queries";
import { createRole, updatePersonMovieTeam } from "../graphql/mutations";
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
export default function RoleCreateForm(props) {
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
    PersonMovieTeam: [],
    name_eng: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [PersonMovieTeam, setPersonMovieTeam] = React.useState(
    initialValues.PersonMovieTeam
  );
  const [PersonMovieTeamLoading, setPersonMovieTeamLoading] =
    React.useState(false);
  const [personMovieTeamRecords, setPersonMovieTeamRecords] = React.useState(
    []
  );
  const [name_eng, setName_eng] = React.useState(initialValues.name_eng);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setPersonMovieTeam(initialValues.PersonMovieTeam);
    setCurrentPersonMovieTeamValue(undefined);
    setCurrentPersonMovieTeamDisplayValue("");
    setName_eng(initialValues.name_eng);
    setErrors({});
  };
  const [
    currentPersonMovieTeamDisplayValue,
    setCurrentPersonMovieTeamDisplayValue,
  ] = React.useState("");
  const [currentPersonMovieTeamValue, setCurrentPersonMovieTeamValue] =
    React.useState(undefined);
  const PersonMovieTeamRef = React.createRef();
  const getIDValue = {
    PersonMovieTeam: (r) => JSON.stringify({ id: r?.id }),
  };
  const PersonMovieTeamIdSet = new Set(
    Array.isArray(PersonMovieTeam)
      ? PersonMovieTeam.map((r) => getIDValue.PersonMovieTeam?.(r))
      : getIDValue.PersonMovieTeam?.(PersonMovieTeam)
  );
  const getDisplayValue = {
    PersonMovieTeam: (r) => r?.id,
  };
  const validations = {
    name: [{ type: "Required" }],
    PersonMovieTeam: [],
    name_eng: [],
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
  const fetchPersonMovieTeamRecords = async (value) => {
    setPersonMovieTeamLoading(true);
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
        (item) => !PersonMovieTeamIdSet.has(getIDValue.PersonMovieTeam?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPersonMovieTeamRecords(newOptions.slice(0, autocompleteLength));
    setPersonMovieTeamLoading(false);
  };
  React.useEffect(() => {
    fetchPersonMovieTeamRecords("");
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
          PersonMovieTeam,
          name_eng,
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
          };
          const role = (
            await API.graphql({
              query: createRole.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createRole;
          const promises = [];
          promises.push(
            ...PersonMovieTeam.reduce((promises, original) => {
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
      {...getOverrideProps(overrides, "RoleCreateForm")}
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
              PersonMovieTeam,
              name_eng,
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
              PersonMovieTeam: values,
              name_eng,
            };
            const result = onChange(modelFields);
            values = result?.PersonMovieTeam ?? values;
          }
          setPersonMovieTeam(values);
          setCurrentPersonMovieTeamValue(undefined);
          setCurrentPersonMovieTeamDisplayValue("");
        }}
        currentFieldValue={currentPersonMovieTeamValue}
        label={"Person movie team"}
        items={PersonMovieTeam}
        hasError={errors?.PersonMovieTeam?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "PersonMovieTeam",
            currentPersonMovieTeamValue
          )
        }
        errorMessage={errors?.PersonMovieTeam?.errorMessage}
        getBadgeText={getDisplayValue.PersonMovieTeam}
        setFieldValue={(model) => {
          setCurrentPersonMovieTeamDisplayValue(
            model ? getDisplayValue.PersonMovieTeam(model) : ""
          );
          setCurrentPersonMovieTeamValue(model);
        }}
        inputFieldRef={PersonMovieTeamRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Person movie team"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PersonMovieTeam"
          value={currentPersonMovieTeamDisplayValue}
          options={personMovieTeamRecords.map((r) => ({
            id: getIDValue.PersonMovieTeam?.(r),
            label: getDisplayValue.PersonMovieTeam?.(r),
          }))}
          isLoading={PersonMovieTeamLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonMovieTeamValue(
              personMovieTeamRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPersonMovieTeamDisplayValue(label);
            runValidationTasks("PersonMovieTeam", label);
          }}
          onClear={() => {
            setCurrentPersonMovieTeamDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPersonMovieTeamRecords(value);
            if (errors.PersonMovieTeam?.hasError) {
              runValidationTasks("PersonMovieTeam", value);
            }
            setCurrentPersonMovieTeamDisplayValue(value);
            setCurrentPersonMovieTeamValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "PersonMovieTeam",
              currentPersonMovieTeamDisplayValue
            )
          }
          errorMessage={errors.PersonMovieTeam?.errorMessage}
          hasError={errors.PersonMovieTeam?.hasError}
          ref={PersonMovieTeamRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "PersonMovieTeam")}
        ></Autocomplete>
      </ArrayField>
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
              PersonMovieTeam,
              name_eng: value,
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
