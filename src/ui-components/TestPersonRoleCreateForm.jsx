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
import { listTestPeople, listTestRoles } from "../graphql/queries";
import { createTestPersonRole } from "../graphql/mutations";
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
export default function TestPersonRoleCreateForm(props) {
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
    person: undefined,
    role: undefined,
    testPersonRolesId: undefined,
  };
  const [person, setPerson] = React.useState(initialValues.person);
  const [personLoading, setPersonLoading] = React.useState(false);
  const [personRecords, setPersonRecords] = React.useState([]);
  const [role, setRole] = React.useState(initialValues.role);
  const [roleLoading, setRoleLoading] = React.useState(false);
  const [roleRecords, setRoleRecords] = React.useState([]);
  const [testPersonRolesId, setTestPersonRolesId] = React.useState(
    initialValues.testPersonRolesId
  );
  const [testPersonRolesIdLoading, setTestPersonRolesIdLoading] =
    React.useState(false);
  const [testPersonRolesIdRecords, setTestPersonRolesIdRecords] =
    React.useState([]);
  const [
    selectedTestPersonRolesIdRecords,
    setSelectedTestPersonRolesIdRecords,
  ] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPerson(initialValues.person);
    setCurrentPersonValue(undefined);
    setCurrentPersonDisplayValue("");
    setRole(initialValues.role);
    setCurrentRoleValue(undefined);
    setCurrentRoleDisplayValue("");
    setTestPersonRolesId(initialValues.testPersonRolesId);
    setCurrentTestPersonRolesIdValue(undefined);
    setCurrentTestPersonRolesIdDisplayValue("");
    setErrors({});
  };
  const [currentPersonDisplayValue, setCurrentPersonDisplayValue] =
    React.useState("");
  const [currentPersonValue, setCurrentPersonValue] = React.useState(undefined);
  const personRef = React.createRef();
  const [currentRoleDisplayValue, setCurrentRoleDisplayValue] =
    React.useState("");
  const [currentRoleValue, setCurrentRoleValue] = React.useState(undefined);
  const roleRef = React.createRef();
  const [
    currentTestPersonRolesIdDisplayValue,
    setCurrentTestPersonRolesIdDisplayValue,
  ] = React.useState("");
  const [currentTestPersonRolesIdValue, setCurrentTestPersonRolesIdValue] =
    React.useState(undefined);
  const testPersonRolesIdRef = React.createRef();
  const getIDValue = {
    person: (r) => JSON.stringify({ id: r?.id }),
    role: (r) => JSON.stringify({ id: r?.id }),
  };
  const personIdSet = new Set(
    Array.isArray(person)
      ? person.map((r) => getIDValue.person?.(r))
      : getIDValue.person?.(person)
  );
  const roleIdSet = new Set(
    Array.isArray(role)
      ? role.map((r) => getIDValue.role?.(r))
      : getIDValue.role?.(role)
  );
  const getDisplayValue = {
    person: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    role: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    testPersonRolesId: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    person: [],
    role: [],
    testPersonRolesId: [],
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
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listTestPeople.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTestPeople?.items;
      var loaded = result.filter(
        (item) => !personIdSet.has(getIDValue.person?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPersonRecords(newOptions.slice(0, autocompleteLength));
    setPersonLoading(false);
  };
  const fetchRoleRecords = async (value) => {
    setRoleLoading(true);
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
          query: listTestRoles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTestRoles?.items;
      var loaded = result.filter(
        (item) => !roleIdSet.has(getIDValue.role?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setRoleRecords(newOptions.slice(0, autocompleteLength));
    setRoleLoading(false);
  };
  const fetchTestPersonRolesIdRecords = async (value) => {
    setTestPersonRolesIdLoading(true);
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
          query: listTestPeople.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTestPeople?.items;
      var loaded = result.filter((item) => testPersonRolesId !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTestPersonRolesIdRecords(newOptions.slice(0, autocompleteLength));
    setTestPersonRolesIdLoading(false);
  };
  React.useEffect(() => {
    fetchPersonRecords("");
    fetchRoleRecords("");
    fetchTestPersonRolesIdRecords("");
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
          person,
          role,
          testPersonRolesId,
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
            personID: modelFields?.person?.id,
            roleID: modelFields?.role?.id,
            testPersonRolesId: modelFields.testPersonRolesId,
          };
          await API.graphql({
            query: createTestPersonRole.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "TestPersonRoleCreateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              person: value,
              role,
              testPersonRolesId,
            };
            const result = onChange(modelFields);
            value = result?.person ?? value;
          }
          setPerson(value);
          setCurrentPersonValue(undefined);
          setCurrentPersonDisplayValue("");
        }}
        currentFieldValue={currentPersonValue}
        label={"Person"}
        items={person ? [person] : []}
        hasError={errors?.person?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("person", currentPersonValue)
        }
        errorMessage={errors?.person?.errorMessage}
        getBadgeText={getDisplayValue.person}
        setFieldValue={(model) => {
          setCurrentPersonDisplayValue(
            model ? getDisplayValue.person(model) : ""
          );
          setCurrentPersonValue(model);
        }}
        inputFieldRef={personRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Person"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TestPerson"
          value={currentPersonDisplayValue}
          options={personRecords
            .filter((r) => !personIdSet.has(getIDValue.person?.(r)))
            .map((r) => ({
              id: getIDValue.person?.(r),
              label: getDisplayValue.person?.(r),
            }))}
          isLoading={personLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonValue(
              personRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPersonDisplayValue(label);
            runValidationTasks("person", label);
          }}
          onClear={() => {
            setCurrentPersonDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPersonRecords(value);
            if (errors.person?.hasError) {
              runValidationTasks("person", value);
            }
            setCurrentPersonDisplayValue(value);
            setCurrentPersonValue(undefined);
          }}
          onBlur={() => runValidationTasks("person", currentPersonDisplayValue)}
          errorMessage={errors.person?.errorMessage}
          hasError={errors.person?.hasError}
          ref={personRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "person")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              person,
              role: value,
              testPersonRolesId,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          setRole(value);
          setCurrentRoleValue(undefined);
          setCurrentRoleDisplayValue("");
        }}
        currentFieldValue={currentRoleValue}
        label={"Role"}
        items={role ? [role] : []}
        hasError={errors?.role?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("role", currentRoleValue)
        }
        errorMessage={errors?.role?.errorMessage}
        getBadgeText={getDisplayValue.role}
        setFieldValue={(model) => {
          setCurrentRoleDisplayValue(model ? getDisplayValue.role(model) : "");
          setCurrentRoleValue(model);
        }}
        inputFieldRef={roleRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Role"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TestRole"
          value={currentRoleDisplayValue}
          options={roleRecords
            .filter((r) => !roleIdSet.has(getIDValue.role?.(r)))
            .map((r) => ({
              id: getIDValue.role?.(r),
              label: getDisplayValue.role?.(r),
            }))}
          isLoading={roleLoading}
          onSelect={({ id, label }) => {
            setCurrentRoleValue(
              roleRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentRoleDisplayValue(label);
            runValidationTasks("role", label);
          }}
          onClear={() => {
            setCurrentRoleDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchRoleRecords(value);
            if (errors.role?.hasError) {
              runValidationTasks("role", value);
            }
            setCurrentRoleDisplayValue(value);
            setCurrentRoleValue(undefined);
          }}
          onBlur={() => runValidationTasks("role", currentRoleDisplayValue)}
          errorMessage={errors.role?.errorMessage}
          hasError={errors.role?.hasError}
          ref={roleRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "role")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              person,
              role,
              testPersonRolesId: value,
            };
            const result = onChange(modelFields);
            value = result?.testPersonRolesId ?? value;
          }
          setTestPersonRolesId(value);
          setCurrentTestPersonRolesIdValue(undefined);
        }}
        currentFieldValue={currentTestPersonRolesIdValue}
        label={"Test person roles id"}
        items={testPersonRolesId ? [testPersonRolesId] : []}
        hasError={errors?.testPersonRolesId?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "testPersonRolesId",
            currentTestPersonRolesIdValue
          )
        }
        errorMessage={errors?.testPersonRolesId?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.testPersonRolesId(
                testPersonRolesIdRecords.find((r) => r.id === value) ??
                  selectedTestPersonRolesIdRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentTestPersonRolesIdDisplayValue(
            value
              ? getDisplayValue.testPersonRolesId(
                  testPersonRolesIdRecords.find((r) => r.id === value) ??
                    selectedTestPersonRolesIdRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentTestPersonRolesIdValue(value);
          const selectedRecord = testPersonRolesIdRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedTestPersonRolesIdRecords([selectedRecord]);
          }
        }}
        inputFieldRef={testPersonRolesIdRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Test person roles id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TestPerson"
          value={currentTestPersonRolesIdDisplayValue}
          options={testPersonRolesIdRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.testPersonRolesId?.(r),
            }))}
          isLoading={testPersonRolesIdLoading}
          onSelect={({ id, label }) => {
            setCurrentTestPersonRolesIdValue(id);
            setCurrentTestPersonRolesIdDisplayValue(label);
            runValidationTasks("testPersonRolesId", label);
          }}
          onClear={() => {
            setCurrentTestPersonRolesIdDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchTestPersonRolesIdRecords(value);
            if (errors.testPersonRolesId?.hasError) {
              runValidationTasks("testPersonRolesId", value);
            }
            setCurrentTestPersonRolesIdDisplayValue(value);
            setCurrentTestPersonRolesIdValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "testPersonRolesId",
              currentTestPersonRolesIdValue
            )
          }
          errorMessage={errors.testPersonRolesId?.errorMessage}
          hasError={errors.testPersonRolesId?.hasError}
          ref={testPersonRolesIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "testPersonRolesId")}
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
