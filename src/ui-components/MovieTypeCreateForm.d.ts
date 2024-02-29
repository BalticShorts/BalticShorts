/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MovieTypeCreateFormInputValues = {
    type?: string;
};
export declare type MovieTypeCreateFormValidationValues = {
    type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieTypeCreateFormOverridesProps = {
    MovieTypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MovieTypeCreateFormProps = React.PropsWithChildren<{
    overrides?: MovieTypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MovieTypeCreateFormInputValues) => MovieTypeCreateFormInputValues;
    onSuccess?: (fields: MovieTypeCreateFormInputValues) => void;
    onError?: (fields: MovieTypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieTypeCreateFormInputValues) => MovieTypeCreateFormInputValues;
    onValidate?: MovieTypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function MovieTypeCreateForm(props: MovieTypeCreateFormProps): React.ReactElement;
