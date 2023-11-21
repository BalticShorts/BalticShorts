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
export declare type MovieTeamUpdateFormInputValues = {
    director?: string[];
    operator?: string[];
    scenario?: string[];
    editor?: string[];
    actors?: string[];
    costumes?: string[];
    makeup?: string[];
    executive_producer?: string[];
    producer?: string[];
    producer_org?: string[];
    PersonMovieTeams?: any[];
    Movie?: any;
};
export declare type MovieTeamUpdateFormValidationValues = {
    director?: ValidationFunction<string>;
    operator?: ValidationFunction<string>;
    scenario?: ValidationFunction<string>;
    editor?: ValidationFunction<string>;
    actors?: ValidationFunction<string>;
    costumes?: ValidationFunction<string>;
    makeup?: ValidationFunction<string>;
    executive_producer?: ValidationFunction<string>;
    producer?: ValidationFunction<string>;
    producer_org?: ValidationFunction<string>;
    PersonMovieTeams?: ValidationFunction<any>;
    Movie?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieTeamUpdateFormOverridesProps = {
    MovieTeamUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    director?: PrimitiveOverrideProps<TextFieldProps>;
    operator?: PrimitiveOverrideProps<TextFieldProps>;
    scenario?: PrimitiveOverrideProps<TextFieldProps>;
    editor?: PrimitiveOverrideProps<TextFieldProps>;
    actors?: PrimitiveOverrideProps<TextFieldProps>;
    costumes?: PrimitiveOverrideProps<TextFieldProps>;
    makeup?: PrimitiveOverrideProps<TextFieldProps>;
    executive_producer?: PrimitiveOverrideProps<TextFieldProps>;
    producer?: PrimitiveOverrideProps<TextFieldProps>;
    producer_org?: PrimitiveOverrideProps<TextFieldProps>;
    PersonMovieTeams?: PrimitiveOverrideProps<AutocompleteProps>;
    Movie?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MovieTeamUpdateFormProps = React.PropsWithChildren<{
    overrides?: MovieTeamUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    movieTeam?: any;
    onSubmit?: (fields: MovieTeamUpdateFormInputValues) => MovieTeamUpdateFormInputValues;
    onSuccess?: (fields: MovieTeamUpdateFormInputValues) => void;
    onError?: (fields: MovieTeamUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieTeamUpdateFormInputValues) => MovieTeamUpdateFormInputValues;
    onValidate?: MovieTeamUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MovieTeamUpdateForm(props: MovieTeamUpdateFormProps): React.ReactElement;
