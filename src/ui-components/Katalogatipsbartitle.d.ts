/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KatalogatipsbartitleOverridesProps = {
    Katalogatipsbartitle?: PrimitiveOverrideProps<ViewProps>;
    Filmas?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type KatalogatipsbartitleProps = React.PropsWithChildren<Partial<ViewProps> & {
    property1?: "Default" | "Variant2";
} & {
    overrides?: KatalogatipsbartitleOverridesProps | undefined | null;
}>;
export default function Katalogatipsbartitle(props: KatalogatipsbartitleProps): React.ReactElement;
