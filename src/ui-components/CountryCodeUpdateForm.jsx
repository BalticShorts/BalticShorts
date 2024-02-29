/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getCountryCode } from "../graphql/queries";
import { updateCountryCode } from "../graphql/mutations";
export default function CountryCodeUpdateForm(props) {
  const {
    id: idProp,
    countryCode: countryCodeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Country: "",
    Code: "",
  };
  const [Country, setCountry] = React.useState(initialValues.Country);
  const [Code, setCode] = React.useState(initialValues.Code);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = countryCodeRecord
      ? { ...initialValues, ...countryCodeRecord }
      : initialValues;
    setCountry(cleanValues.Country);
    setCode(cleanValues.Code);
    setErrors({});
  };
  const [countryCodeRecord, setCountryCodeRecord] =
    React.useState(countryCodeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getCountryCode.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCountryCode
        : countryCodeModelProp;
      setCountryCodeRecord(record);
    };
    queryData();
  }, [idProp, countryCodeModelProp]);
  React.useEffect(resetStateValues, [countryCodeRecord]);
  const validations = {
    Country: [{ type: "Required" }],
    Code: [{ type: "Required" }],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Country,
          Code,
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
            query: updateCountryCode.replaceAll("__typename", ""),
            variables: {
              input: {
                id: countryCodeRecord.id,
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
      {...getOverrideProps(overrides, "CountryCodeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Country"
        isRequired={true}
        isReadOnly={false}
        value={Country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Country: value,
              Code,
            };
            const result = onChange(modelFields);
            value = result?.Country ?? value;
          }
          if (errors.Country?.hasError) {
            runValidationTasks("Country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("Country", Country)}
        errorMessage={errors.Country?.errorMessage}
        hasError={errors.Country?.hasError}
        {...getOverrideProps(overrides, "Country")}
      ></TextField>
      <TextField
        label="Code"
        isRequired={true}
        isReadOnly={false}
        value={Code}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Country,
              Code: value,
            };
            const result = onChange(modelFields);
            value = result?.Code ?? value;
          }
          if (errors.Code?.hasError) {
            runValidationTasks("Code", value);
          }
          setCode(value);
        }}
        onBlur={() => runValidationTasks("Code", Code)}
        errorMessage={errors.Code?.errorMessage}
        hasError={errors.Code?.hasError}
        {...getOverrideProps(overrides, "Code")}
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
          isDisabled={!(idProp || countryCodeModelProp)}
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
              !(idProp || countryCodeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
