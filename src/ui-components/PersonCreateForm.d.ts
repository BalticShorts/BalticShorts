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
export declare type PersonCreateFormInputValues = {
    name?: string;
    surname?: string;
    role?: string;
    description?: string;
    Instagram?: string;
    Facebook?: string;
    IMBD?: string;
    email?: string;
    PersonMovieTeams?: any[];
    user_id?: string;
    is_public?: boolean;
    completed_setup?: boolean;
    photo_location?: string;
    description_confirmed?: boolean;
    photo_confirmed?: boolean;
};
export declare type PersonCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    surname?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    Instagram?: ValidationFunction<string>;
    Facebook?: ValidationFunction<string>;
    IMBD?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    PersonMovieTeams?: ValidationFunction<any>;
    user_id?: ValidationFunction<string>;
    is_public?: ValidationFunction<boolean>;
    completed_setup?: ValidationFunction<boolean>;
    photo_location?: ValidationFunction<string>;
    description_confirmed?: ValidationFunction<boolean>;
    photo_confirmed?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonCreateFormOverridesProps = {
    PersonCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    surname?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    Instagram?: PrimitiveOverrideProps<TextFieldProps>;
    Facebook?: PrimitiveOverrideProps<TextFieldProps>;
    IMBD?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    PersonMovieTeams?: PrimitiveOverrideProps<AutocompleteProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    is_public?: PrimitiveOverrideProps<SwitchFieldProps>;
    completed_setup?: PrimitiveOverrideProps<SwitchFieldProps>;
    photo_location?: PrimitiveOverrideProps<TextFieldProps>;
    description_confirmed?: PrimitiveOverrideProps<SwitchFieldProps>;
    photo_confirmed?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PersonCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonCreateFormInputValues) => PersonCreateFormInputValues;
    onSuccess?: (fields: PersonCreateFormInputValues) => void;
    onError?: (fields: PersonCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonCreateFormInputValues) => PersonCreateFormInputValues;
    onValidate?: PersonCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonCreateForm(props: PersonCreateFormProps): React.ReactElement;
