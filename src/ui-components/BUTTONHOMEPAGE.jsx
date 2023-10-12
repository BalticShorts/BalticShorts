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
} from "@aws-amplify/ui-react/internal";
import { Text, View } from "@aws-amplify/ui-react";
export default function BUTTONHOMEPAGE(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        "Rectangle 57": {},
        TITLE: {},
        "Jaunas, senas, vislab\u0101k\u0101s un visslikt\u0101k\u0101s \u012Bsfilmas no visas Baltijas":
          {},
        BUTTONHOMEPAGE: {},
      },
      variantValues: { property1: "color", property2: "Default" },
    },
    {
      overrides: {
        "Rectangle 57": {},
        TITLE: {},
        "Jaunas, senas, vislab\u0101k\u0101s un visslikt\u0101k\u0101s \u012Bsfilmas no visas Baltijas":
          {},
        BUTTONHOMEPAGE: {},
      },
      variantValues: { property1: "just border", property2: "Default" },
    },
    {
      overrides: {
        "Rectangle 57": {},
        TITLE: {},
        "Jaunas, senas, vislab\u0101k\u0101s un visslikt\u0101k\u0101s \u012Bsfilmas no visas Baltijas":
          {},
        BUTTONHOMEPAGE: {},
      },
      variantValues: { property1: "foto", property2: "Default" },
    },
    {
      overrides: {
        "Rectangle 57": {
          border: "1px SOLID rgba(253,252,245,1)",
          backgroundColor: "rgba(0,0,0,1)",
        },
        TITLE: { color: "rgba(253,252,245,1)" },
        "Jaunas, senas, vislab\u0101k\u0101s un visslikt\u0101k\u0101s \u012Bsfilmas no visas Baltijas":
          { color: "rgba(253,252,245,1)" },
        BUTTONHOMEPAGE: {},
      },
      variantValues: { property1: "hover", property2: "Default" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="350px"
      height="360px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "BUTTONHOMEPAGE")}
      {...rest}
    >
      <View
        width="350px"
        height="360px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        border="1px SOLID rgba(0,0,0,1)"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,74,0,1)"
        {...getOverrideProps(overrides, "Rectangle 57")}
      ></View>
      <Text
        fontFamily="Arial"
        fontSize="20px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        textTransform="uppercase"
        lineHeight="22.998046875px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="0.85px"
        width="350px"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="43.33%"
        bottom="50.28%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="TITLE"
        {...getOverrideProps(overrides, "TITLE")}
      ></Text>
      <Text
        fontFamily="SchoolBook"
        fontSize="14px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="18.284000396728516px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="317.82px"
        height="17.93px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="88.61%"
        bottom="6.41%"
        left="4.57%"
        right="4.62%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Jaunas, senas, vislabākās un vissliktākās&#xA;īsfilmas no visas Baltijas"
        {...getOverrideProps(
          overrides,
          "Jaunas, senas, vislab\u0101k\u0101s un visslikt\u0101k\u0101s \u012Bsfilmas no visas Baltijas"
        )}
      ></Text>
    </View>
  );
}
