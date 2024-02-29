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
export declare type PersonRoleCreateFormInputValues = {
    Person?: any;
    roleID?: string;
};
export declare type PersonRoleCreateFormValidationValues = {
    Person?: ValidationFunction<any>;
    roleID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonRoleCreateFormOverridesProps = {
    PersonRoleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Person?: PrimitiveOverrideProps<AutocompleteProps>;
    roleID?: PrimitiveOverrideProps<AutocompleteProps>;
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
