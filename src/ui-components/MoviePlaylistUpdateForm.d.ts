/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MoviePlaylistUpdateFormInputValues = {
    Creator?: string;
    movies?: any[];
    Title?: string;
    is_public?: boolean;
    is_recommended?: boolean;
    photo_location?: string;
    userprofileID?: string;
};
export declare type MoviePlaylistUpdateFormValidationValues = {
    Creator?: ValidationFunction<string>;
    movies?: ValidationFunction<any>;
    Title?: ValidationFunction<string>;
    is_public?: ValidationFunction<boolean>;
    is_recommended?: ValidationFunction<boolean>;
    photo_location?: ValidationFunction<string>;
    userprofileID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MoviePlaylistUpdateFormOverridesProps = {
    MoviePlaylistUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Creator?: PrimitiveOverrideProps<TextFieldProps>;
    movies?: PrimitiveOverrideProps<AutocompleteProps>;
    Title?: PrimitiveOverrideProps<TextFieldProps>;
    is_public?: PrimitiveOverrideProps<SwitchFieldProps>;
    is_recommended?: PrimitiveOverrideProps<SwitchFieldProps>;
    photo_location?: PrimitiveOverrideProps<TextFieldProps>;
    userprofileID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MoviePlaylistUpdateFormProps = React.PropsWithChildren<{
    overrides?: MoviePlaylistUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    moviePlaylist?: any;
    onSubmit?: (fields: MoviePlaylistUpdateFormInputValues) => MoviePlaylistUpdateFormInputValues;
    onSuccess?: (fields: MoviePlaylistUpdateFormInputValues) => void;
    onError?: (fields: MoviePlaylistUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MoviePlaylistUpdateFormInputValues) => MoviePlaylistUpdateFormInputValues;
    onValidate?: MoviePlaylistUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MoviePlaylistUpdateForm(props: MoviePlaylistUpdateFormProps): React.ReactElement;
