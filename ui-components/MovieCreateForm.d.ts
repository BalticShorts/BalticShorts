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
    created_year?: number;
    MovieTeam?: any;
    MovieInPlaylists?: any[];
    description_language?: string;
    MovieType?: any;
    Field0?: string;
    Field1?: string;
    photo_location?: string;
    thumbnail_location?: string;
    age_rating?: number;
    subtitles_location?: string;
    creators_comment?: string;
    is_highlighted?: boolean;
    trailer_location?: string;
    awards?: any[];
    raw_video_location?: string;
    hls_url?: string;
    dash_url?: string;
    cmaf_hls_url?: string;
    cmaf_dash_url?: string;
    drm_key_id?: string;
    drm_resource_id?: string;
    approved?: boolean;
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
    created_year?: ValidationFunction<number>;
    MovieTeam?: ValidationFunction<any>;
    MovieInPlaylists?: ValidationFunction<any>;
    description_language?: ValidationFunction<string>;
    MovieType?: ValidationFunction<any>;
    Field0?: ValidationFunction<string>;
    Field1?: ValidationFunction<string>;
    photo_location?: ValidationFunction<string>;
    thumbnail_location?: ValidationFunction<string>;
    age_rating?: ValidationFunction<number>;
    subtitles_location?: ValidationFunction<string>;
    creators_comment?: ValidationFunction<string>;
    is_highlighted?: ValidationFunction<boolean>;
    trailer_location?: ValidationFunction<string>;
    awards?: ValidationFunction<any>;
    raw_video_location?: ValidationFunction<string>;
    hls_url?: ValidationFunction<string>;
    dash_url?: ValidationFunction<string>;
    cmaf_hls_url?: ValidationFunction<string>;
    cmaf_dash_url?: ValidationFunction<string>;
    drm_key_id?: ValidationFunction<string>;
    drm_resource_id?: ValidationFunction<string>;
    approved?: ValidationFunction<boolean>;
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
    MovieInPlaylists?: PrimitiveOverrideProps<AutocompleteProps>;
    description_language?: PrimitiveOverrideProps<TextFieldProps>;
    MovieType?: PrimitiveOverrideProps<AutocompleteProps>;
    Field0?: PrimitiveOverrideProps<StorageManagerProps>;
    Field1?: PrimitiveOverrideProps<StorageManagerProps>;
    photo_location?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnail_location?: PrimitiveOverrideProps<TextFieldProps>;
    age_rating?: PrimitiveOverrideProps<TextFieldProps>;
    subtitles_location?: PrimitiveOverrideProps<TextFieldProps>;
    creators_comment?: PrimitiveOverrideProps<TextFieldProps>;
    is_highlighted?: PrimitiveOverrideProps<SwitchFieldProps>;
    trailer_location?: PrimitiveOverrideProps<TextFieldProps>;
    awards?: PrimitiveOverrideProps<AutocompleteProps>;
    raw_video_location?: PrimitiveOverrideProps<TextFieldProps>;
    hls_url?: PrimitiveOverrideProps<TextFieldProps>;
    dash_url?: PrimitiveOverrideProps<TextFieldProps>;
    cmaf_hls_url?: PrimitiveOverrideProps<TextFieldProps>;
    cmaf_dash_url?: PrimitiveOverrideProps<TextFieldProps>;
    drm_key_id?: PrimitiveOverrideProps<TextFieldProps>;
    drm_resource_id?: PrimitiveOverrideProps<TextFieldProps>;
    approved?: PrimitiveOverrideProps<SwitchFieldProps>;
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
