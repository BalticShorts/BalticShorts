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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getPerson, listPersonMovieTeams } from "../graphql/queries";
import { updatePerson, updatePersonMovieTeam } from "../graphql/mutations";
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
export default function PersonUpdateForm(props) {
  const {
    id: idProp,
    person: personModelProp,
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
    surname: "",
    role: "",
    description: "",
    Instagram: "",
    Facebook: "",
    IMBD: "",
    email: "",
    PersonMovieTeams: [],
    user_id: "",
    is_public: false,
    completed_setup: false,
    photo_location: "",
    description_confirmed: false,
    photo_confirmed: false,
    is_entity: false,
    nationality: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [surname, setSurname] = React.useState(initialValues.surname);
  const [role, setRole] = React.useState(initialValues.role);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [Instagram, setInstagram] = React.useState(initialValues.Instagram);
  const [Facebook, setFacebook] = React.useState(initialValues.Facebook);
  const [IMBD, setIMBD] = React.useState(initialValues.IMBD);
  const [email, setEmail] = React.useState(initialValues.email);
  const [PersonMovieTeams, setPersonMovieTeams] = React.useState(
    initialValues.PersonMovieTeams
  );
  const [PersonMovieTeamsLoading, setPersonMovieTeamsLoading] =
    React.useState(false);
  const [personMovieTeamsRecords, setPersonMovieTeamsRecords] = React.useState(
    []
  );
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [is_public, setIs_public] = React.useState(initialValues.is_public);
  const [completed_setup, setCompleted_setup] = React.useState(
    initialValues.completed_setup
  );
  const [photo_location, setPhoto_location] = React.useState(
    initialValues.photo_location
  );
  const [description_confirmed, setDescription_confirmed] = React.useState(
    initialValues.description_confirmed
  );
  const [photo_confirmed, setPhoto_confirmed] = React.useState(
    initialValues.photo_confirmed
  );
  const [is_entity, setIs_entity] = React.useState(initialValues.is_entity);
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = personRecord
      ? {
          ...initialValues,
          ...personRecord,
          PersonMovieTeams: linkedPersonMovieTeams,
        }
      : initialValues;
    setName(cleanValues.name);
    setSurname(cleanValues.surname);
    setRole(cleanValues.role);
    setDescription(cleanValues.description);
    setInstagram(cleanValues.Instagram);
    setFacebook(cleanValues.Facebook);
    setIMBD(cleanValues.IMBD);
    setEmail(cleanValues.email);
    setPersonMovieTeams(cleanValues.PersonMovieTeams ?? []);
    setCurrentPersonMovieTeamsValue(undefined);
    setCurrentPersonMovieTeamsDisplayValue("");
    setUser_id(cleanValues.user_id);
    setIs_public(cleanValues.is_public);
    setCompleted_setup(cleanValues.completed_setup);
    setPhoto_location(cleanValues.photo_location);
    setDescription_confirmed(cleanValues.description_confirmed);
    setPhoto_confirmed(cleanValues.photo_confirmed);
    setIs_entity(cleanValues.is_entity);
    setNationality(cleanValues.nationality);
    setErrors({});
  };
  const [personRecord, setPersonRecord] = React.useState(personModelProp);
  const [linkedPersonMovieTeams, setLinkedPersonMovieTeams] = React.useState(
    []
  );
  const canUnlinkPersonMovieTeams = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPerson.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPerson
        : personModelProp;
      const linkedPersonMovieTeams = record?.PersonMovieTeams?.items ?? [];
      setLinkedPersonMovieTeams(linkedPersonMovieTeams);
      setPersonRecord(record);
    };
    queryData();
  }, [idProp, personModelProp]);
  React.useEffect(resetStateValues, [personRecord, linkedPersonMovieTeams]);
  const [
    currentPersonMovieTeamsDisplayValue,
    setCurrentPersonMovieTeamsDisplayValue,
  ] = React.useState("");
  const [currentPersonMovieTeamsValue, setCurrentPersonMovieTeamsValue] =
    React.useState(undefined);
  const PersonMovieTeamsRef = React.createRef();
  const getIDValue = {
    PersonMovieTeams: (r) => JSON.stringify({ id: r?.id }),
  };
  const PersonMovieTeamsIdSet = new Set(
    Array.isArray(PersonMovieTeams)
      ? PersonMovieTeams.map((r) => getIDValue.PersonMovieTeams?.(r))
      : getIDValue.PersonMovieTeams?.(PersonMovieTeams)
  );
  const getDisplayValue = {
    PersonMovieTeams: (r) => r?.id,
  };
  const validations = {
    name: [{ type: "Required" }],
    surname: [],
    role: [],
    description: [],
    Instagram: [{ type: "URL" }],
    Facebook: [{ type: "URL" }],
    IMBD: [{ type: "URL" }],
    email: [{ type: "Email" }],
    PersonMovieTeams: [],
    user_id: [],
    is_public: [],
    completed_setup: [],
    photo_location: [],
    description_confirmed: [],
    photo_confirmed: [],
    is_entity: [],
    nationality: [],
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
  const fetchPersonMovieTeamsRecords = async (value) => {
    setPersonMovieTeamsLoading(true);
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
        (item) =>
          !PersonMovieTeamsIdSet.has(getIDValue.PersonMovieTeams?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPersonMovieTeamsRecords(newOptions.slice(0, autocompleteLength));
    setPersonMovieTeamsLoading(false);
  };
  React.useEffect(() => {
    fetchPersonMovieTeamsRecords("");
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
          surname: surname ?? null,
          role: role ?? null,
          description: description ?? null,
          Instagram: Instagram ?? null,
          Facebook: Facebook ?? null,
          IMBD: IMBD ?? null,
          email: email ?? null,
          PersonMovieTeams: PersonMovieTeams ?? null,
          user_id: user_id ?? null,
          is_public: is_public ?? null,
          completed_setup: completed_setup ?? null,
          photo_location: photo_location ?? null,
          description_confirmed: description_confirmed ?? null,
          photo_confirmed: photo_confirmed ?? null,
          is_entity: is_entity ?? null,
          nationality: nationality ?? null,
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
          const promises = [];
          const personMovieTeamsToLink = [];
          const personMovieTeamsToUnLink = [];
          const personMovieTeamsSet = new Set();
          const linkedPersonMovieTeamsSet = new Set();
          PersonMovieTeams.forEach((r) =>
            personMovieTeamsSet.add(getIDValue.PersonMovieTeams?.(r))
          );
          linkedPersonMovieTeams.forEach((r) =>
            linkedPersonMovieTeamsSet.add(getIDValue.PersonMovieTeams?.(r))
          );
          linkedPersonMovieTeams.forEach((r) => {
            if (!personMovieTeamsSet.has(getIDValue.PersonMovieTeams?.(r))) {
              personMovieTeamsToUnLink.push(r);
            }
          });
          PersonMovieTeams.forEach((r) => {
            if (
              !linkedPersonMovieTeamsSet.has(getIDValue.PersonMovieTeams?.(r))
            ) {
              personMovieTeamsToLink.push(r);
            }
          });
          personMovieTeamsToUnLink.forEach((original) => {
            if (!canUnlinkPersonMovieTeams) {
              throw Error(
                `PersonMovieTeam ${original.id} cannot be unlinked from Person because undefined is a required field.`
              );
            }
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
          });
          personMovieTeamsToLink.forEach((original) => {
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
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            surname: modelFields.surname ?? null,
            role: modelFields.role ?? null,
            description: modelFields.description ?? null,
            Instagram: modelFields.Instagram ?? null,
            Facebook: modelFields.Facebook ?? null,
            IMBD: modelFields.IMBD ?? null,
            email: modelFields.email ?? null,
            user_id: modelFields.user_id ?? null,
            is_public: modelFields.is_public ?? null,
            completed_setup: modelFields.completed_setup ?? null,
            photo_location: modelFields.photo_location ?? null,
            description_confirmed: modelFields.description_confirmed ?? null,
            photo_confirmed: modelFields.photo_confirmed ?? null,
            is_entity: modelFields.is_entity ?? null,
            nationality: modelFields.nationality ?? null,
          };
          promises.push(
            API.graphql({
              query: updatePerson.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: personRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "PersonUpdateForm")}
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
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
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
        label="Surname"
        isRequired={false}
        isReadOnly={false}
        value={surname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname: value,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.surname ?? value;
          }
          if (errors.surname?.hasError) {
            runValidationTasks("surname", value);
          }
          setSurname(value);
        }}
        onBlur={() => runValidationTasks("surname", surname)}
        errorMessage={errors.surname?.errorMessage}
        hasError={errors.surname?.hasError}
        {...getOverrideProps(overrides, "surname")}
      ></TextField>
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role: value,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
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
              surname,
              role,
              description: value,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
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
        label="Instagram"
        isRequired={false}
        isReadOnly={false}
        value={Instagram}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram: value,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.Instagram ?? value;
          }
          if (errors.Instagram?.hasError) {
            runValidationTasks("Instagram", value);
          }
          setInstagram(value);
        }}
        onBlur={() => runValidationTasks("Instagram", Instagram)}
        errorMessage={errors.Instagram?.errorMessage}
        hasError={errors.Instagram?.hasError}
        {...getOverrideProps(overrides, "Instagram")}
      ></TextField>
      <TextField
        label="Facebook"
        isRequired={false}
        isReadOnly={false}
        value={Facebook}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook: value,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.Facebook ?? value;
          }
          if (errors.Facebook?.hasError) {
            runValidationTasks("Facebook", value);
          }
          setFacebook(value);
        }}
        onBlur={() => runValidationTasks("Facebook", Facebook)}
        errorMessage={errors.Facebook?.errorMessage}
        hasError={errors.Facebook?.hasError}
        {...getOverrideProps(overrides, "Facebook")}
      ></TextField>
      <TextField
        label="Imbd"
        isRequired={false}
        isReadOnly={false}
        value={IMBD}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD: value,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.IMBD ?? value;
          }
          if (errors.IMBD?.hasError) {
            runValidationTasks("IMBD", value);
          }
          setIMBD(value);
        }}
        onBlur={() => runValidationTasks("IMBD", IMBD)}
        errorMessage={errors.IMBD?.errorMessage}
        hasError={errors.IMBD?.hasError}
        {...getOverrideProps(overrides, "IMBD")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email: value,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams: values,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            values = result?.PersonMovieTeams ?? values;
          }
          setPersonMovieTeams(values);
          setCurrentPersonMovieTeamsValue(undefined);
          setCurrentPersonMovieTeamsDisplayValue("");
        }}
        currentFieldValue={currentPersonMovieTeamsValue}
        label={"Person movie teams"}
        items={PersonMovieTeams}
        hasError={errors?.PersonMovieTeams?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "PersonMovieTeams",
            currentPersonMovieTeamsValue
          )
        }
        errorMessage={errors?.PersonMovieTeams?.errorMessage}
        getBadgeText={getDisplayValue.PersonMovieTeams}
        setFieldValue={(model) => {
          setCurrentPersonMovieTeamsDisplayValue(
            model ? getDisplayValue.PersonMovieTeams(model) : ""
          );
          setCurrentPersonMovieTeamsValue(model);
        }}
        inputFieldRef={PersonMovieTeamsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Person movie teams"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PersonMovieTeam"
          value={currentPersonMovieTeamsDisplayValue}
          options={personMovieTeamsRecords.map((r) => ({
            id: getIDValue.PersonMovieTeams?.(r),
            label: getDisplayValue.PersonMovieTeams?.(r),
          }))}
          isLoading={PersonMovieTeamsLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonMovieTeamsValue(
              personMovieTeamsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPersonMovieTeamsDisplayValue(label);
            runValidationTasks("PersonMovieTeams", label);
          }}
          onClear={() => {
            setCurrentPersonMovieTeamsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPersonMovieTeamsRecords(value);
            if (errors.PersonMovieTeams?.hasError) {
              runValidationTasks("PersonMovieTeams", value);
            }
            setCurrentPersonMovieTeamsDisplayValue(value);
            setCurrentPersonMovieTeamsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "PersonMovieTeams",
              currentPersonMovieTeamsDisplayValue
            )
          }
          errorMessage={errors.PersonMovieTeams?.errorMessage}
          hasError={errors.PersonMovieTeams?.hasError}
          ref={PersonMovieTeamsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "PersonMovieTeams")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={user_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id: value,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.user_id ?? value;
          }
          if (errors.user_id?.hasError) {
            runValidationTasks("user_id", value);
          }
          setUser_id(value);
        }}
        onBlur={() => runValidationTasks("user_id", user_id)}
        errorMessage={errors.user_id?.errorMessage}
        hasError={errors.user_id?.hasError}
        {...getOverrideProps(overrides, "user_id")}
      ></TextField>
      <SwitchField
        label="Is public"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_public}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public: value,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.is_public ?? value;
          }
          if (errors.is_public?.hasError) {
            runValidationTasks("is_public", value);
          }
          setIs_public(value);
        }}
        onBlur={() => runValidationTasks("is_public", is_public)}
        errorMessage={errors.is_public?.errorMessage}
        hasError={errors.is_public?.hasError}
        {...getOverrideProps(overrides, "is_public")}
      ></SwitchField>
      <SwitchField
        label="Completed setup"
        defaultChecked={false}
        isDisabled={false}
        isChecked={completed_setup}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup: value,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.completed_setup ?? value;
          }
          if (errors.completed_setup?.hasError) {
            runValidationTasks("completed_setup", value);
          }
          setCompleted_setup(value);
        }}
        onBlur={() => runValidationTasks("completed_setup", completed_setup)}
        errorMessage={errors.completed_setup?.errorMessage}
        hasError={errors.completed_setup?.hasError}
        {...getOverrideProps(overrides, "completed_setup")}
      ></SwitchField>
      <TextField
        label="Photo location"
        isRequired={false}
        isReadOnly={false}
        value={photo_location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location: value,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.photo_location ?? value;
          }
          if (errors.photo_location?.hasError) {
            runValidationTasks("photo_location", value);
          }
          setPhoto_location(value);
        }}
        onBlur={() => runValidationTasks("photo_location", photo_location)}
        errorMessage={errors.photo_location?.errorMessage}
        hasError={errors.photo_location?.hasError}
        {...getOverrideProps(overrides, "photo_location")}
      ></TextField>
      <SwitchField
        label="Description confirmed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={description_confirmed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed: value,
              photo_confirmed,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.description_confirmed ?? value;
          }
          if (errors.description_confirmed?.hasError) {
            runValidationTasks("description_confirmed", value);
          }
          setDescription_confirmed(value);
        }}
        onBlur={() =>
          runValidationTasks("description_confirmed", description_confirmed)
        }
        errorMessage={errors.description_confirmed?.errorMessage}
        hasError={errors.description_confirmed?.hasError}
        {...getOverrideProps(overrides, "description_confirmed")}
      ></SwitchField>
      <SwitchField
        label="Photo confirmed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={photo_confirmed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed: value,
              is_entity,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.photo_confirmed ?? value;
          }
          if (errors.photo_confirmed?.hasError) {
            runValidationTasks("photo_confirmed", value);
          }
          setPhoto_confirmed(value);
        }}
        onBlur={() => runValidationTasks("photo_confirmed", photo_confirmed)}
        errorMessage={errors.photo_confirmed?.errorMessage}
        hasError={errors.photo_confirmed?.hasError}
        {...getOverrideProps(overrides, "photo_confirmed")}
      ></SwitchField>
      <SwitchField
        label="Is entity"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_entity}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity: value,
              nationality,
            };
            const result = onChange(modelFields);
            value = result?.is_entity ?? value;
          }
          if (errors.is_entity?.hasError) {
            runValidationTasks("is_entity", value);
          }
          setIs_entity(value);
        }}
        onBlur={() => runValidationTasks("is_entity", is_entity)}
        errorMessage={errors.is_entity?.errorMessage}
        hasError={errors.is_entity?.hasError}
        {...getOverrideProps(overrides, "is_entity")}
      ></SwitchField>
      <TextField
        label="Nationality"
        isRequired={false}
        isReadOnly={false}
        value={nationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              role,
              description,
              Instagram,
              Facebook,
              IMBD,
              email,
              PersonMovieTeams,
              user_id,
              is_public,
              completed_setup,
              photo_location,
              description_confirmed,
              photo_confirmed,
              is_entity,
              nationality: value,
            };
            const result = onChange(modelFields);
            value = result?.nationality ?? value;
          }
          if (errors.nationality?.hasError) {
            runValidationTasks("nationality", value);
          }
          setNationality(value);
        }}
        onBlur={() => runValidationTasks("nationality", nationality)}
        errorMessage={errors.nationality?.errorMessage}
        hasError={errors.nationality?.hasError}
        {...getOverrideProps(overrides, "nationality")}
      ></TextField>
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
          isDisabled={!(idProp || personModelProp)}
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
              !(idProp || personModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
