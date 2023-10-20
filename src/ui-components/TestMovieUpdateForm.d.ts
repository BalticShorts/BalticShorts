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
export declare type TestMovieUpdateFormInputValues = {
    title?: string;
    year?: string;
    roles?: any[];
};
export declare type TestMovieUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    roles?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TestMovieUpdateFormOverridesProps = {
    TestMovieUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    roles?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TestMovieUpdateFormProps = React.PropsWithChildren<{
    overrides?: TestMovieUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    testMovie?: any;
    onSubmit?: (fields: TestMovieUpdateFormInputValues) => TestMovieUpdateFormInputValues;
    onSuccess?: (fields: TestMovieUpdateFormInputValues) => void;
    onError?: (fields: TestMovieUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TestMovieUpdateFormInputValues) => TestMovieUpdateFormInputValues;
    onValidate?: TestMovieUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TestMovieUpdateForm(props: TestMovieUpdateFormProps): React.ReactElement;
