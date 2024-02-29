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
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { listPeople, listRoles } from "../graphql/queries";
import { createPersonRole } from "../graphql/mutations";
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
export default function PersonRoleCreateForm(props) {
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
    Person: undefined,
    roleID: undefined,
  };
  const [Person, setPerson] = React.useState(initialValues.Person);
  const [PersonLoading, setPersonLoading] = React.useState(false);
  const [PersonRecords, setPersonRecords] = React.useState([]);
  const [roleID, setRoleID] = React.useState(initialValues.roleID);
  const [roleIDLoading, setRoleIDLoading] = React.useState(false);
  const [roleIDRecords, setRoleIDRecords] = React.useState([]);
  const [selectedRoleIDRecords, setSelectedRoleIDRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPerson(initialValues.Person);
    setCurrentPersonValue(undefined);
    setCurrentPersonDisplayValue("");
    setRoleID(initialValues.roleID);
    setCurrentRoleIDValue(undefined);
    setCurrentRoleIDDisplayValue("");
    setErrors({});
  };
  const [currentPersonDisplayValue, setCurrentPersonDisplayValue] =
    React.useState("");
  const [currentPersonValue, setCurrentPersonValue] = React.useState(undefined);
  const PersonRef = React.createRef();
  const [currentRoleIDDisplayValue, setCurrentRoleIDDisplayValue] =
    React.useState("");
  const [currentRoleIDValue, setCurrentRoleIDValue] = React.useState(undefined);
  const roleIDRef = React.createRef();
  const getIDValue = {
    Person: (r) => JSON.stringify({ id: r?.id }),
  };
  const PersonIdSet = new Set(
    Array.isArray(Person)
      ? Person.map((r) => getIDValue.Person?.(r))
      : getIDValue.Person?.(Person)
  );
  const getDisplayValue = {
    Person: (r) => `${r?.name}${" - "}${r?.surname}${"-"}${r?.id}`,
    roleID: (r) => `${r?.Name}${" - "}${r?.id}${"-"}${Movie?.name}`,
  };
  const validations = {
    Person: [],
    roleID: [{ type: "Required" }],
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
  const fetchPersonRecords = async (value) => {
    setPersonLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { name: { contains: value } },
            { surname: { contains: value } },
            { id: { contains: value } },
          ],
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
        (item) => !PersonIdSet.has(getIDValue.Person?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPersonRecords(newOptions.slice(0, autocompleteLength));
    setPersonLoading(false);
  };
  const fetchRoleIDRecords = async (value) => {
    setRoleIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { Name: { contains: value } },
            { id: { contains: value } },
            { name: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listRoles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listRoles?.items;
      var loaded = result.filter((item) => roleID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setRoleIDRecords(newOptions.slice(0, autocompleteLength));
    setRoleIDLoading(false);
  };
  React.useEffect(() => {
    fetchPersonRecords("");
    fetchRoleIDRecords("");
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
          Person,
          roleID,
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
            personID: modelFields?.Person?.id,
            roleID: modelFields.roleID,
          };
          await API.graphql({
            query: createPersonRole.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFieldsToSave,
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
      {...getOverrideProps(overrides, "PersonRoleCreateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Person: value,
              roleID,
            };
            const result = onChange(modelFields);
            value = result?.Person ?? value;
          }
          setPerson(value);
          setCurrentPersonValue(undefined);
          setCurrentPersonDisplayValue("");
        }}
        currentFieldValue={currentPersonValue}
        label={"Person"}
        items={Person ? [Person] : []}
        hasError={errors?.Person?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Person", currentPersonValue)
        }
        errorMessage={errors?.Person?.errorMessage}
        getBadgeText={getDisplayValue.Person}
        setFieldValue={(model) => {
          setCurrentPersonDisplayValue(
            model ? getDisplayValue.Person(model) : ""
          );
          setCurrentPersonValue(model);
        }}
        inputFieldRef={PersonRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Person"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Person"
          value={currentPersonDisplayValue}
          options={PersonRecords.filter(
            (r) => !PersonIdSet.has(getIDValue.Person?.(r))
          ).map((r) => ({
            id: getIDValue.Person?.(r),
            label: getDisplayValue.Person?.(r),
          }))}
          isLoading={PersonLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonValue(
              PersonRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPersonDisplayValue(label);
            runValidationTasks("Person", label);
          }}
          onClear={() => {
            setCurrentPersonDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPersonRecords(value);
            if (errors.Person?.hasError) {
              runValidationTasks("Person", value);
            }
            setCurrentPersonDisplayValue(value);
            setCurrentPersonValue(undefined);
          }}
          onBlur={() => runValidationTasks("Person", currentPersonDisplayValue)}
          errorMessage={errors.Person?.errorMessage}
          hasError={errors.Person?.hasError}
          ref={PersonRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Person")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Person,
              roleID: value,
            };
            const result = onChange(modelFields);
            value = result?.roleID ?? value;
          }
          setRoleID(value);
          setCurrentRoleIDValue(undefined);
        }}
        currentFieldValue={currentRoleIDValue}
        label={"Role"}
        items={roleID ? [roleID] : []}
        hasError={errors?.roleID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("roleID", currentRoleIDValue)
        }
        errorMessage={errors?.roleID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.roleID(
                roleIDRecords.find((r) => r.id === value) ??
                  selectedRoleIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentRoleIDDisplayValue(
            value
              ? getDisplayValue.roleID(
                  roleIDRecords.find((r) => r.id === value) ??
                    selectedRoleIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentRoleIDValue(value);
          const selectedRecord = roleIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedRoleIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={roleIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Role"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Role"
          value={currentRoleIDDisplayValue}
          options={roleIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.roleID?.(r),
            }))}
          isLoading={roleIDLoading}
          onSelect={({ id, label }) => {
            setCurrentRoleIDValue(id);
            setCurrentRoleIDDisplayValue(label);
            runValidationTasks("roleID", label);
          }}
          onClear={() => {
            setCurrentRoleIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchRoleIDRecords(value);
            if (errors.roleID?.hasError) {
              runValidationTasks("roleID", value);
            }
            setCurrentRoleIDDisplayValue(value);
            setCurrentRoleIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("roleID", currentRoleIDValue)}
          errorMessage={errors.roleID?.errorMessage}
          hasError={errors.roleID?.hasError}
          ref={roleIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "roleID")}
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
