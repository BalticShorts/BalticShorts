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
export declare type PersonRoleUpdateFormInputValues = {
    Person?: any;
    Role?: any;
    roleID?: string;
};
export declare type PersonRoleUpdateFormValidationValues = {
    Person?: ValidationFunction<any>;
    Role?: ValidationFunction<any>;
    roleID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonRoleUpdateFormOverridesProps = {
    PersonRoleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Person?: PrimitiveOverrideProps<AutocompleteProps>;
    Role?: PrimitiveOverrideProps<AutocompleteProps>;
    roleID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PersonRoleUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonRoleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    personRole?: any;
    onSubmit?: (fields: PersonRoleUpdateFormInputValues) => PersonRoleUpdateFormInputValues;
    onSuccess?: (fields: PersonRoleUpdateFormInputValues) => void;
    onError?: (fields: PersonRoleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonRoleUpdateFormInputValues) => PersonRoleUpdateFormInputValues;
    onValidate?: PersonRoleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonRoleUpdateForm(props: PersonRoleUpdateFormProps): React.ReactElement;
