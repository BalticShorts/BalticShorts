/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AwardUpdateFormInputValues = {
    name?: string;
    year?: number;
    category?: string;
    comment?: string;
    movie?: any;
};
export declare type AwardUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    year?: ValidationFunction<number>;
    category?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
    movie?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AwardUpdateFormOverridesProps = {
    AwardUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
    movie?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type AwardUpdateFormProps = React.PropsWithChildren<{
    overrides?: AwardUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    award?: any;
    onSubmit?: (fields: AwardUpdateFormInputValues) => AwardUpdateFormInputValues;
    onSuccess?: (fields: AwardUpdateFormInputValues) => void;
    onError?: (fields: AwardUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AwardUpdateFormInputValues) => AwardUpdateFormInputValues;
    onValidate?: AwardUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AwardUpdateForm(props: AwardUpdateFormProps): React.ReactElement;
