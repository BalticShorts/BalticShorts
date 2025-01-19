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
export declare type CountryCodeCreateFormInputValues = {
    Country?: string;
    Code?: string;
};
export declare type CountryCodeCreateFormValidationValues = {
    Country?: ValidationFunction<string>;
    Code?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CountryCodeCreateFormOverridesProps = {
    CountryCodeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Country?: PrimitiveOverrideProps<TextFieldProps>;
    Code?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CountryCodeCreateFormProps = React.PropsWithChildren<{
    overrides?: CountryCodeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CountryCodeCreateFormInputValues) => CountryCodeCreateFormInputValues;
    onSuccess?: (fields: CountryCodeCreateFormInputValues) => void;
    onError?: (fields: CountryCodeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CountryCodeCreateFormInputValues) => CountryCodeCreateFormInputValues;
    onValidate?: CountryCodeCreateFormValidationValues;
} & React.CSSProperties>;
export default function CountryCodeCreateForm(props: CountryCodeCreateFormProps): React.ReactElement;
