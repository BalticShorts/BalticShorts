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
export declare type PersonUpdateFormInputValues = {
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
    is_entity?: boolean;
    nationality?: string;
};
export declare type PersonUpdateFormValidationValues = {
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
    is_entity?: ValidationFunction<boolean>;
    nationality?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonUpdateFormOverridesProps = {
    PersonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
    is_entity?: PrimitiveOverrideProps<SwitchFieldProps>;
    nationality?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PersonUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    person?: any;
    onSubmit?: (fields: PersonUpdateFormInputValues) => PersonUpdateFormInputValues;
    onSuccess?: (fields: PersonUpdateFormInputValues) => void;
    onError?: (fields: PersonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonUpdateFormInputValues) => PersonUpdateFormInputValues;
    onValidate?: PersonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonUpdateForm(props: PersonUpdateFormProps): React.ReactElement;
