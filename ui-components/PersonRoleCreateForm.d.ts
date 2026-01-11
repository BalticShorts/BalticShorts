/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps } from "@aws-amplify/ui-react";
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
export declare type PersonRoleCreateFormInputValues = {
    Person?: any;
    Role?: any;
};
export declare type PersonRoleCreateFormValidationValues = {
    Person?: ValidationFunction<any>;
    Role?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonRoleCreateFormOverridesProps = {
    PersonRoleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Person?: PrimitiveOverrideProps<AutocompleteProps>;
    Role?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PersonRoleCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonRoleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonRoleCreateFormInputValues) => PersonRoleCreateFormInputValues;
    onSuccess?: (fields: PersonRoleCreateFormInputValues) => void;
    onError?: (fields: PersonRoleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonRoleCreateFormInputValues) => PersonRoleCreateFormInputValues;
    onValidate?: PersonRoleCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonRoleCreateForm(props: PersonRoleCreateFormProps): React.ReactElement;
