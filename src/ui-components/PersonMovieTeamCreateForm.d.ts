/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PersonMovieTeamCreateFormInputValues = {
    MovieTeam?: any;
    Person?: any;
    Role?: any;
};
export declare type PersonMovieTeamCreateFormValidationValues = {
    MovieTeam?: ValidationFunction<any>;
    Person?: ValidationFunction<any>;
    Role?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonMovieTeamCreateFormOverridesProps = {
    PersonMovieTeamCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    MovieTeam?: PrimitiveOverrideProps<AutocompleteProps>;
    Person?: PrimitiveOverrideProps<AutocompleteProps>;
    Role?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PersonMovieTeamCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonMovieTeamCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonMovieTeamCreateFormInputValues) => PersonMovieTeamCreateFormInputValues;
    onSuccess?: (fields: PersonMovieTeamCreateFormInputValues) => void;
    onError?: (fields: PersonMovieTeamCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonMovieTeamCreateFormInputValues) => PersonMovieTeamCreateFormInputValues;
    onValidate?: PersonMovieTeamCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonMovieTeamCreateForm(props: PersonMovieTeamCreateFormProps): React.ReactElement;
