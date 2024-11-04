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
export declare type CountryCodeUpdateFormInputValues = {
    Country?: string;
    Code?: string;
};
export declare type CountryCodeUpdateFormValidationValues = {
    Country?: ValidationFunction<string>;
    Code?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CountryCodeUpdateFormOverridesProps = {
    CountryCodeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Country?: PrimitiveOverrideProps<TextFieldProps>;
    Code?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CountryCodeUpdateFormProps = React.PropsWithChildren<{
    overrides?: CountryCodeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    countryCode?: any;
    onSubmit?: (fields: CountryCodeUpdateFormInputValues) => CountryCodeUpdateFormInputValues;
    onSuccess?: (fields: CountryCodeUpdateFormInputValues) => void;
    onError?: (fields: CountryCodeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CountryCodeUpdateFormInputValues) => CountryCodeUpdateFormInputValues;
    onValidate?: CountryCodeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CountryCodeUpdateForm(props: CountryCodeUpdateFormProps): React.ReactElement;
