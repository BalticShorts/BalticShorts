/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TestRoleCreateFormInputValues = {
    name?: string;
    movieRoles?: any[];
    personRoles?: any[];
};
export declare type TestRoleCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    movieRoles?: ValidationFunction<any>;
    personRoles?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestRoleCreateFormOverridesProps = {
    TestRoleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    movieRoles?: PrimitiveOverrideProps<AutocompleteProps>;
    personRoles?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestRoleCreateFormProps = React.PropsWithChildren<{
    overrides?: TestRoleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestRoleCreateFormInputValues) => TestRoleCreateFormInputValues;
    onSuccess?: (fields: TestRoleCreateFormInputValues) => void;
    onError?: (fields: TestRoleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestRoleCreateFormInputValues) => TestRoleCreateFormInputValues;
    onValidate?: TestRoleCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestRoleCreateForm(props: TestRoleCreateFormProps): React.ReactElement;
