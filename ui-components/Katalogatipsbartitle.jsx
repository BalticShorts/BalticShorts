/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function Katalogatipsbartitle(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: { Filmas: {}, Katalogatipsbartitle: {} },
      variantValues: { property1: "Default" },
    },
    {
      overrides: { Filmas: { fontWeight: "700" }, Katalogatipsbartitle: {} },
      variantValues: { property1: "Variant2" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="54px"
      height="19.79px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Katalogatipsbartitle")}
      {...rest}
    >
      <Text
        fontFamily="SchoolBook"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="20.895999908447266px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="0.17px"
        width="54px"
        height="19.79px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Filmas"
        {...getOverrideProps(overrides, "Filmas")}
      ></Text>
    </View>
  );
}
