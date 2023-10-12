/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArrowOverridesProps = {
    Arrow?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type ArrowProps = React.PropsWithChildren<Partial<IconProps> & {
    property1?: "Default" | "Variant2";
} & {
    overrides?: ArrowOverridesProps | undefined | null;
}>;
export default function Arrow(props: ArrowProps): React.ReactElement;
