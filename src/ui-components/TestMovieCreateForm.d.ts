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
export declare type TestMovieCreateFormInputValues = {
    title?: string;
    year?: string;
    roles?: any[];
};
export declare type TestMovieCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    roles?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestMovieCreateFormOverridesProps = {
    TestMovieCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    roles?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestMovieCreateFormProps = React.PropsWithChildren<{
    overrides?: TestMovieCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TestMovieCreateFormInputValues) => TestMovieCreateFormInputValues;
    onSuccess?: (fields: TestMovieCreateFormInputValues) => void;
    onError?: (fields: TestMovieCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestMovieCreateFormInputValues) => TestMovieCreateFormInputValues;
    onValidate?: TestMovieCreateFormValidationValues;
} & React.CSSProperties>;
export default function TestMovieCreateForm(props: TestMovieCreateFormProps): React.ReactElement;
