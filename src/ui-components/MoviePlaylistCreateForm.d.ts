/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MoviePlaylistCreateFormInputValues = {
    Creator?: string;
    movies?: any[];
    Title?: string;
    is_public?: boolean;
    is_recommended?: boolean;
};
export declare type MoviePlaylistCreateFormValidationValues = {
    Creator?: ValidationFunction<string>;
    movies?: ValidationFunction<any>;
    Title?: ValidationFunction<string>;
    is_public?: ValidationFunction<boolean>;
    is_recommended?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MoviePlaylistCreateFormOverridesProps = {
    MoviePlaylistCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Creator?: PrimitiveOverrideProps<TextFieldProps>;
    movies?: PrimitiveOverrideProps<AutocompleteProps>;
    Title?: PrimitiveOverrideProps<TextFieldProps>;
    is_public?: PrimitiveOverrideProps<SwitchFieldProps>;
    is_recommended?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MoviePlaylistCreateFormProps = React.PropsWithChildren<{
    overrides?: MoviePlaylistCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MoviePlaylistCreateFormInputValues) => MoviePlaylistCreateFormInputValues;
    onSuccess?: (fields: MoviePlaylistCreateFormInputValues) => void;
    onError?: (fields: MoviePlaylistCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MoviePlaylistCreateFormInputValues) => MoviePlaylistCreateFormInputValues;
    onValidate?: MoviePlaylistCreateFormValidationValues;
} & React.CSSProperties>;
export default function MoviePlaylistCreateForm(props: MoviePlaylistCreateFormProps): React.ReactElement;
