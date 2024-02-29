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
import { getUserProfile, listMoviePlaylists } from "../graphql/queries";
import { updateMoviePlaylist, updateUserProfile } from "../graphql/mutations";
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
export default function UserProfileUpdateForm(props) {
  const {
    id: idProp,
    userProfile: userProfileModelProp,
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
    is_member: false,
    member_untill: "",
    is_admin: false,
    email: "",
    user_id: "",
    photo_location: "",
    MoviePlaylists: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [surname, setSurname] = React.useState(initialValues.surname);
  const [is_member, setIs_member] = React.useState(initialValues.is_member);
  const [member_untill, setMember_untill] = React.useState(
    initialValues.member_untill
  );
  const [is_admin, setIs_admin] = React.useState(initialValues.is_admin);
  const [email, setEmail] = React.useState(initialValues.email);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [photo_location, setPhoto_location] = React.useState(
    initialValues.photo_location
  );
  const [MoviePlaylists, setMoviePlaylists] = React.useState(
    initialValues.MoviePlaylists
  );
  const [MoviePlaylistsLoading, setMoviePlaylistsLoading] =
    React.useState(false);
  const [moviePlaylistsRecords, setMoviePlaylistsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userProfileRecord
      ? {
          ...initialValues,
          ...userProfileRecord,
          MoviePlaylists: linkedMoviePlaylists,
        }
      : initialValues;
    setName(cleanValues.name);
    setSurname(cleanValues.surname);
    setIs_member(cleanValues.is_member);
    setMember_untill(cleanValues.member_untill);
    setIs_admin(cleanValues.is_admin);
    setEmail(cleanValues.email);
    setUser_id(cleanValues.user_id);
    setPhoto_location(cleanValues.photo_location);
    setMoviePlaylists(cleanValues.MoviePlaylists ?? []);
    setCurrentMoviePlaylistsValue(undefined);
    setCurrentMoviePlaylistsDisplayValue("");
    setErrors({});
  };
  const [userProfileRecord, setUserProfileRecord] =
    React.useState(userProfileModelProp);
  const [linkedMoviePlaylists, setLinkedMoviePlaylists] = React.useState([]);
  const canUnlinkMoviePlaylists = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getUserProfile.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUserProfile
        : userProfileModelProp;
      const linkedMoviePlaylists = record?.MoviePlaylists?.items ?? [];
      setLinkedMoviePlaylists(linkedMoviePlaylists);
      setUserProfileRecord(record);
    };
    queryData();
  }, [idProp, userProfileModelProp]);
  React.useEffect(resetStateValues, [userProfileRecord, linkedMoviePlaylists]);
  const [
    currentMoviePlaylistsDisplayValue,
    setCurrentMoviePlaylistsDisplayValue,
  ] = React.useState("");
  const [currentMoviePlaylistsValue, setCurrentMoviePlaylistsValue] =
    React.useState(undefined);
  const MoviePlaylistsRef = React.createRef();
  const getIDValue = {
    MoviePlaylists: (r) => JSON.stringify({ id: r?.id }),
  };
  const MoviePlaylistsIdSet = new Set(
    Array.isArray(MoviePlaylists)
      ? MoviePlaylists.map((r) => getIDValue.MoviePlaylists?.(r))
      : getIDValue.MoviePlaylists?.(MoviePlaylists)
  );
  const getDisplayValue = {
    MoviePlaylists: (r) => `${r?.Creator ? r?.Creator + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    surname: [],
    is_member: [],
    member_untill: [],
    is_admin: [],
    email: [{ type: "Email" }],
    user_id: [],
    photo_location: [],
    MoviePlaylists: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  const fetchMoviePlaylistsRecords = async (value) => {
    setMoviePlaylistsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ Creator: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listMoviePlaylists.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMoviePlaylists?.items;
      var loaded = result.filter(
        (item) => !MoviePlaylistsIdSet.has(getIDValue.MoviePlaylists?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMoviePlaylistsRecords(newOptions.slice(0, autocompleteLength));
    setMoviePlaylistsLoading(false);
  };
  React.useEffect(() => {
    fetchMoviePlaylistsRecords("");
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
          name: name ?? null,
          surname: surname ?? null,
          is_member: is_member ?? null,
          member_untill: member_untill ?? null,
          is_admin: is_admin ?? null,
          email: email ?? null,
          user_id: user_id ?? null,
          photo_location: photo_location ?? null,
          MoviePlaylists: MoviePlaylists ?? null,
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
          const moviePlaylistsToLink = [];
          const moviePlaylistsToUnLink = [];
          const moviePlaylistsSet = new Set();
          const linkedMoviePlaylistsSet = new Set();
          MoviePlaylists.forEach((r) =>
            moviePlaylistsSet.add(getIDValue.MoviePlaylists?.(r))
          );
          linkedMoviePlaylists.forEach((r) =>
            linkedMoviePlaylistsSet.add(getIDValue.MoviePlaylists?.(r))
          );
          linkedMoviePlaylists.forEach((r) => {
            if (!moviePlaylistsSet.has(getIDValue.MoviePlaylists?.(r))) {
              moviePlaylistsToUnLink.push(r);
            }
          });
          MoviePlaylists.forEach((r) => {
            if (!linkedMoviePlaylistsSet.has(getIDValue.MoviePlaylists?.(r))) {
              moviePlaylistsToLink.push(r);
            }
          });
          moviePlaylistsToUnLink.forEach((original) => {
            if (!canUnlinkMoviePlaylists) {
              throw Error(
                `MoviePlaylist ${original.id} cannot be unlinked from UserProfile because userprofileID is a required field.`
              );
            }
            promises.push(
              API.graphql({
                query: updateMoviePlaylist.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userprofileID: null,
                  },
                },
              })
            );
          });
          moviePlaylistsToLink.forEach((original) => {
            promises.push(
              API.graphql({
                query: updateMoviePlaylist.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    userprofileID: userProfileRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name ?? null,
            surname: modelFields.surname ?? null,
            is_member: modelFields.is_member ?? null,
            member_untill: modelFields.member_untill ?? null,
            is_admin: modelFields.is_admin ?? null,
            email: modelFields.email ?? null,
            user_id: modelFields.user_id ?? null,
            photo_location: modelFields.photo_location ?? null,
          };
          promises.push(
            API.graphql({
              query: updateUserProfile.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: userProfileRecord.id,
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
      {...getOverrideProps(overrides, "UserProfileUpdateForm")}
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
              surname,
              is_member,
              member_untill,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
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
              is_member,
              member_untill,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
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
      <SwitchField
        label="Is member"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_member}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member: value,
              member_untill,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
            };
            const result = onChange(modelFields);
            value = result?.is_member ?? value;
          }
          if (errors.is_member?.hasError) {
            runValidationTasks("is_member", value);
          }
          setIs_member(value);
        }}
        onBlur={() => runValidationTasks("is_member", is_member)}
        errorMessage={errors.is_member?.errorMessage}
        hasError={errors.is_member?.hasError}
        {...getOverrideProps(overrides, "is_member")}
      ></SwitchField>
      <TextField
        label="Member untill"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={member_untill && convertToLocal(new Date(member_untill))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              member_untill: value,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
            };
            const result = onChange(modelFields);
            value = result?.member_untill ?? value;
          }
          if (errors.member_untill?.hasError) {
            runValidationTasks("member_untill", value);
          }
          setMember_untill(value);
        }}
        onBlur={() => runValidationTasks("member_untill", member_untill)}
        errorMessage={errors.member_untill?.errorMessage}
        hasError={errors.member_untill?.hasError}
        {...getOverrideProps(overrides, "member_untill")}
      ></TextField>
      <SwitchField
        label="Is admin"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_admin}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              member_untill,
              is_admin: value,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
            };
            const result = onChange(modelFields);
            value = result?.is_admin ?? value;
          }
          if (errors.is_admin?.hasError) {
            runValidationTasks("is_admin", value);
          }
          setIs_admin(value);
        }}
        onBlur={() => runValidationTasks("is_admin", is_admin)}
        errorMessage={errors.is_admin?.errorMessage}
        hasError={errors.is_admin?.hasError}
        {...getOverrideProps(overrides, "is_admin")}
      ></SwitchField>
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
              is_member,
              member_untill,
              is_admin,
              email: value,
              user_id,
              photo_location,
              MoviePlaylists,
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
              is_member,
              member_untill,
              is_admin,
              email,
              user_id: value,
              photo_location,
              MoviePlaylists,
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
              is_member,
              member_untill,
              is_admin,
              email,
              user_id,
              photo_location: value,
              MoviePlaylists,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              member_untill,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists: values,
            };
            const result = onChange(modelFields);
            values = result?.MoviePlaylists ?? values;
          }
          setMoviePlaylists(values);
          setCurrentMoviePlaylistsValue(undefined);
          setCurrentMoviePlaylistsDisplayValue("");
        }}
        currentFieldValue={currentMoviePlaylistsValue}
        label={"Movie playlists"}
        items={MoviePlaylists}
        hasError={errors?.MoviePlaylists?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("MoviePlaylists", currentMoviePlaylistsValue)
        }
        errorMessage={errors?.MoviePlaylists?.errorMessage}
        getBadgeText={getDisplayValue.MoviePlaylists}
        setFieldValue={(model) => {
          setCurrentMoviePlaylistsDisplayValue(
            model ? getDisplayValue.MoviePlaylists(model) : ""
          );
          setCurrentMoviePlaylistsValue(model);
        }}
        inputFieldRef={MoviePlaylistsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Movie playlists"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search MoviePlaylist"
          value={currentMoviePlaylistsDisplayValue}
          options={moviePlaylistsRecords
            .filter(
              (r) => !MoviePlaylistsIdSet.has(getIDValue.MoviePlaylists?.(r))
            )
            .map((r) => ({
              id: getIDValue.MoviePlaylists?.(r),
              label: getDisplayValue.MoviePlaylists?.(r),
            }))}
          isLoading={MoviePlaylistsLoading}
          onSelect={({ id, label }) => {
            setCurrentMoviePlaylistsValue(
              moviePlaylistsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMoviePlaylistsDisplayValue(label);
            runValidationTasks("MoviePlaylists", label);
          }}
          onClear={() => {
            setCurrentMoviePlaylistsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMoviePlaylistsRecords(value);
            if (errors.MoviePlaylists?.hasError) {
              runValidationTasks("MoviePlaylists", value);
            }
            setCurrentMoviePlaylistsDisplayValue(value);
            setCurrentMoviePlaylistsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "MoviePlaylists",
              currentMoviePlaylistsDisplayValue
            )
          }
          errorMessage={errors.MoviePlaylists?.errorMessage}
          hasError={errors.MoviePlaylists?.hasError}
          ref={MoviePlaylistsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MoviePlaylists")}
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
          isDisabled={!(idProp || userProfileModelProp)}
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
              !(idProp || userProfileModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
