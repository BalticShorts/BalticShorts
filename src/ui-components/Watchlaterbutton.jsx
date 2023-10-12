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
import { Icon, View } from "@aws-amplify/ui-react";
export default function Watchlaterbutton(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        "Ellipse 4": {},
        "Vector 4": {},
        "Vector 5": {},
        "Group 15": {},
        Watchlaterbutton: {},
      },
      variantValues: { property1: "Default" },
    },
    {
      overrides: {
        "Ellipse 4": {
          paths: [
            {
              d: "M29 15C29 22.732 22.732 29 15 29L15 31C23.8366 31 31 23.8366 31 15L29 15ZM15 29C7.26801 29 1 22.732 1 15L-1 15C-1 23.8366 6.16344 31 15 31L15 29ZM1 15C1 7.26801 7.26801 1 15 1L15 -1C6.16344 -1 -1 6.16344 -1 15L1 15ZM15 1C22.732 1 29 7.26801 29 15L31 15C31 6.16344 23.8366 -1 15 -1L15 1Z",
              stroke: "rgba(0,0,0,1)",
              fillRule: "nonzero",
              strokeWidth: 1,
            },
            {
              d: "M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z",
              fill: "rgba(253,252,245,1)",
              fillRule: "nonzero",
            },
          ],
        },
        "Vector 4": {
          paths: [
            {
              d: "M-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553ZM-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553Z",
              stroke: "rgba(0,0,0,1)",
              fillRule: "nonzero",
              strokeWidth: 1,
            },
          ],
        },
        "Vector 5": {
          paths: [
            {
              d: "M-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553ZM-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553Z",
              stroke: "rgba(0,0,0,1)",
              fillRule: "nonzero",
              strokeWidth: 1,
            },
          ],
        },
        "Group 15": {},
        Watchlaterbutton: {},
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
      width="30px"
      height="30px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Watchlaterbutton")}
      {...rest}
    >
      <Icon
        width="30px"
        height="30px"
        viewBox={{ minX: 0, minY: 0, width: 30, height: 30 }}
        paths={[
          {
            d: "M29 15C29 22.732 22.732 29 15 29L15 31C23.8366 31 31 23.8366 31 15L29 15ZM15 29C7.26801 29 1 22.732 1 15L-1 15C-1 23.8366 6.16344 31 15 31L15 29ZM1 15C1 7.26801 7.26801 1 15 1L15 -1C6.16344 -1 -1 6.16344 -1 15L1 15ZM15 1C22.732 1 29 7.26801 29 15L31 15C31 6.16344 23.8366 -1 15 -1L15 1Z",
            stroke: "rgba(253,252,245,1)",
            fillRule: "nonzero",
            strokeWidth: 1,
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        {...getOverrideProps(overrides, "Ellipse 4")}
      ></Icon>
      <View
        padding="0px 0px 0px 0px"
        width="11px"
        height="11px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="23.33%"
        bottom="40%"
        left="50%"
        right="13.33%"
        transformOrigin="top left"
        transform="rotate(45deg)"
        {...getOverrideProps(overrides, "Group 15")}
      >
        <Icon
          width="11px"
          height="11px"
          viewBox={{
            minX: 0,
            minY: 0,
            width: 15.55615234375,
            height: 15.55615234375,
          }}
          paths={[
            {
              d: "M-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553ZM-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553Z",
              stroke: "rgba(253,252,245,1)",
              fillRule: "nonzero",
              strokeWidth: 1,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0%"
          bottom="0%"
          left="0%"
          right="0%"
          {...getOverrideProps(overrides, "Vector 4")}
        ></Icon>
        <Icon
          width="11px"
          height="11px"
          viewBox={{
            minX: 0,
            minY: 0,
            width: 15.55615234375,
            height: 15.55615234375,
          }}
          paths={[
            {
              d: "M-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553ZM-0.353553 0.353553L10.6462 11.3533L11.3533 10.6462L0.353553 -0.353553L-0.353553 0.353553Z",
              stroke: "rgba(253,252,245,1)",
              fillRule: "nonzero",
              strokeWidth: 1,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0%"
          bottom="0%"
          left="100%"
          right="-99.99%"
          transformOrigin="top left"
          transform="rotate(90deg)"
          {...getOverrideProps(overrides, "Vector 5")}
        ></Icon>
      </View>
    </View>
  );
}
