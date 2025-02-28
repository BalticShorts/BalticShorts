/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EmailCreateFormInputValues = {
    email?: string;
    message?: string;
    createdAt?: string;
    status?: string;
    userprofileID?: string;
    paymentID?: string;
};
export declare type EmailCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    userprofileID?: ValidationFunction<string>;
    paymentID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailCreateFormOverridesProps = {
    EmailCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    userprofileID?: PrimitiveOverrideProps<AutocompleteProps>;
    paymentID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmailCreateFormProps = React.PropsWithChildren<{
    overrides?: EmailCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmailCreateFormInputValues) => EmailCreateFormInputValues;
    onSuccess?: (fields: EmailCreateFormInputValues) => void;
    onError?: (fields: EmailCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailCreateFormInputValues) => EmailCreateFormInputValues;
    onValidate?: EmailCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmailCreateForm(props: EmailCreateFormProps): React.ReactElement;
