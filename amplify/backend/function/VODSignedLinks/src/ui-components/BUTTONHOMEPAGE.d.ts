/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BUTTONHOMEPAGEOverridesProps = {
    BUTTONHOMEPAGE?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 57"?: PrimitiveOverrideProps<ViewProps>;
    TITLE?: PrimitiveOverrideProps<TextProps>;
    "Jaunas, senas, vislab\u0101k\u0101s un visslikt\u0101k\u0101s \u012Bsfilmas no visas Baltijas"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type BUTTONHOMEPAGEProps = React.PropsWithChildren<Partial<ViewProps> & {
    property1?: "color" | "foto" | "hover" | "just border";
    property2?: "Default";
} & {
    overrides?: BUTTONHOMEPAGEOverridesProps | undefined | null;
}>;
export default function BUTTONHOMEPAGE(props: BUTTONHOMEPAGEProps): React.ReactElement;
