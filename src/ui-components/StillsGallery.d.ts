/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ImageProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StillsGalleryOverridesProps = {
    StillsGallery?: PrimitiveOverrideProps<ViewProps>;
    "HAOSS_BERZINS_1.15 1"?: PrimitiveOverrideProps<ImageProps>;
    "HAOSS_BERZINS_1.15 2"?: PrimitiveOverrideProps<ImageProps>;
    "HAOSS_BERZINS_1.15 3"?: PrimitiveOverrideProps<ImageProps>;
    "HAOSS_BERZINS_1.15 4"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type StillsGalleryProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: StillsGalleryOverridesProps | undefined | null;
}>;
export default function StillsGallery(props: StillsGalleryProps): React.ReactElement;
