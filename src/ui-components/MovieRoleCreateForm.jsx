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
import { listMovies, listRoles } from "../graphql/queries";
import { createMovieRole } from "../graphql/mutations";
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
export default function MovieRoleCreateForm(props) {
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
    Movie: undefined,
    Role: undefined,
    roleID: undefined,
  };
  const [Movie, setMovie] = React.useState(initialValues.Movie);
  const [MovieLoading, setMovieLoading] = React.useState(false);
  const [MovieRecords, setMovieRecords] = React.useState([]);
  const [Role, setRole] = React.useState(initialValues.Role);
  const [RoleLoading, setRoleLoading] = React.useState(false);
  const [RoleRecords, setRoleRecords] = React.useState([]);
  const [roleID, setRoleID] = React.useState(initialValues.roleID);
  const [roleIDLoading, setRoleIDLoading] = React.useState(false);
  const [roleIDRecords, setRoleIDRecords] = React.useState([]);
  const [selectedRoleIDRecords, setSelectedRoleIDRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMovie(initialValues.Movie);
    setCurrentMovieValue(undefined);
    setCurrentMovieDisplayValue("");
    setRole(initialValues.Role);
    setCurrentRoleValue(undefined);
    setCurrentRoleDisplayValue("");
    setRoleID(initialValues.roleID);
    setCurrentRoleIDValue(undefined);
    setCurrentRoleIDDisplayValue("");
    setErrors({});
  };
  const [currentMovieDisplayValue, setCurrentMovieDisplayValue] =
    React.useState("");
  const [currentMovieValue, setCurrentMovieValue] = React.useState(undefined);
  const MovieRef = React.createRef();
  const [currentRoleDisplayValue, setCurrentRoleDisplayValue] =
    React.useState("");
  const [currentRoleValue, setCurrentRoleValue] = React.useState(undefined);
  const RoleRef = React.createRef();
  const [currentRoleIDDisplayValue, setCurrentRoleIDDisplayValue] =
    React.useState("");
  const [currentRoleIDValue, setCurrentRoleIDValue] = React.useState(undefined);
  const roleIDRef = React.createRef();
  const getIDValue = {
    Movie: (r) => JSON.stringify({ id: r?.id }),
    Role: (r) => JSON.stringify({ id: r?.id }),
  };
  const MovieIdSet = new Set(
    Array.isArray(Movie)
      ? Movie.map((r) => getIDValue.Movie?.(r))
      : getIDValue.Movie?.(Movie)
  );
  const RoleIdSet = new Set(
    Array.isArray(Role)
      ? Role.map((r) => getIDValue.Role?.(r))
      : getIDValue.Role?.(Role)
  );
  const getDisplayValue = {
    Movie: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Role: (r) => `${r?.Name ? r?.Name + " - " : ""}${r?.id}`,
    roleID: (r) => `${r?.Name ? r?.Name + " - " : ""}${r?.id}`,
  };
  const validations = {
    Movie: [],
    Role: [],
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
  const fetchRoleRecords = async (value) => {
    setRoleLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ Name: { contains: value } }, { id: { contains: value } }],
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
  const fetchRoleIDRecords = async (value) => {
    setRoleIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ Name: { contains: value } }, { id: { contains: value } }],
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
    fetchMovieRecords("");
    fetchRoleRecords("");
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
          Movie,
          Role,
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
            movieID: modelFields?.Movie?.id,
            roleMovieRoleId: modelFields?.Role?.id,
            roleID: modelFields.roleID,
          };
          await API.graphql({
            query: createMovieRole.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "MovieRoleCreateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Movie: value,
              Role,
              roleID,
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
          options={MovieRecords.filter(
            (r) => !MovieIdSet.has(getIDValue.Movie?.(r))
          ).map((r) => ({
            id: getIDValue.Movie?.(r),
            label: getDisplayValue.Movie?.(r),
          }))}
          isLoading={MovieLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieValue(
              MovieRecords.find((r) =>
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Movie,
              Role: value,
              roleID,
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
          options={RoleRecords.filter(
            (r) => !RoleIdSet.has(getIDValue.Role?.(r))
          ).map((r) => ({
            id: getIDValue.Role?.(r),
            label: getDisplayValue.Role?.(r),
          }))}
          isLoading={RoleLoading}
          onSelect={({ id, label }) => {
            setCurrentRoleValue(
              RoleRecords.find((r) =>
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Movie,
              Role,
              roleID: value,
            };
            const result = onChange(modelFields);
            value = result?.roleID ?? value;
          }
          setRoleID(value);
          setCurrentRoleIDValue(undefined);
        }}
        currentFieldValue={currentRoleIDValue}
        label={"Role id"}
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
          label="Role id"
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
