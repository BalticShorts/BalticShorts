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
import {
  getEmail,
  getUserProfile,
  listUserProfiles,
} from "../src/graphql/queries";
import { updateEmail } from "../src/graphql/mutations";
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
export default function EmailUpdateForm(props) {
  const {
    id: idProp,
    email: emailModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    message: "",
    createdAt: "",
    status: "",
    userprofileID: undefined,
    paymentID: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [message, setMessage] = React.useState(initialValues.message);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [status, setStatus] = React.useState(initialValues.status);
  const [userprofileID, setUserprofileID] = React.useState(
    initialValues.userprofileID
  );
  const [userprofileIDLoading, setUserprofileIDLoading] = React.useState(false);
  const [userprofileIDRecords, setUserprofileIDRecords] = React.useState([]);
  const [selectedUserprofileIDRecords, setSelectedUserprofileIDRecords] =
    React.useState([]);
  const [paymentID, setPaymentID] = React.useState(initialValues.paymentID);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = emailRecord
      ? { ...initialValues, ...emailRecord, userprofileID }
      : initialValues;
    setEmail(cleanValues.email);
    setMessage(cleanValues.message);
    setCreatedAt(cleanValues.createdAt);
    setStatus(cleanValues.status);
    setUserprofileID(cleanValues.userprofileID);
    setCurrentUserprofileIDValue(undefined);
    setCurrentUserprofileIDDisplayValue("");
    setPaymentID(cleanValues.paymentID);
    setErrors({});
  };
  const [emailRecord, setEmailRecord] = React.useState(emailModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getEmail.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEmail
        : emailModelProp;
      const userprofileIDRecord = record ? record.userprofileID : undefined;
      const userProfileRecord = userprofileIDRecord
        ? (
            await API.graphql({
              query: getUserProfile.replaceAll("__typename", ""),
              variables: { id: userprofileIDRecord },
            })
          )?.data?.getUserProfile
        : undefined;
      setUserprofileID(userprofileIDRecord);
      setSelectedUserprofileIDRecords([userProfileRecord]);
      setEmailRecord(record);
    };
    queryData();
  }, [idProp, emailModelProp]);
  React.useEffect(resetStateValues, [emailRecord, userprofileID]);
  const [
    currentUserprofileIDDisplayValue,
    setCurrentUserprofileIDDisplayValue,
  ] = React.useState("");
  const [currentUserprofileIDValue, setCurrentUserprofileIDValue] =
    React.useState(undefined);
  const userprofileIDRef = React.createRef();
  const getDisplayValue = {
    userprofileID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    email: [{ type: "Required" }, { type: "Email" }],
    message: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    status: [{ type: "Required" }],
    userprofileID: [{ type: "Required" }],
    paymentID: [],
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
  const fetchUserprofileIDRecords = async (value) => {
    setUserprofileIDLoading(true);
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
          query: listUserProfiles.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listUserProfiles?.items;
      var loaded = result.filter((item) => userprofileID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setUserprofileIDRecords(newOptions.slice(0, autocompleteLength));
    setUserprofileIDLoading(false);
  };
  React.useEffect(() => {
    fetchUserprofileIDRecords("");
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
          email,
          message,
          createdAt,
          status,
          userprofileID,
          paymentID: paymentID ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
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
          await API.graphql({
            query: updateEmail.replaceAll("__typename", ""),
            variables: {
              input: {
                id: emailRecord.id,
                ...modelFields,
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
      {...getOverrideProps(overrides, "EmailUpdateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              message,
              createdAt,
              status,
              userprofileID,
              paymentID,
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
        label="Message"
        isRequired={true}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              message: value,
              createdAt,
              status,
              userprofileID,
              paymentID,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              email,
              message,
              createdAt: value,
              status,
              userprofileID,
              paymentID,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={true}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              message,
              createdAt,
              status: value,
              userprofileID,
              paymentID,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              email,
              message,
              createdAt,
              status,
              userprofileID: value,
              paymentID,
            };
            const result = onChange(modelFields);
            value = result?.userprofileID ?? value;
          }
          setUserprofileID(value);
          setCurrentUserprofileIDValue(undefined);
        }}
        currentFieldValue={currentUserprofileIDValue}
        label={"Userprofile id"}
        items={userprofileID ? [userprofileID] : []}
        hasError={errors?.userprofileID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("userprofileID", currentUserprofileIDValue)
        }
        errorMessage={errors?.userprofileID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.userprofileID(
                userprofileIDRecords.find((r) => r.id === value) ??
                  selectedUserprofileIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentUserprofileIDDisplayValue(
            value
              ? getDisplayValue.userprofileID(
                  userprofileIDRecords.find((r) => r.id === value) ??
                    selectedUserprofileIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentUserprofileIDValue(value);
          const selectedRecord = userprofileIDRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedUserprofileIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={userprofileIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Userprofile id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search UserProfile"
          value={currentUserprofileIDDisplayValue}
          options={userprofileIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.userprofileID?.(r),
            }))}
          isLoading={userprofileIDLoading}
          onSelect={({ id, label }) => {
            setCurrentUserprofileIDValue(id);
            setCurrentUserprofileIDDisplayValue(label);
            runValidationTasks("userprofileID", label);
          }}
          onClear={() => {
            setCurrentUserprofileIDDisplayValue("");
          }}
          defaultValue={userprofileID}
          onChange={(e) => {
            let { value } = e.target;
            fetchUserprofileIDRecords(value);
            if (errors.userprofileID?.hasError) {
              runValidationTasks("userprofileID", value);
            }
            setCurrentUserprofileIDDisplayValue(value);
            setCurrentUserprofileIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("userprofileID", currentUserprofileIDValue)
          }
          errorMessage={errors.userprofileID?.errorMessage}
          hasError={errors.userprofileID?.hasError}
          ref={userprofileIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "userprofileID")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Payment id"
        isRequired={false}
        isReadOnly={false}
        value={paymentID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              message,
              createdAt,
              status,
              userprofileID,
              paymentID: value,
            };
            const result = onChange(modelFields);
            value = result?.paymentID ?? value;
          }
          if (errors.paymentID?.hasError) {
            runValidationTasks("paymentID", value);
          }
          setPaymentID(value);
        }}
        onBlur={() => runValidationTasks("paymentID", paymentID)}
        errorMessage={errors.paymentID?.errorMessage}
        hasError={errors.paymentID?.hasError}
        {...getOverrideProps(overrides, "paymentID")}
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
          isDisabled={!(idProp || emailModelProp)}
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
              !(idProp || emailModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
