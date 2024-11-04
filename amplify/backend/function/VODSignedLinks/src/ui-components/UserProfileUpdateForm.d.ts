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
export declare type UserProfileUpdateFormInputValues = {
    name?: string;
    surname?: string;
    is_member?: boolean;
    member_untill?: string;
    is_admin?: boolean;
    email?: string;
    user_id?: string;
    photo_location?: string;
    MoviePlaylists?: any[];
};
export declare type UserProfileUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    surname?: ValidationFunction<string>;
    is_member?: ValidationFunction<boolean>;
    member_untill?: ValidationFunction<string>;
    is_admin?: ValidationFunction<boolean>;
    email?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    photo_location?: ValidationFunction<string>;
    MoviePlaylists?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserProfileUpdateFormOverridesProps = {
    UserProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    surname?: PrimitiveOverrideProps<TextFieldProps>;
    is_member?: PrimitiveOverrideProps<SwitchFieldProps>;
    member_untill?: PrimitiveOverrideProps<TextFieldProps>;
    is_admin?: PrimitiveOverrideProps<SwitchFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    photo_location?: PrimitiveOverrideProps<TextFieldProps>;
    MoviePlaylists?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UserProfileUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserProfileUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userProfile?: any;
    onSubmit?: (fields: UserProfileUpdateFormInputValues) => UserProfileUpdateFormInputValues;
    onSuccess?: (fields: UserProfileUpdateFormInputValues) => void;
    onError?: (fields: UserProfileUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserProfileUpdateFormInputValues) => UserProfileUpdateFormInputValues;
    onValidate?: UserProfileUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserProfileUpdateForm(props: UserProfileUpdateFormProps): React.ReactElement;
