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
export declare type MovieRoleUpdateFormInputValues = {
    Movie?: any;
    Role?: any;
    roleID?: string;
};
export declare type MovieRoleUpdateFormValidationValues = {
    Movie?: ValidationFunction<any>;
    Role?: ValidationFunction<any>;
    roleID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieRoleUpdateFormOverridesProps = {
    MovieRoleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Movie?: PrimitiveOverrideProps<AutocompleteProps>;
    Role?: PrimitiveOverrideProps<AutocompleteProps>;
    roleID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MovieRoleUpdateFormProps = React.PropsWithChildren<{
    overrides?: MovieRoleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    movieRole?: any;
    onSubmit?: (fields: MovieRoleUpdateFormInputValues) => MovieRoleUpdateFormInputValues;
    onSuccess?: (fields: MovieRoleUpdateFormInputValues) => void;
    onError?: (fields: MovieRoleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieRoleUpdateFormInputValues) => MovieRoleUpdateFormInputValues;
    onValidate?: MovieRoleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MovieRoleUpdateForm(props: MovieRoleUpdateFormProps): React.ReactElement;
