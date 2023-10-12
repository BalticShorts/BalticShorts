/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ViewProps } from "@aws-amplify/ui-react";
import { KatalogatipsbartitleProps } from "./Katalogatipsbartitle";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KatalogatipsbarOverridesProps = {
    Katalogatipsbar?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<ViewProps>;
    "Group 44"?: PrimitiveOverrideProps<ViewProps>;
    "Kataloga tips bar title305967"?: KatalogatipsbartitleProps;
    "Kataloga tips bar title305994"?: KatalogatipsbartitleProps;
    "Kataloga tips bar title3051118"?: KatalogatipsbartitleProps;
} & EscapeHatchProps;
export declare type KatalogatipsbarProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: KatalogatipsbarOverridesProps | undefined | null;
}>;
export default function Katalogatipsbar(props: KatalogatipsbarProps): React.ReactElement;
