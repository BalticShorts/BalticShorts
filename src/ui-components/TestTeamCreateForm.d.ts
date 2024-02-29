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
export declare type TestTeamCreateFormInputValues = {
    director?: string;
    People?: any[];
    actors?: string[];
};
export declare type TestTeamCreateFormValidationValues = {
    director?: ValidationFunction<string>;
    People?: ValidationFunction<any>;
    actors?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestTeamCreateFormOverridesProps = {
    TestTeamCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    director?: PrimitiveOverrideProps<TextFieldProps>;
    People?: PrimitiveOverrideProps<AutocompleteProps>;
    actors?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TestTeamCreateFormProps = React.PropsWithChildren<{
    overrides?: TestTeamCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestTeamCreateFormInputValues) => TestTeamCreateFormInputValues;
    onSuccess?: (fields: TestTeamCreateFormInputValues) => void;
    onError?: (fields: TestTeamCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestTeamCreateFormInputValues) => TestTeamCreateFormInputValues;
    onValidate?: TestTeamCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestTeamCreateForm(props: TestTeamCreateFormProps): React.ReactElement;
