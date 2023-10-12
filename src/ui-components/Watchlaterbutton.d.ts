/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WatchlaterbuttonOverridesProps = {
    Watchlaterbutton?: PrimitiveOverrideProps<ViewProps>;
    "Ellipse 4"?: PrimitiveOverrideProps<IconProps>;
    "Group 15"?: PrimitiveOverrideProps<ViewProps>;
    "Vector 4"?: PrimitiveOverrideProps<IconProps>;
    "Vector 5"?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type WatchlaterbuttonProps = React.PropsWithChildren<Partial<ViewProps> & {
    property1?: "Default" | "Variant2";
} & {
    overrides?: WatchlaterbuttonOverridesProps | undefined | null;
}>;
export default function Watchlaterbutton(props: WatchlaterbuttonProps): React.ReactElement;
