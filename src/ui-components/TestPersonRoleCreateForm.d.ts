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
export declare type TestPersonRoleCreateFormInputValues = {
    person?: any;
    role?: any;
    testPersonRolesId?: string;
};
export declare type TestPersonRoleCreateFormValidationValues = {
    person?: ValidationFunction<any>;
    role?: ValidationFunction<any>;
    testPersonRolesId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestPersonRoleCreateFormOverridesProps = {
    TestPersonRoleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    person?: PrimitiveOverrideProps<AutocompleteProps>;
    role?: PrimitiveOverrideProps<AutocompleteProps>;
    testPersonRolesId?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestPersonRoleCreateFormProps = React.PropsWithChildren<{
    overrides?: TestPersonRoleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestPersonRoleCreateFormInputValues) => TestPersonRoleCreateFormInputValues;
    onSuccess?: (fields: TestPersonRoleCreateFormInputValues) => void;
    onError?: (fields: TestPersonRoleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestPersonRoleCreateFormInputValues) => TestPersonRoleCreateFormInputValues;
    onValidate?: TestPersonRoleCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestPersonRoleCreateForm(props: TestPersonRoleCreateFormProps): React.ReactElement;
