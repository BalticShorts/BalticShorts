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
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { listMovieTeams, listPeople, listRoles } from "../graphql/queries";
import { createPersonMovieTeam } from "../graphql/mutations";
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
export default function PersonMovieTeamCreateForm(props) {
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
    MovieTeam: undefined,
    Person: undefined,
    Role: undefined,
  };
  const [MovieTeam, setMovieTeam] = React.useState(initialValues.MovieTeam);
  const [MovieTeamLoading, setMovieTeamLoading] = React.useState(false);
  const [movieTeamRecords, setMovieTeamRecords] = React.useState([]);
  const [Person, setPerson] = React.useState(initialValues.Person);
  const [PersonLoading, setPersonLoading] = React.useState(false);
  const [personRecords, setPersonRecords] = React.useState([]);
  const [Role, setRole] = React.useState(initialValues.Role);
  const [RoleLoading, setRoleLoading] = React.useState(false);
  const [roleRecords, setRoleRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMovieTeam(initialValues.MovieTeam);
    setCurrentMovieTeamValue(undefined);
    setCurrentMovieTeamDisplayValue("");
    setPerson(initialValues.Person);
    setCurrentPersonValue(undefined);
    setCurrentPersonDisplayValue("");
    setRole(initialValues.Role);
    setCurrentRoleValue(undefined);
    setCurrentRoleDisplayValue("");
    setErrors({});
  };
  const [currentMovieTeamDisplayValue, setCurrentMovieTeamDisplayValue] =
    React.useState("");
  const [currentMovieTeamValue, setCurrentMovieTeamValue] =
    React.useState(undefined);
  const MovieTeamRef = React.createRef();
  const [currentPersonDisplayValue, setCurrentPersonDisplayValue] =
    React.useState("");
  const [currentPersonValue, setCurrentPersonValue] = React.useState(undefined);
  const PersonRef = React.createRef();
  const [currentRoleDisplayValue, setCurrentRoleDisplayValue] =
    React.useState("");
  const [currentRoleValue, setCurrentRoleValue] = React.useState(undefined);
  const RoleRef = React.createRef();
  const getIDValue = {
    MovieTeam: (r) => JSON.stringify({ id: r?.id }),
    Person: (r) => JSON.stringify({ id: r?.id }),
    Role: (r) => JSON.stringify({ id: r?.id }),
  };
  const MovieTeamIdSet = new Set(
    Array.isArray(MovieTeam)
      ? MovieTeam.map((r) => getIDValue.MovieTeam?.(r))
      : getIDValue.MovieTeam?.(MovieTeam)
  );
  const PersonIdSet = new Set(
    Array.isArray(Person)
      ? Person.map((r) => getIDValue.Person?.(r))
      : getIDValue.Person?.(Person)
  );
  const RoleIdSet = new Set(
    Array.isArray(Role)
      ? Role.map((r) => getIDValue.Role?.(r))
      : getIDValue.Role?.(Role)
  );
  const getDisplayValue = {
    MovieTeam: (r) => `${r?.director ? r?.director + " - " : ""}${r?.id}`,
    Person: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Role: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    MovieTeam: [],
    Person: [],
    Role: [],
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
  const fetchMovieTeamRecords = async (value) => {
    setMovieTeamLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ director: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listMovieTeams.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMovieTeams?.items;
      var loaded = result.filter(
        (item) => !MovieTeamIdSet.has(getIDValue.MovieTeam?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMovieTeamRecords(newOptions.slice(0, autocompleteLength));
    setMovieTeamLoading(false);
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
          query: listRoles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listRoles?.items;
      var loaded = result.filter(
        (item) => !RoleIdSet.has(getIDValue.Role?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setRoleRecords(newOptions.slice(0, autocompleteLength));
    setRoleLoading(false);
  };
  React.useEffect(() => {
    fetchMovieTeamRecords("");
    fetchPersonRecords("");
    fetchRoleRecords("");
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
          MovieTeam,
          Person,
          Role,
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
            movieteamID: modelFields?.MovieTeam?.id,
            personID: modelFields?.Person?.id,
            roleID: modelFields?.Role?.id,
          };
          await API.graphql({
            query: createPersonMovieTeam.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "PersonMovieTeamCreateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              MovieTeam: value,
              Person,
              Role,
            };
            const result = onChange(modelFields);
            value = result?.MovieTeam ?? value;
          }
          setMovieTeam(value);
          setCurrentMovieTeamValue(undefined);
          setCurrentMovieTeamDisplayValue("");
        }}
        currentFieldValue={currentMovieTeamValue}
        label={"Movie team"}
        items={MovieTeam ? [MovieTeam] : []}
        hasError={errors?.MovieTeam?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("MovieTeam", currentMovieTeamValue)
        }
        errorMessage={errors?.MovieTeam?.errorMessage}
        getBadgeText={getDisplayValue.MovieTeam}
        setFieldValue={(model) => {
          setCurrentMovieTeamDisplayValue(
            model ? getDisplayValue.MovieTeam(model) : ""
          );
          setCurrentMovieTeamValue(model);
        }}
        inputFieldRef={MovieTeamRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie team"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search MovieTeam"
          value={currentMovieTeamDisplayValue}
          options={movieTeamRecords
            .filter((r) => !MovieTeamIdSet.has(getIDValue.MovieTeam?.(r)))
            .map((r) => ({
              id: getIDValue.MovieTeam?.(r),
              label: getDisplayValue.MovieTeam?.(r),
            }))}
          isLoading={MovieTeamLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieTeamValue(
              movieTeamRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMovieTeamDisplayValue(label);
            runValidationTasks("MovieTeam", label);
          }}
          onClear={() => {
            setCurrentMovieTeamDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMovieTeamRecords(value);
            if (errors.MovieTeam?.hasError) {
              runValidationTasks("MovieTeam", value);
            }
            setCurrentMovieTeamDisplayValue(value);
            setCurrentMovieTeamValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("MovieTeam", currentMovieTeamDisplayValue)
          }
          errorMessage={errors.MovieTeam?.errorMessage}
          hasError={errors.MovieTeam?.hasError}
          ref={MovieTeamRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MovieTeam")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              MovieTeam,
              Person: value,
              Role,
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
          options={personRecords
            .filter((r) => !PersonIdSet.has(getIDValue.Person?.(r)))
            .map((r) => ({
              id: getIDValue.Person?.(r),
              label: getDisplayValue.Person?.(r),
            }))}
          isLoading={PersonLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonValue(
              personRecords.find((r) =>
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
              MovieTeam,
              Person,
              Role: value,
            };
            const result = onChange(modelFields);
            value = result?.Role ?? value;
          }
          setRole(value);
          setCurrentRoleValue(undefined);
          setCurrentRoleDisplayValue("");
        }}
        currentFieldValue={currentRoleValue}
        label={"Role"}
        items={Role ? [Role] : []}
        hasError={errors?.Role?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Role", currentRoleValue)
        }
        errorMessage={errors?.Role?.errorMessage}
        getBadgeText={getDisplayValue.Role}
        setFieldValue={(model) => {
          setCurrentRoleDisplayValue(model ? getDisplayValue.Role(model) : "");
          setCurrentRoleValue(model);
        }}
        inputFieldRef={RoleRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Role"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Role"
          value={currentRoleDisplayValue}
          options={roleRecords
            .filter((r) => !RoleIdSet.has(getIDValue.Role?.(r)))
            .map((r) => ({
              id: getIDValue.Role?.(r),
              label: getDisplayValue.Role?.(r),
            }))}
          isLoading={RoleLoading}
          onSelect={({ id, label }) => {
            setCurrentRoleValue(
              roleRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentRoleDisplayValue(label);
            runValidationTasks("Role", label);
          }}
          onClear={() => {
            setCurrentRoleDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchRoleRecords(value);
            if (errors.Role?.hasError) {
              runValidationTasks("Role", value);
            }
            setCurrentRoleDisplayValue(value);
            setCurrentRoleValue(undefined);
          }}
          onBlur={() => runValidationTasks("Role", currentRoleDisplayValue)}
          errorMessage={errors.Role?.errorMessage}
          hasError={errors.Role?.hasError}
          ref={RoleRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Role")}
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
