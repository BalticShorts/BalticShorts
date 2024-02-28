/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type UploadMovieInputValues = {
    name?: string;
    name_eng?: string;
    genre?: string;
    description?: string;
    description_eng?: string;
    age_rating?: number;
    thumbnail_location?: string;
    screen_language?: string;
    captions_language?: string;
    origin_country?: string;
    length?: number;
    created_year?: number;
    MovieType?: any;
    subtitles_location?: string;
};
export declare type UploadMovieValidationValues = {
    name?: ValidationFunction<string>;
    name_eng?: ValidationFunction<string>;
    genre?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    description_eng?: ValidationFunction<string>;
    age_rating?: ValidationFunction<number>;
    thumbnail_location?: ValidationFunction<string>;
    screen_language?: ValidationFunction<string>;
    captions_language?: ValidationFunction<string>;
    origin_country?: ValidationFunction<string>;
    length?: ValidationFunction<number>;
    created_year?: ValidationFunction<number>;
    MovieType?: ValidationFunction<any>;
    subtitles_location?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UploadMovieOverridesProps = {
    UploadMovieGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    name_eng?: PrimitiveOverrideProps<TextFieldProps>;
    genre?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextAreaFieldProps>;
    description_eng?: PrimitiveOverrideProps<TextAreaFieldProps>;
    age_rating?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnail_location?: PrimitiveOverrideProps<TextFieldProps>;
    screen_language?: PrimitiveOverrideProps<AutocompleteProps>;
    captions_language?: PrimitiveOverrideProps<AutocompleteProps>;
    origin_country?: PrimitiveOverrideProps<AutocompleteProps>;
    length?: PrimitiveOverrideProps<TextFieldProps>;
    created_year?: PrimitiveOverrideProps<TextFieldProps>;
    MovieType?: PrimitiveOverrideProps<AutocompleteProps>;
    subtitles_location?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UploadMovieProps = React.PropsWithChildren<{
    overrides?: UploadMovieOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UploadMovieInputValues) => UploadMovieInputValues;
    onSuccess?: (fields: UploadMovieInputValues) => void;
    onError?: (fields: UploadMovieInputValues, errorMessage: string) => void;
    onChange?: (fields: UploadMovieInputValues) => UploadMovieInputValues;
    onValidate?: UploadMovieValidationValues;
} & React.CSSProperties>;
export default function UploadMovie(props: UploadMovieProps): React.ReactElement;
