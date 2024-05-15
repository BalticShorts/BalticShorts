/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
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
    Title?: string;
    movies?: any[];
    is_recommended?: boolean;
    Field0?: string;
};
export declare type MoviePlaylistUpdateFormValidationValues = {
    Creator?: ValidationFunction<string>;
    Title?: ValidationFunction<string>;
    movies?: ValidationFunction<any>;
    is_recommended?: ValidationFunction<boolean>;
    Field0?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MoviePlaylistUpdateFormOverridesProps = {
    MoviePlaylistUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Creator?: PrimitiveOverrideProps<TextFieldProps>;
    Title?: PrimitiveOverrideProps<TextFieldProps>;
    movies?: PrimitiveOverrideProps<AutocompleteProps>;
    is_recommended?: PrimitiveOverrideProps<SwitchFieldProps>;
    Field0?: PrimitiveOverrideProps<StorageManagerProps>;
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
