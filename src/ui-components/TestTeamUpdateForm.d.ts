/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TestTeamUpdateFormInputValues = {
    director?: string;
    People?: any[];
    actors?: string[];
};
export declare type TestTeamUpdateFormValidationValues = {
    director?: ValidationFunction<string>;
    People?: ValidationFunction<any>;
    actors?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestTeamUpdateFormOverridesProps = {
    TestTeamUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    director?: PrimitiveOverrideProps<TextFieldProps>;
    People?: PrimitiveOverrideProps<AutocompleteProps>;
    actors?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TestTeamUpdateFormProps = React.PropsWithChildren<{
    overrides?: TestTeamUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    testTeam?: any;
    onSubmit?: (fields: TestTeamUpdateFormInputValues) => TestTeamUpdateFormInputValues;
    onSuccess?: (fields: TestTeamUpdateFormInputValues) => void;
    onError?: (fields: TestTeamUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestTeamUpdateFormInputValues) => TestTeamUpdateFormInputValues;
    onValidate?: TestTeamUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TestTeamUpdateForm(props: TestTeamUpdateFormProps): React.ReactElement;
