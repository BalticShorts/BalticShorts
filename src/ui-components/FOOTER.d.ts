/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FOOTEROverridesProps = {
    FOOTER?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<ViewProps>;
    "Group 45"?: PrimitiveOverrideProps<ViewProps>;
    Group?: PrimitiveOverrideProps<ViewProps>;
    Vector3202328?: PrimitiveOverrideProps<IconProps>;
    Vector3202329?: PrimitiveOverrideProps<IconProps>;
    Vector3202330?: PrimitiveOverrideProps<IconProps>;
    Vector3202331?: PrimitiveOverrideProps<IconProps>;
    Vector3202332?: PrimitiveOverrideProps<IconProps>;
    Vector3202333?: PrimitiveOverrideProps<IconProps>;
    Vector3202334?: PrimitiveOverrideProps<IconProps>;
    Vector3202335?: PrimitiveOverrideProps<IconProps>;
    Vector3202336?: PrimitiveOverrideProps<IconProps>;
    Vector3202337?: PrimitiveOverrideProps<IconProps>;
    Vector3202338?: PrimitiveOverrideProps<IconProps>;
    Vector3202339?: PrimitiveOverrideProps<IconProps>;
    Vector3202340?: PrimitiveOverrideProps<IconProps>;
    "\u00A9\uFE0F 2023"?: PrimitiveOverrideProps<TextProps>;
    "Frame 18"?: PrimitiveOverrideProps<FlexProps>;
    "Par projektu"?: PrimitiveOverrideProps<TextProps>;
    Katalogs?: PrimitiveOverrideProps<TextProps>;
    Kontakti?: PrimitiveOverrideProps<TextProps>;
    "Frame 19"?: PrimitiveOverrideProps<FlexProps>;
    Instagram?: PrimitiveOverrideProps<TextProps>;
    Facebook?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type FOOTERProps = React.PropsWithChildren<Partial<ViewProps> & {
    property1?: "Default" | "Variant2";
} & {
    overrides?: FOOTEROverridesProps | undefined | null;
}>;
export default function FOOTER(props: FOOTERProps): React.ReactElement;
