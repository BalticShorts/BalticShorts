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
export declare type MovieCreateFormInputValues = {
    name?: string;
    name_eng?: string;
    type?: string;
    genre?: string;
    description?: string;
    description_eng?: string;
    screen_language?: string;
    captions_language?: string;
    origin_country?: string;
    length?: number;
    created_year?: string;
    MovieTeam?: any;
};
export declare type MovieCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    name_eng?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    genre?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    description_eng?: ValidationFunction<string>;
    screen_language?: ValidationFunction<string>;
    captions_language?: ValidationFunction<string>;
    origin_country?: ValidationFunction<string>;
    length?: ValidationFunction<number>;
    created_year?: ValidationFunction<string>;
    MovieTeam?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieCreateFormOverridesProps = {
    MovieCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    name_eng?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    genre?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    description_eng?: PrimitiveOverrideProps<TextFieldProps>;
    screen_language?: PrimitiveOverrideProps<TextFieldProps>;
    captions_language?: PrimitiveOverrideProps<TextFieldProps>;
    origin_country?: PrimitiveOverrideProps<TextFieldProps>;
    length?: PrimitiveOverrideProps<TextFieldProps>;
    created_year?: PrimitiveOverrideProps<TextFieldProps>;
    MovieTeam?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MovieCreateFormProps = React.PropsWithChildren<{
    overrides?: MovieCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MovieCreateFormInputValues) => MovieCreateFormInputValues;
    onSuccess?: (fields: MovieCreateFormInputValues) => void;
    onError?: (fields: MovieCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieCreateFormInputValues) => MovieCreateFormInputValues;
    onValidate?: MovieCreateFormValidationValues;
} & React.CSSProperties>;
export default function MovieCreateForm(props: MovieCreateFormProps): React.ReactElement;
