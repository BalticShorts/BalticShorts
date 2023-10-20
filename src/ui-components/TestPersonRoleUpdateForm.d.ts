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
export declare type TestPersonRoleUpdateFormInputValues = {
    person?: any;
    role?: any;
    testPersonRolesId?: string;
};
export declare type TestPersonRoleUpdateFormValidationValues = {
    person?: ValidationFunction<any>;
    role?: ValidationFunction<any>;
    testPersonRolesId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestPersonRoleUpdateFormOverridesProps = {
    TestPersonRoleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    person?: PrimitiveOverrideProps<AutocompleteProps>;
    role?: PrimitiveOverrideProps<AutocompleteProps>;
    testPersonRolesId?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestPersonRoleUpdateFormProps = React.PropsWithChildren<{
    overrides?: TestPersonRoleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    testPersonRole?: any;
    onSubmit?: (fields: TestPersonRoleUpdateFormInputValues) => TestPersonRoleUpdateFormInputValues;
    onSuccess?: (fields: TestPersonRoleUpdateFormInputValues) => void;
    onError?: (fields: TestPersonRoleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestPersonRoleUpdateFormInputValues) => TestPersonRoleUpdateFormInputValues;
    onValidate?: TestPersonRoleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TestPersonRoleUpdateForm(props: TestPersonRoleUpdateFormProps): React.ReactElement;
