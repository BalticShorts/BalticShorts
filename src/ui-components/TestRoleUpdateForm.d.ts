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
export declare type TestRoleUpdateFormInputValues = {
    name?: string;
    movieRoles?: any[];
    personRoles?: any[];
};
export declare type TestRoleUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    movieRoles?: ValidationFunction<any>;
    personRoles?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestRoleUpdateFormOverridesProps = {
    TestRoleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    movieRoles?: PrimitiveOverrideProps<AutocompleteProps>;
    personRoles?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestRoleUpdateFormProps = React.PropsWithChildren<{
    overrides?: TestRoleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    testRole?: any;
    onSubmit?: (fields: TestRoleUpdateFormInputValues) => TestRoleUpdateFormInputValues;
    onSuccess?: (fields: TestRoleUpdateFormInputValues) => void;
    onError?: (fields: TestRoleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestRoleUpdateFormInputValues) => TestRoleUpdateFormInputValues;
    onValidate?: TestRoleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TestRoleUpdateForm(props: TestRoleUpdateFormProps): React.ReactElement;
