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
export declare type MovieTypeUpdateFormInputValues = {
    type?: string;
};
export declare type MovieTypeUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieTypeUpdateFormOverridesProps = {
    MovieTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MovieTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: MovieTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    movieType?: any;
    onSubmit?: (fields: MovieTypeUpdateFormInputValues) => MovieTypeUpdateFormInputValues;
    onSuccess?: (fields: MovieTypeUpdateFormInputValues) => void;
    onError?: (fields: MovieTypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieTypeUpdateFormInputValues) => MovieTypeUpdateFormInputValues;
    onValidate?: MovieTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MovieTypeUpdateForm(props: MovieTypeUpdateFormProps): React.ReactElement;
