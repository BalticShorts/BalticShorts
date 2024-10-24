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
export declare type WaitlistEmailCreateFormInputValues = {
    email?: string;
};
export declare type WaitlistEmailCreateFormValidationValues = {
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WaitlistEmailCreateFormOverridesProps = {
    WaitlistEmailCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WaitlistEmailCreateFormProps = React.PropsWithChildren<{
    overrides?: WaitlistEmailCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WaitlistEmailCreateFormInputValues) => WaitlistEmailCreateFormInputValues;
    onSuccess?: (fields: WaitlistEmailCreateFormInputValues) => void;
    onError?: (fields: WaitlistEmailCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WaitlistEmailCreateFormInputValues) => WaitlistEmailCreateFormInputValues;
    onValidate?: WaitlistEmailCreateFormValidationValues;
} & React.CSSProperties>;
export default function WaitlistEmailCreateForm(props: WaitlistEmailCreateFormProps): React.ReactElement;
