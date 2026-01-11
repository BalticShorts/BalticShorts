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
import {
  listEmails,
  listMoviePlaylists,
  listPayments,
} from "../src/graphql/queries";
import {
  createUserProfile,
  updateEmail,
  updateMoviePlaylist,
  updatePayment,
} from "../src/graphql/mutations";
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
export default function UserProfileCreateForm(props) {
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
    surname: "",
    is_member: false,
    continues_payment: false,
    member_until: "",
    monthsSubscribed: "",
    is_admin: false,
    email: "",
    user_id: "",
    photo_location: "",
    MoviePlaylists: [],
    Payments: [],
    Emails: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [surname, setSurname] = React.useState(initialValues.surname);
  const [is_member, setIs_member] = React.useState(initialValues.is_member);
  const [continues_payment, setContinues_payment] = React.useState(
    initialValues.continues_payment
  );
  const [member_until, setMember_until] = React.useState(
    initialValues.member_until
  );
  const [monthsSubscribed, setMonthsSubscribed] = React.useState(
    initialValues.monthsSubscribed
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
  const [Payments, setPayments] = React.useState(initialValues.Payments);
  const [PaymentsLoading, setPaymentsLoading] = React.useState(false);
  const [paymentsRecords, setPaymentsRecords] = React.useState([]);
  const [Emails, setEmails] = React.useState(initialValues.Emails);
  const [EmailsLoading, setEmailsLoading] = React.useState(false);
  const [emailsRecords, setEmailsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setSurname(initialValues.surname);
    setIs_member(initialValues.is_member);
    setContinues_payment(initialValues.continues_payment);
    setMember_until(initialValues.member_until);
    setMonthsSubscribed(initialValues.monthsSubscribed);
    setIs_admin(initialValues.is_admin);
    setEmail(initialValues.email);
    setUser_id(initialValues.user_id);
    setPhoto_location(initialValues.photo_location);
    setMoviePlaylists(initialValues.MoviePlaylists);
    setCurrentMoviePlaylistsValue(undefined);
    setCurrentMoviePlaylistsDisplayValue("");
    setPayments(initialValues.Payments);
    setCurrentPaymentsValue(undefined);
    setCurrentPaymentsDisplayValue("");
    setEmails(initialValues.Emails);
    setCurrentEmailsValue(undefined);
    setCurrentEmailsDisplayValue("");
    setErrors({});
  };
  const [
    currentMoviePlaylistsDisplayValue,
    setCurrentMoviePlaylistsDisplayValue,
  ] = React.useState("");
  const [currentMoviePlaylistsValue, setCurrentMoviePlaylistsValue] =
    React.useState(undefined);
  const MoviePlaylistsRef = React.createRef();
  const [currentPaymentsDisplayValue, setCurrentPaymentsDisplayValue] =
    React.useState("");
  const [currentPaymentsValue, setCurrentPaymentsValue] =
    React.useState(undefined);
  const PaymentsRef = React.createRef();
  const [currentEmailsDisplayValue, setCurrentEmailsDisplayValue] =
    React.useState("");
  const [currentEmailsValue, setCurrentEmailsValue] = React.useState(undefined);
  const EmailsRef = React.createRef();
  const getIDValue = {
    MoviePlaylists: (r) => JSON.stringify({ id: r?.id }),
    Payments: (r) => JSON.stringify({ id: r?.id }),
    Emails: (r) => JSON.stringify({ id: r?.id }),
  };
  const MoviePlaylistsIdSet = new Set(
    Array.isArray(MoviePlaylists)
      ? MoviePlaylists.map((r) => getIDValue.MoviePlaylists?.(r))
      : getIDValue.MoviePlaylists?.(MoviePlaylists)
  );
  const PaymentsIdSet = new Set(
    Array.isArray(Payments)
      ? Payments.map((r) => getIDValue.Payments?.(r))
      : getIDValue.Payments?.(Payments)
  );
  const EmailsIdSet = new Set(
    Array.isArray(Emails)
      ? Emails.map((r) => getIDValue.Emails?.(r))
      : getIDValue.Emails?.(Emails)
  );
  const getDisplayValue = {
    MoviePlaylists: (r) => `${r?.creator ? r?.creator + " - " : ""}${r?.id}`,
    Payments: (r) => `${r?.reference ? r?.reference + " - " : ""}${r?.id}`,
    Emails: (r) => `${r?.email ? r?.email + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    surname: [],
    is_member: [],
    continues_payment: [],
    member_until: [],
    monthsSubscribed: [],
    is_admin: [],
    email: [{ type: "Email" }],
    user_id: [],
    photo_location: [],
    MoviePlaylists: [],
    Payments: [],
    Emails: [],
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
          or: [{ creator: { contains: value } }, { id: { contains: value } }],
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
  const fetchPaymentsRecords = async (value) => {
    setPaymentsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ reference: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listPayments.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listPayments?.items;
      var loaded = result.filter(
        (item) => !PaymentsIdSet.has(getIDValue.Payments?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPaymentsRecords(newOptions.slice(0, autocompleteLength));
    setPaymentsLoading(false);
  };
  const fetchEmailsRecords = async (value) => {
    setEmailsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ email: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listEmails.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listEmails?.items;
      var loaded = result.filter(
        (item) => !EmailsIdSet.has(getIDValue.Emails?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setEmailsRecords(newOptions.slice(0, autocompleteLength));
    setEmailsLoading(false);
  };
  React.useEffect(() => {
    fetchMoviePlaylistsRecords("");
    fetchPaymentsRecords("");
    fetchEmailsRecords("");
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
          surname,
          is_member,
          continues_payment,
          member_until,
          monthsSubscribed,
          is_admin,
          email,
          user_id,
          photo_location,
          MoviePlaylists,
          Payments,
          Emails,
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
            surname: modelFields.surname,
            is_member: modelFields.is_member,
            continues_payment: modelFields.continues_payment,
            member_until: modelFields.member_until,
            monthsSubscribed: modelFields.monthsSubscribed,
            is_admin: modelFields.is_admin,
            email: modelFields.email,
            user_id: modelFields.user_id,
            photo_location: modelFields.photo_location,
          };
          const userProfile = (
            await API.graphql({
              query: createUserProfile.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createUserProfile;
          const promises = [];
          promises.push(
            ...MoviePlaylists.reduce((promises, original) => {
              promises.push(
                API.graphql({
                  query: updateMoviePlaylist.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      userprofileID: userProfile.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Payments.reduce((promises, original) => {
              promises.push(
                API.graphql({
                  query: updatePayment.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      userprofileID: userProfile.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Emails.reduce((promises, original) => {
              promises.push(
                API.graphql({
                  query: updateEmail.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      userprofileID: userProfile.id,
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
      {...getOverrideProps(overrides, "UserProfileCreateForm")}
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
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
      <SwitchField
        label="Continues payment"
        defaultChecked={false}
        isDisabled={false}
        isChecked={continues_payment}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              continues_payment: value,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
            };
            const result = onChange(modelFields);
            value = result?.continues_payment ?? value;
          }
          if (errors.continues_payment?.hasError) {
            runValidationTasks("continues_payment", value);
          }
          setContinues_payment(value);
        }}
        onBlur={() =>
          runValidationTasks("continues_payment", continues_payment)
        }
        errorMessage={errors.continues_payment?.errorMessage}
        hasError={errors.continues_payment?.hasError}
        {...getOverrideProps(overrides, "continues_payment")}
      ></SwitchField>
      <TextField
        label="Member until"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={member_until && convertToLocal(new Date(member_until))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              continues_payment,
              member_until: value,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
            };
            const result = onChange(modelFields);
            value = result?.member_until ?? value;
          }
          if (errors.member_until?.hasError) {
            runValidationTasks("member_until", value);
          }
          setMember_until(value);
        }}
        onBlur={() => runValidationTasks("member_until", member_until)}
        errorMessage={errors.member_until?.errorMessage}
        hasError={errors.member_until?.hasError}
        {...getOverrideProps(overrides, "member_until")}
      ></TextField>
      <TextField
        label="Months subscribed"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={monthsSubscribed}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              continues_payment,
              member_until,
              monthsSubscribed: value,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
            };
            const result = onChange(modelFields);
            value = result?.monthsSubscribed ?? value;
          }
          if (errors.monthsSubscribed?.hasError) {
            runValidationTasks("monthsSubscribed", value);
          }
          setMonthsSubscribed(value);
        }}
        onBlur={() => runValidationTasks("monthsSubscribed", monthsSubscribed)}
        errorMessage={errors.monthsSubscribed?.errorMessage}
        hasError={errors.monthsSubscribed?.hasError}
        {...getOverrideProps(overrides, "monthsSubscribed")}
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin: value,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email: value,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id: value,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails,
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location: value,
              MoviePlaylists,
              Payments,
              Emails,
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
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists: values,
              Payments,
              Emails,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments: values,
              Emails,
            };
            const result = onChange(modelFields);
            values = result?.Payments ?? values;
          }
          setPayments(values);
          setCurrentPaymentsValue(undefined);
          setCurrentPaymentsDisplayValue("");
        }}
        currentFieldValue={currentPaymentsValue}
        label={"Payments"}
        items={Payments}
        hasError={errors?.Payments?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Payments", currentPaymentsValue)
        }
        errorMessage={errors?.Payments?.errorMessage}
        getBadgeText={getDisplayValue.Payments}
        setFieldValue={(model) => {
          setCurrentPaymentsDisplayValue(
            model ? getDisplayValue.Payments(model) : ""
          );
          setCurrentPaymentsValue(model);
        }}
        inputFieldRef={PaymentsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Payments"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Payment"
          value={currentPaymentsDisplayValue}
          options={paymentsRecords
            .filter((r) => !PaymentsIdSet.has(getIDValue.Payments?.(r)))
            .map((r) => ({
              id: getIDValue.Payments?.(r),
              label: getDisplayValue.Payments?.(r),
            }))}
          isLoading={PaymentsLoading}
          onSelect={({ id, label }) => {
            setCurrentPaymentsValue(
              paymentsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPaymentsDisplayValue(label);
            runValidationTasks("Payments", label);
          }}
          onClear={() => {
            setCurrentPaymentsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPaymentsRecords(value);
            if (errors.Payments?.hasError) {
              runValidationTasks("Payments", value);
            }
            setCurrentPaymentsDisplayValue(value);
            setCurrentPaymentsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Payments", currentPaymentsDisplayValue)
          }
          errorMessage={errors.Payments?.errorMessage}
          hasError={errors.Payments?.hasError}
          ref={PaymentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Payments")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              surname,
              is_member,
              continues_payment,
              member_until,
              monthsSubscribed,
              is_admin,
              email,
              user_id,
              photo_location,
              MoviePlaylists,
              Payments,
              Emails: values,
            };
            const result = onChange(modelFields);
            values = result?.Emails ?? values;
          }
          setEmails(values);
          setCurrentEmailsValue(undefined);
          setCurrentEmailsDisplayValue("");
        }}
        currentFieldValue={currentEmailsValue}
        label={"Emails"}
        items={Emails}
        hasError={errors?.Emails?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Emails", currentEmailsValue)
        }
        errorMessage={errors?.Emails?.errorMessage}
        getBadgeText={getDisplayValue.Emails}
        setFieldValue={(model) => {
          setCurrentEmailsDisplayValue(
            model ? getDisplayValue.Emails(model) : ""
          );
          setCurrentEmailsValue(model);
        }}
        inputFieldRef={EmailsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Emails"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Email"
          value={currentEmailsDisplayValue}
          options={emailsRecords
            .filter((r) => !EmailsIdSet.has(getIDValue.Emails?.(r)))
            .map((r) => ({
              id: getIDValue.Emails?.(r),
              label: getDisplayValue.Emails?.(r),
            }))}
          isLoading={EmailsLoading}
          onSelect={({ id, label }) => {
            setCurrentEmailsValue(
              emailsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEmailsDisplayValue(label);
            runValidationTasks("Emails", label);
          }}
          onClear={() => {
            setCurrentEmailsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchEmailsRecords(value);
            if (errors.Emails?.hasError) {
              runValidationTasks("Emails", value);
            }
            setCurrentEmailsDisplayValue(value);
            setCurrentEmailsValue(undefined);
          }}
          onBlur={() => runValidationTasks("Emails", currentEmailsDisplayValue)}
          errorMessage={errors.Emails?.errorMessage}
          hasError={errors.Emails?.hasError}
          ref={EmailsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Emails")}
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
