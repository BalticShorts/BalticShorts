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
import { listPeople } from "../graphql/queries";
import { createTestTeam, createTestTeamPerson } from "../graphql/mutations";
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
export default function TestTeamCreateForm(props) {
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
    director: "",
    People: [],
    actors: [],
  };
  const [director, setDirector] = React.useState(initialValues.director);
  const [People, setPeople] = React.useState(initialValues.People);
  const [PeopleLoading, setPeopleLoading] = React.useState(false);
  const [PeopleRecords, setPeopleRecords] = React.useState([]);
  const [actors, setActors] = React.useState(initialValues.actors);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDirector(initialValues.director);
    setPeople(initialValues.People);
    setCurrentPeopleValue(undefined);
    setCurrentPeopleDisplayValue("");
    setActors(initialValues.actors);
    setCurrentActorsValue("");
    setErrors({});
  };
  const [currentPeopleDisplayValue, setCurrentPeopleDisplayValue] =
    React.useState("");
  const [currentPeopleValue, setCurrentPeopleValue] = React.useState(undefined);
  const PeopleRef = React.createRef();
  const [currentActorsValue, setCurrentActorsValue] = React.useState("");
  const actorsRef = React.createRef();
  const getIDValue = {
    People: (r) => JSON.stringify({ id: r?.id }),
  };
  const PeopleIdSet = new Set(
    Array.isArray(People)
      ? People.map((r) => getIDValue.People?.(r))
      : getIDValue.People?.(People)
  );
  const getDisplayValue = {
    People: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    director: [{ type: "Required" }],
    People: [],
    actors: [],
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
  const fetchPeopleRecords = async (value) => {
    setPeopleLoading(true);
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
          query: listPeople.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listPeople?.items;
      var loaded = result.filter(
        (item) => !PeopleIdSet.has(getIDValue.People?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPeopleRecords(newOptions.slice(0, autocompleteLength));
    setPeopleLoading(false);
  };
  React.useEffect(() => {
    fetchPeopleRecords("");
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
          director,
          People,
          actors,
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
            director: modelFields.director,
            actors: modelFields.actors,
          };
          const testTeam = (
            await API.graphql({
              query: createTestTeam.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createTestTeam;
          const promises = [];
          promises.push(
            ...People.reduce((promises, person) => {
              promises.push(
                API.graphql({
                  query: createTestTeamPerson.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      testTeamId: testTeam.id,
                      personId: Person.id,
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
      {...getOverrideProps(overrides, "TestTeamCreateForm")}
      {...rest}
    >
      <TextField
        label="Director"
        isRequired={true}
        isReadOnly={false}
        value={director}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              director: value,
              People,
              actors,
            };
            const result = onChange(modelFields);
            value = result?.director ?? value;
          }
          if (errors.director?.hasError) {
            runValidationTasks("director", value);
          }
          setDirector(value);
        }}
        onBlur={() => runValidationTasks("director", director)}
        errorMessage={errors.director?.errorMessage}
        hasError={errors.director?.hasError}
        {...getOverrideProps(overrides, "director")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              People: values,
              actors,
            };
            const result = onChange(modelFields);
            values = result?.People ?? values;
          }
          setPeople(values);
          setCurrentPeopleValue(undefined);
          setCurrentPeopleDisplayValue("");
        }}
        currentFieldValue={currentPeopleValue}
        label={"People"}
        items={People}
        hasError={errors?.People?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("People", currentPeopleValue)
        }
        errorMessage={errors?.People?.errorMessage}
        getBadgeText={getDisplayValue.People}
        setFieldValue={(model) => {
          setCurrentPeopleDisplayValue(
            model ? getDisplayValue.People(model) : ""
          );
          setCurrentPeopleValue(model);
        }}
        inputFieldRef={PeopleRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="People"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Person"
          value={currentPeopleDisplayValue}
          options={PeopleRecords.map((r) => ({
            id: getIDValue.People?.(r),
            label: getDisplayValue.People?.(r),
          }))}
          isLoading={PeopleLoading}
          onSelect={({ id, label }) => {
            setCurrentPeopleValue(
              PeopleRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPeopleDisplayValue(label);
            runValidationTasks("People", label);
          }}
          onClear={() => {
            setCurrentPeopleDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPeopleRecords(value);
            if (errors.People?.hasError) {
              runValidationTasks("People", value);
            }
            setCurrentPeopleDisplayValue(value);
            setCurrentPeopleValue(undefined);
          }}
          onBlur={() => runValidationTasks("People", currentPeopleDisplayValue)}
          errorMessage={errors.People?.errorMessage}
          hasError={errors.People?.hasError}
          ref={PeopleRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "People")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              People,
              actors: values,
            };
            const result = onChange(modelFields);
            values = result?.actors ?? values;
          }
          setActors(values);
          setCurrentActorsValue("");
        }}
        currentFieldValue={currentActorsValue}
        label={"Actors"}
        items={actors}
        hasError={errors?.actors?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("actors", currentActorsValue)
        }
        errorMessage={errors?.actors?.errorMessage}
        setFieldValue={setCurrentActorsValue}
        inputFieldRef={actorsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Actors"
          isRequired={false}
          isReadOnly={false}
          value={currentActorsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.actors?.hasError) {
              runValidationTasks("actors", value);
            }
            setCurrentActorsValue(value);
          }}
          onBlur={() => runValidationTasks("actors", currentActorsValue)}
          errorMessage={errors.actors?.errorMessage}
          hasError={errors.actors?.hasError}
          ref={actorsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "actors")}
        ></TextField>
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
