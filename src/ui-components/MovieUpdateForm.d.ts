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
export declare type MovieUpdateFormInputValues = {
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
    uploaded_at?: string;
    guid?: string;
    MovieTeam?: any;
};
export declare type MovieUpdateFormValidationValues = {
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
    uploaded_at?: ValidationFunction<string>;
    guid?: ValidationFunction<string>;
    MovieTeam?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieUpdateFormOverridesProps = {
    MovieUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
    uploaded_at?: PrimitiveOverrideProps<TextFieldProps>;
    guid?: PrimitiveOverrideProps<TextFieldProps>;
    MovieTeam?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MovieUpdateFormProps = React.PropsWithChildren<{
    overrides?: MovieUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    movie?: any;
    onSubmit?: (fields: MovieUpdateFormInputValues) => MovieUpdateFormInputValues;
    onSuccess?: (fields: MovieUpdateFormInputValues) => void;
    onError?: (fields: MovieUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieUpdateFormInputValues) => MovieUpdateFormInputValues;
    onValidate?: MovieUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MovieUpdateForm(props: MovieUpdateFormProps): React.ReactElement;
