/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps } from "@aws-amplify/ui-react";
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
export declare type PersonMovieTeamUpdateFormInputValues = {
    MovieTeam?: any;
    Person?: any;
    Role?: any;
};
export declare type PersonMovieTeamUpdateFormValidationValues = {
    MovieTeam?: ValidationFunction<any>;
    Person?: ValidationFunction<any>;
    Role?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonMovieTeamUpdateFormOverridesProps = {
    PersonMovieTeamUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    MovieTeam?: PrimitiveOverrideProps<AutocompleteProps>;
    Person?: PrimitiveOverrideProps<AutocompleteProps>;
    Role?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PersonMovieTeamUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonMovieTeamUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    personMovieTeam?: any;
    onSubmit?: (fields: PersonMovieTeamUpdateFormInputValues) => PersonMovieTeamUpdateFormInputValues;
    onSuccess?: (fields: PersonMovieTeamUpdateFormInputValues) => void;
    onError?: (fields: PersonMovieTeamUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonMovieTeamUpdateFormInputValues) => PersonMovieTeamUpdateFormInputValues;
    onValidate?: PersonMovieTeamUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonMovieTeamUpdateForm(props: PersonMovieTeamUpdateFormProps): React.ReactElement;
