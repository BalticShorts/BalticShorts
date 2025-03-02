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
  getPayment,
  getUserProfile,
  listEmails,
  listUserProfiles,
} from "../graphql/queries";
import { updatePayment } from "../graphql/mutations";
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
export default function PaymentUpdateForm(props) {
  const {
    id: idProp,
    payment: paymentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    reference: "",
    email: "",
    amount: "",
    status: "",
    createdAt: "",
    klixId: "",
    paymentType: "",
    userprofileID: undefined,
    Email: undefined,
  };
  const [reference, setReference] = React.useState(initialValues.reference);
  const [email, setEmail] = React.useState(initialValues.email);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [status, setStatus] = React.useState(initialValues.status);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [klixId, setKlixId] = React.useState(initialValues.klixId);
  const [paymentType, setPaymentType] = React.useState(
    initialValues.paymentType
  );
  const [userprofileID, setUserprofileID] = React.useState(
    initialValues.userprofileID
  );
  const [userprofileIDLoading, setUserprofileIDLoading] = React.useState(false);
  const [userprofileIDRecords, setUserprofileIDRecords] = React.useState([]);
  const [selectedUserprofileIDRecords, setSelectedUserprofileIDRecords] =
    React.useState([]);
  const [Email1, setEmail1] = React.useState(initialValues.Email);
  const [Email1Loading, setEmail1Loading] = React.useState(false);
  const [email1Records, setEmail1Records] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = paymentRecord
      ? { ...initialValues, ...paymentRecord, userprofileID, Email1 }
      : initialValues;
    setReference(cleanValues.reference);
    setEmail(cleanValues.email);
    setAmount(cleanValues.amount);
    setStatus(cleanValues.status);
    setCreatedAt(cleanValues.createdAt);
    setKlixId(cleanValues.klixId);
    setPaymentType(cleanValues.paymentType);
    setUserprofileID(cleanValues.userprofileID);
    setCurrentUserprofileIDValue(undefined);
    setCurrentUserprofileIDDisplayValue("");
    setEmail1(cleanValues.Email);
    setCurrentEmail1Value(undefined);
    setCurrentEmail1DisplayValue("");
    setErrors({});
  };
  const [paymentRecord, setPaymentRecord] = React.useState(paymentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPayment.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPayment
        : paymentModelProp;
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
      const Email1Record = record ? await record.Email1 : undefined;
      setEmail1(Email1Record);
      setPaymentRecord(record);
    };
    queryData();
  }, [idProp, paymentModelProp]);
  React.useEffect(resetStateValues, [paymentRecord, userprofileID, Email1]);
  const [
    currentUserprofileIDDisplayValue,
    setCurrentUserprofileIDDisplayValue,
  ] = React.useState("");
  const [currentUserprofileIDValue, setCurrentUserprofileIDValue] =
    React.useState(undefined);
  const userprofileIDRef = React.createRef();
  const [currentEmail1DisplayValue, setCurrentEmail1DisplayValue] =
    React.useState("");
  const [currentEmail1Value, setCurrentEmail1Value] = React.useState(undefined);
  const Email1Ref = React.createRef();
  const getIDValue = {
    Email: (r) => JSON.stringify({ id: r?.id }),
  };
  const Email1IdSet = new Set(
    Array.isArray(Email1)
      ? Email1.map((r) => getIDValue.Email1?.(r))
      : getIDValue.Email1?.(Email1)
  );
  const getDisplayValue = {
    userprofileID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Email: (r) => `${r?.email ? r?.email + " - " : ""}${r?.id}`,
  };
  const validations = {
    reference: [{ type: "Required" }],
    email: [{ type: "Required" }, { type: "Email" }],
    amount: [{ type: "Required" }],
    status: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    klixId: [],
    paymentType: [],
    userprofileID: [{ type: "Required" }],
    Email: [],
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
  const fetchEmail1Records = async (value) => {
    setEmail1Loading(true);
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
        (item) => !EmailIdSet.has(getIDValue.Email?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setEmail1Records(newOptions.slice(0, autocompleteLength));
    setEmail1Loading(false);
  };
  React.useEffect(() => {
    fetchUserprofileIDRecords("");
    fetchEmail1Records("");
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
          reference,
          email,
          amount,
          status,
          createdAt,
          klixId: klixId ?? null,
          paymentType: paymentType ?? null,
          userprofileID,
          Email: Email ?? null,
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
            reference: modelFields.reference,
            email: modelFields.email,
            amount: modelFields.amount,
            status: modelFields.status,
            createdAt: modelFields.createdAt,
            klixId: modelFields.klixId ?? null,
            paymentType: modelFields.paymentType ?? null,
            userprofileID: modelFields.userprofileID,
            paymentEmailId: modelFields?.Email1?.id ?? null,
          };
          await API.graphql({
            query: updatePayment.replaceAll("__typename", ""),
            variables: {
              input: {
                id: paymentRecord.id,
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
      {...getOverrideProps(overrides, "PaymentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Reference"
        isRequired={true}
        isReadOnly={false}
        value={reference}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reference: value,
              email,
              amount,
              status,
              createdAt,
              klixId,
              paymentType,
              userprofileID,
              Email: Email1,
            };
            const result = onChange(modelFields);
            value = result?.reference ?? value;
          }
          if (errors.reference?.hasError) {
            runValidationTasks("reference", value);
          }
          setReference(value);
        }}
        onBlur={() => runValidationTasks("reference", reference)}
        errorMessage={errors.reference?.errorMessage}
        hasError={errors.reference?.hasError}
        {...getOverrideProps(overrides, "reference")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reference,
              email: value,
              amount,
              status,
              createdAt,
              klixId,
              paymentType,
              userprofileID,
              Email: Email1,
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
        label="Amount"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              reference,
              email,
              amount: value,
              status,
              createdAt,
              klixId,
              paymentType,
              userprofileID,
              Email: Email1,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
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
              reference,
              email,
              amount,
              status: value,
              createdAt,
              klixId,
              paymentType,
              userprofileID,
              Email: Email1,
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
              reference,
              email,
              amount,
              status,
              createdAt: value,
              klixId,
              paymentType,
              userprofileID,
              Email: Email1,
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
        label="Klix id"
        isRequired={false}
        isReadOnly={false}
        value={klixId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reference,
              email,
              amount,
              status,
              createdAt,
              klixId: value,
              paymentType,
              userprofileID,
              Email: Email1,
            };
            const result = onChange(modelFields);
            value = result?.klixId ?? value;
          }
          if (errors.klixId?.hasError) {
            runValidationTasks("klixId", value);
          }
          setKlixId(value);
        }}
        onBlur={() => runValidationTasks("klixId", klixId)}
        errorMessage={errors.klixId?.errorMessage}
        hasError={errors.klixId?.hasError}
        {...getOverrideProps(overrides, "klixId")}
      ></TextField>
      <TextField
        label="Payment type"
        isRequired={false}
        isReadOnly={false}
        value={paymentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reference,
              email,
              amount,
              status,
              createdAt,
              klixId,
              paymentType: value,
              userprofileID,
              Email: Email1,
            };
            const result = onChange(modelFields);
            value = result?.paymentType ?? value;
          }
          if (errors.paymentType?.hasError) {
            runValidationTasks("paymentType", value);
          }
          setPaymentType(value);
        }}
        onBlur={() => runValidationTasks("paymentType", paymentType)}
        errorMessage={errors.paymentType?.errorMessage}
        hasError={errors.paymentType?.hasError}
        {...getOverrideProps(overrides, "paymentType")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              reference,
              email,
              amount,
              status,
              createdAt,
              klixId,
              paymentType,
              userprofileID: value,
              Email: Email1,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              reference,
              email,
              amount,
              status,
              createdAt,
              klixId,
              paymentType,
              userprofileID,
              Email: value,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          setEmail1(value);
          setCurrentEmail1Value(undefined);
          setCurrentEmail1DisplayValue("");
        }}
        currentFieldValue={currentEmail1Value}
        label={"Email"}
        items={Email1 ? [Email1] : []}
        hasError={errors?.Email?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Email", currentEmail1Value)
        }
        errorMessage={errors?.Email?.errorMessage}
        getBadgeText={getDisplayValue.Email}
        setFieldValue={(model) => {
          setCurrentEmail1DisplayValue(
            model ? getDisplayValue.Email(model) : ""
          );
          setCurrentEmail1Value(model);
        }}
        inputFieldRef={Email1Ref}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Email"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Email"
          value={currentEmail1DisplayValue}
          options={email1Records
            .filter((r) => !Email1IdSet.has(getIDValue.Email1?.(r)))
            .map((r) => ({
              id: getIDValue.Email1?.(r),
              label: getDisplayValue.Email1?.(r),
            }))}
          isLoading={Email1Loading}
          onSelect={({ id, label }) => {
            setCurrentEmail1Value(
              emailRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEmail1DisplayValue(label);
            runValidationTasks("Email", label);
          }}
          onClear={() => {
            setCurrentEmail1DisplayValue("");
          }}
          defaultValue={Email1}
          onChange={(e) => {
            let { value } = e.target;
            fetchEmailRecords(value);
            if (errors.Email?.hasError) {
              runValidationTasks("Email", value);
            }
            setCurrentEmail1DisplayValue(value);
            setCurrentEmail1Value(undefined);
          }}
          onBlur={() => runValidationTasks("Email", currentEmail1DisplayValue)}
          errorMessage={errors.Email?.errorMessage}
          hasError={errors.Email?.hasError}
          ref={Email1Ref}
          labelHidden={true}
          {...getOverrideProps(overrides, "Email")}
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
          isDisabled={!(idProp || paymentModelProp)}
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
              !(idProp || paymentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
