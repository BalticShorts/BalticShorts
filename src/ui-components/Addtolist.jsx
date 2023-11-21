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
export default function Addtolist(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: { "+ Add to list": {}, Addtolist: {} },
      variantValues: { property1: "Default" },
    },
    {
      overrides: {
        "+ Add to list": { color: "rgba(253,252,245,1)" },
        Addtolist: {},
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
      width="95px"
      height="21px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Addtolist")}
      {...rest}
    >
      <Text
        fontFamily="Arial"
        fontSize="16px"
        fontWeight="400"
        color="rgba(253,252,245,0.7)"
        lineHeight="18.3984375px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="0%"
        bottom="14.29%"
        left="5.26%"
        right="6.32%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="+ Add to list"
        {...getOverrideProps(overrides, "+ Add to list")}
      ></Text>
    </View>
  );
}
