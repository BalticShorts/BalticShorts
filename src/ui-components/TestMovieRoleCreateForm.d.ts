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
export declare type TestMovieRoleCreateFormInputValues = {
    movie?: any;
    role?: any;
    testMovieRolesId?: string;
};
export declare type TestMovieRoleCreateFormValidationValues = {
    movie?: ValidationFunction<any>;
    role?: ValidationFunction<any>;
    testMovieRolesId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestMovieRoleCreateFormOverridesProps = {
    TestMovieRoleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    movie?: PrimitiveOverrideProps<AutocompleteProps>;
    role?: PrimitiveOverrideProps<AutocompleteProps>;
    testMovieRolesId?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestMovieRoleCreateFormProps = React.PropsWithChildren<{
    overrides?: TestMovieRoleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestMovieRoleCreateFormInputValues) => TestMovieRoleCreateFormInputValues;
    onSuccess?: (fields: TestMovieRoleCreateFormInputValues) => void;
    onError?: (fields: TestMovieRoleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestMovieRoleCreateFormInputValues) => TestMovieRoleCreateFormInputValues;
    onValidate?: TestMovieRoleCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestMovieRoleCreateForm(props: TestMovieRoleCreateFormProps): React.ReactElement;
