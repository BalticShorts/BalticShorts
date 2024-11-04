/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Image, View } from "@aws-amplify/ui-react";
export default function StillsGallery(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1100px"
      height="550px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "StillsGallery")}
      {...rest}
    >
      <Image
        width="1100px"
        height="550px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="1100px"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "HAOSS_BERZINS_1.15 1")}
      ></Image>
      <Image
        width="1100px"
        height="550px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="2200px"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "HAOSS_BERZINS_1.15 2")}
      ></Image>
      <Image
        width="1100px"
        height="550px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="3300px"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "HAOSS_BERZINS_1.15 3")}
      ></Image>
      <Image
        width="1100px"
        height="550px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="0px"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "HAOSS_BERZINS_1.15 4")}
      ></Image>
    </View>
  );
}
