/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MovieRoleCreateFormInputValues = {
    Movie?: any;
    Role?: any;
    roleID?: string;
};
export declare type MovieRoleCreateFormValidationValues = {
    Movie?: ValidationFunction<any>;
    Role?: ValidationFunction<any>;
    roleID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieRoleCreateFormOverridesProps = {
    MovieRoleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Movie?: PrimitiveOverrideProps<AutocompleteProps>;
    Role?: PrimitiveOverrideProps<AutocompleteProps>;
    roleID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MovieRoleCreateFormProps = React.PropsWithChildren<{
    overrides?: MovieRoleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MovieRoleCreateFormInputValues) => MovieRoleCreateFormInputValues;
    onSuccess?: (fields: MovieRoleCreateFormInputValues) => void;
    onError?: (fields: MovieRoleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieRoleCreateFormInputValues) => MovieRoleCreateFormInputValues;
    onValidate?: MovieRoleCreateFormValidationValues;
} & React.CSSProperties>;
export default function MovieRoleCreateForm(props: MovieRoleCreateFormProps): React.ReactElement;
