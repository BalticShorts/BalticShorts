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
import {
  getTestMovie,
  getTestMovieRole,
  listTestMovies,
  listTestRoles,
} from "../graphql/queries";
import { updateTestMovieRole } from "../graphql/mutations";
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
export default function TestMovieRoleUpdateForm(props) {
  const {
    id: idProp,
    testMovieRole: testMovieRoleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    movie: undefined,
    role: undefined,
    testMovieRolesId: undefined,
  };
  const [movie, setMovie] = React.useState(initialValues.movie);
  const [movieLoading, setMovieLoading] = React.useState(false);
  const [movieRecords, setMovieRecords] = React.useState([]);
  const [role, setRole] = React.useState(initialValues.role);
  const [roleLoading, setRoleLoading] = React.useState(false);
  const [roleRecords, setRoleRecords] = React.useState([]);
  const [testMovieRolesId, setTestMovieRolesId] = React.useState(
    initialValues.testMovieRolesId
  );
  const [testMovieRolesIdLoading, setTestMovieRolesIdLoading] =
    React.useState(false);
  const [testMovieRolesIdRecords, setTestMovieRolesIdRecords] = React.useState(
    []
  );
  const [selectedTestMovieRolesIdRecords, setSelectedTestMovieRolesIdRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = testMovieRoleRecord
      ? {
          ...initialValues,
          ...testMovieRoleRecord,
          movie,
          role,
          testMovieRolesId,
        }
      : initialValues;
    setMovie(cleanValues.movie);
    setCurrentMovieValue(undefined);
    setCurrentMovieDisplayValue("");
    setRole(cleanValues.role);
    setCurrentRoleValue(undefined);
    setCurrentRoleDisplayValue("");
    setTestMovieRolesId(cleanValues.testMovieRolesId);
    setCurrentTestMovieRolesIdValue(undefined);
    setCurrentTestMovieRolesIdDisplayValue("");
    setErrors({});
  };
  const [testMovieRoleRecord, setTestMovieRoleRecord] = React.useState(
    testMovieRoleModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getTestMovieRole.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTestMovieRole
        : testMovieRoleModelProp;
      const movieRecord = record ? await record.movie : undefined;
      setMovie(movieRecord);
      const roleRecord = record ? await record.role : undefined;
      setRole(roleRecord);
      const testMovieRolesIdRecord = record
        ? record.testMovieRolesId
        : undefined;
      const testMovieRecord = testMovieRolesIdRecord
        ? (
            await API.graphql({
              query: getTestMovie.replaceAll("__typename", ""),
              variables: { id: testMovieRolesIdRecord },
            })
          )?.data?.getTestMovie
        : undefined;
      setTestMovieRolesId(testMovieRolesIdRecord);
      setSelectedTestMovieRolesIdRecords([testMovieRecord]);
      setTestMovieRoleRecord(record);
    };
    queryData();
  }, [idProp, testMovieRoleModelProp]);
  React.useEffect(resetStateValues, [
    testMovieRoleRecord,
    movie,
    role,
    testMovieRolesId,
  ]);
  const [currentMovieDisplayValue, setCurrentMovieDisplayValue] =
    React.useState("");
  const [currentMovieValue, setCurrentMovieValue] = React.useState(undefined);
  const movieRef = React.createRef();
  const [currentRoleDisplayValue, setCurrentRoleDisplayValue] =
    React.useState("");
  const [currentRoleValue, setCurrentRoleValue] = React.useState(undefined);
  const roleRef = React.createRef();
  const [
    currentTestMovieRolesIdDisplayValue,
    setCurrentTestMovieRolesIdDisplayValue,
  ] = React.useState("");
  const [currentTestMovieRolesIdValue, setCurrentTestMovieRolesIdValue] =
    React.useState(undefined);
  const testMovieRolesIdRef = React.createRef();
  const getIDValue = {
    movie: (r) => JSON.stringify({ id: r?.id }),
    role: (r) => JSON.stringify({ id: r?.id }),
  };
  const movieIdSet = new Set(
    Array.isArray(movie)
      ? movie.map((r) => getIDValue.movie?.(r))
      : getIDValue.movie?.(movie)
  );
  const roleIdSet = new Set(
    Array.isArray(role)
      ? role.map((r) => getIDValue.role?.(r))
      : getIDValue.role?.(role)
  );
  const getDisplayValue = {
    movie: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    role: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    testMovieRolesId: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    movie: [],
    role: [],
    testMovieRolesId: [],
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
          or: [{ title: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listTestMovies.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTestMovies?.items;
      var loaded = result.filter(
        (item) => !movieIdSet.has(getIDValue.movie?.(item))
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
  const fetchTestMovieRolesIdRecords = async (value) => {
    setTestMovieRolesIdLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ title: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listTestMovies.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTestMovies?.items;
      var loaded = result.filter((item) => testMovieRolesId !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTestMovieRolesIdRecords(newOptions.slice(0, autocompleteLength));
    setTestMovieRolesIdLoading(false);
  };
  React.useEffect(() => {
    fetchMovieRecords("");
    fetchRoleRecords("");
    fetchTestMovieRolesIdRecords("");
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
          movie: movie ?? null,
          role: role ?? null,
          testMovieRolesId: testMovieRolesId ?? null,
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
            movieID: modelFields?.movie?.id ?? null,
            roleID: modelFields?.role?.id ?? null,
            testMovieRolesId: modelFields.testMovieRolesId ?? null,
          };
          await API.graphql({
            query: updateTestMovieRole.replaceAll("__typename", ""),
            variables: {
              input: {
                id: testMovieRoleRecord.id,
                ...modelFieldsToSave,
              },
            },
          });
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
      {...getOverrideProps(overrides, "TestMovieRoleUpdateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              movie: value,
              role,
              testMovieRolesId,
            };
            const result = onChange(modelFields);
            value = result?.movie ?? value;
          }
          setMovie(value);
          setCurrentMovieValue(undefined);
          setCurrentMovieDisplayValue("");
        }}
        currentFieldValue={currentMovieValue}
        label={"Movie"}
        items={movie ? [movie] : []}
        hasError={errors?.movie?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("movie", currentMovieValue)
        }
        errorMessage={errors?.movie?.errorMessage}
        getBadgeText={getDisplayValue.movie}
        setFieldValue={(model) => {
          setCurrentMovieDisplayValue(
            model ? getDisplayValue.movie(model) : ""
          );
          setCurrentMovieValue(model);
        }}
        inputFieldRef={movieRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TestMovie"
          value={currentMovieDisplayValue}
          options={movieRecords
            .filter((r) => !movieIdSet.has(getIDValue.movie?.(r)))
            .map((r) => ({
              id: getIDValue.movie?.(r),
              label: getDisplayValue.movie?.(r),
            }))}
          isLoading={movieLoading}
          onSelect={({ id, label }) => {
            setCurrentMovieValue(
              movieRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMovieDisplayValue(label);
            runValidationTasks("movie", label);
          }}
          onClear={() => {
            setCurrentMovieDisplayValue("");
          }}
          defaultValue={movie}
          onChange={(e) => {
            let { value } = e.target;
            fetchMovieRecords(value);
            if (errors.movie?.hasError) {
              runValidationTasks("movie", value);
            }
            setCurrentMovieDisplayValue(value);
            setCurrentMovieValue(undefined);
          }}
          onBlur={() => runValidationTasks("movie", currentMovieDisplayValue)}
          errorMessage={errors.movie?.errorMessage}
          hasError={errors.movie?.hasError}
          ref={movieRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "movie")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              movie,
              role: value,
              testMovieRolesId,
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
          defaultValue={role}
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
              movie,
              role,
              testMovieRolesId: value,
            };
            const result = onChange(modelFields);
            value = result?.testMovieRolesId ?? value;
          }
          setTestMovieRolesId(value);
          setCurrentTestMovieRolesIdValue(undefined);
        }}
        currentFieldValue={currentTestMovieRolesIdValue}
        label={"Test movie roles id"}
        items={testMovieRolesId ? [testMovieRolesId] : []}
        hasError={errors?.testMovieRolesId?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "testMovieRolesId",
            currentTestMovieRolesIdValue
          )
        }
        errorMessage={errors?.testMovieRolesId?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.testMovieRolesId(
                testMovieRolesIdRecords.find((r) => r.id === value) ??
                  selectedTestMovieRolesIdRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentTestMovieRolesIdDisplayValue(
            value
              ? getDisplayValue.testMovieRolesId(
                  testMovieRolesIdRecords.find((r) => r.id === value) ??
                    selectedTestMovieRolesIdRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentTestMovieRolesIdValue(value);
          const selectedRecord = testMovieRolesIdRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedTestMovieRolesIdRecords([selectedRecord]);
          }
        }}
        inputFieldRef={testMovieRolesIdRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Test movie roles id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TestMovie"
          value={currentTestMovieRolesIdDisplayValue}
          options={testMovieRolesIdRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.testMovieRolesId?.(r),
            }))}
          isLoading={testMovieRolesIdLoading}
          onSelect={({ id, label }) => {
            setCurrentTestMovieRolesIdValue(id);
            setCurrentTestMovieRolesIdDisplayValue(label);
            runValidationTasks("testMovieRolesId", label);
          }}
          onClear={() => {
            setCurrentTestMovieRolesIdDisplayValue("");
          }}
          defaultValue={testMovieRolesId}
          onChange={(e) => {
            let { value } = e.target;
            fetchTestMovieRolesIdRecords(value);
            if (errors.testMovieRolesId?.hasError) {
              runValidationTasks("testMovieRolesId", value);
            }
            setCurrentTestMovieRolesIdDisplayValue(value);
            setCurrentTestMovieRolesIdValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("testMovieRolesId", currentTestMovieRolesIdValue)
          }
          errorMessage={errors.testMovieRolesId?.errorMessage}
          hasError={errors.testMovieRolesId?.hasError}
          ref={testMovieRolesIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "testMovieRolesId")}
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
          isDisabled={!(idProp || testMovieRoleModelProp)}
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
              !(idProp || testMovieRoleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
