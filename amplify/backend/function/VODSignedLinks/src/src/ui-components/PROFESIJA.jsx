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
export default function PROFESIJA(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: { "GRIMA M\u0100KSLINIEKS": {}, PROFESIJA: {} },
      variantValues: { property1: "Default" },
    },
    {
      overrides: {
        "GRIMA M\u0100KSLINIEKS": { fontWeight: "700", right: "-2.54%" },
        PROFESIJA: {},
      },
      variantValues: { property1: "Variant2" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="118px"
      height="11px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "PROFESIJA")}
      {...rest}
    >
      <Text
        fontFamily="Arial"
        fontSize="10px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        textTransform="uppercase"
        lineHeight="11.4990234375px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="0.85px"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="GRIMA MĀKSLINIEKS"
        {...getOverrideProps(overrides, "GRIMA M\u0100KSLINIEKS")}
      ></Text>
    </View>
  );
}
