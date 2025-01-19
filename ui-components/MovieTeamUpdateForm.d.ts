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
    MovieName?: string;
    PersonMovieTeams?: any[];
    Movie?: any;
};
export declare type MovieTeamUpdateFormValidationValues = {
    MovieName?: ValidationFunction<string>;
    PersonMovieTeams?: ValidationFunction<any>;
    Movie?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieTeamUpdateFormOverridesProps = {
    MovieTeamUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    MovieName?: PrimitiveOverrideProps<TextFieldProps>;
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
