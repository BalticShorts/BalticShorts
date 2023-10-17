/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MovieTeamCreateFormInputValues = {
    director?: string;
    operator?: string[];
    scenario?: string[];
    editor?: string[];
    actors?: string[];
    costumes?: string[];
    makeup?: string[];
    executive_producer?: string[];
    producer?: string[];
};
export declare type MovieTeamCreateFormValidationValues = {
    director?: ValidationFunction<string>;
    operator?: ValidationFunction<string>;
    scenario?: ValidationFunction<string>;
    editor?: ValidationFunction<string>;
    actors?: ValidationFunction<string>;
    costumes?: ValidationFunction<string>;
    makeup?: ValidationFunction<string>;
    executive_producer?: ValidationFunction<string>;
    producer?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieTeamCreateFormOverridesProps = {
    MovieTeamCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    director?: PrimitiveOverrideProps<TextFieldProps>;
    operator?: PrimitiveOverrideProps<TextFieldProps>;
    scenario?: PrimitiveOverrideProps<TextFieldProps>;
    editor?: PrimitiveOverrideProps<TextFieldProps>;
    actors?: PrimitiveOverrideProps<TextFieldProps>;
    costumes?: PrimitiveOverrideProps<TextFieldProps>;
    makeup?: PrimitiveOverrideProps<TextFieldProps>;
    executive_producer?: PrimitiveOverrideProps<TextFieldProps>;
    producer?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MovieTeamCreateFormProps = React.PropsWithChildren<{
    overrides?: MovieTeamCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MovieTeamCreateFormInputValues) => MovieTeamCreateFormInputValues;
    onSuccess?: (fields: MovieTeamCreateFormInputValues) => void;
    onError?: (fields: MovieTeamCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieTeamCreateFormInputValues) => MovieTeamCreateFormInputValues;
    onValidate?: MovieTeamCreateFormValidationValues;
} & React.CSSProperties>;
export default function MovieTeamCreateForm(props: MovieTeamCreateFormProps): React.ReactElement;
