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
export declare type CountryListUpdateFormInputValues = {
    Country?: string;
};
export declare type CountryListUpdateFormValidationValues = {
    Country?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CountryListUpdateFormOverridesProps = {
    CountryListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Country?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CountryListUpdateFormProps = React.PropsWithChildren<{
    overrides?: CountryListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    countryList?: any;
    onSubmit?: (fields: CountryListUpdateFormInputValues) => CountryListUpdateFormInputValues;
    onSuccess?: (fields: CountryListUpdateFormInputValues) => void;
    onError?: (fields: CountryListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CountryListUpdateFormInputValues) => CountryListUpdateFormInputValues;
    onValidate?: CountryListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CountryListUpdateForm(props: CountryListUpdateFormProps): React.ReactElement;
