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
export declare type TestPersonUpdateFormInputValues = {
    name?: string;
    roles?: any[];
};
export declare type TestPersonUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    roles?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestPersonUpdateFormOverridesProps = {
    TestPersonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    roles?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestPersonUpdateFormProps = React.PropsWithChildren<{
    overrides?: TestPersonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    testPerson?: any;
    onSubmit?: (fields: TestPersonUpdateFormInputValues) => TestPersonUpdateFormInputValues;
    onSuccess?: (fields: TestPersonUpdateFormInputValues) => void;
    onError?: (fields: TestPersonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestPersonUpdateFormInputValues) => TestPersonUpdateFormInputValues;
    onValidate?: TestPersonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TestPersonUpdateForm(props: TestPersonUpdateFormProps): React.ReactElement;
