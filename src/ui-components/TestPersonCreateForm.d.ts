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
export declare type TestPersonCreateFormInputValues = {
    name?: string;
    roles?: any[];
};
export declare type TestPersonCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    roles?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestPersonCreateFormOverridesProps = {
    TestPersonCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    roles?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestPersonCreateFormProps = React.PropsWithChildren<{
    overrides?: TestPersonCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestPersonCreateFormInputValues) => TestPersonCreateFormInputValues;
    onSuccess?: (fields: TestPersonCreateFormInputValues) => void;
    onError?: (fields: TestPersonCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestPersonCreateFormInputValues) => TestPersonCreateFormInputValues;
    onValidate?: TestPersonCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestPersonCreateForm(props: TestPersonCreateFormProps): React.ReactElement;
