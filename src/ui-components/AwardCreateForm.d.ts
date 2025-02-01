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
export declare type AwardCreateFormInputValues = {
    name?: string;
    year?: number;
    category?: string;
    comment?: string;
};
export declare type AwardCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    year?: ValidationFunction<number>;
    category?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AwardCreateFormOverridesProps = {
    AwardCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AwardCreateFormProps = React.PropsWithChildren<{
    overrides?: AwardCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AwardCreateFormInputValues) => AwardCreateFormInputValues;
    onSuccess?: (fields: AwardCreateFormInputValues) => void;
    onError?: (fields: AwardCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AwardCreateFormInputValues) => AwardCreateFormInputValues;
    onValidate?: AwardCreateFormValidationValues;
} & React.CSSProperties>;
export default function AwardCreateForm(props: AwardCreateFormProps): React.ReactElement;
