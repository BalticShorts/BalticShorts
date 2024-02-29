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
export declare type TestMovieRoleUpdateFormInputValues = {
    movie?: any;
    role?: any;
    testMovieRolesId?: string;
};
export declare type TestMovieRoleUpdateFormValidationValues = {
    movie?: ValidationFunction<any>;
    role?: ValidationFunction<any>;
    testMovieRolesId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestMovieRoleUpdateFormOverridesProps = {
    TestMovieRoleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    movie?: PrimitiveOverrideProps<AutocompleteProps>;
    role?: PrimitiveOverrideProps<AutocompleteProps>;
    testMovieRolesId?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestMovieRoleUpdateFormProps = React.PropsWithChildren<{
    overrides?: TestMovieRoleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    testMovieRole?: any;
    onSubmit?: (fields: TestMovieRoleUpdateFormInputValues) => TestMovieRoleUpdateFormInputValues;
    onSuccess?: (fields: TestMovieRoleUpdateFormInputValues) => void;
    onError?: (fields: TestMovieRoleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestMovieRoleUpdateFormInputValues) => TestMovieRoleUpdateFormInputValues;
    onValidate?: TestMovieRoleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TestMovieRoleUpdateForm(props: TestMovieRoleUpdateFormProps): React.ReactElement;
