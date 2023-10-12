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
export default function Component1(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        "Vector 2": {
          paths: [
            {
              d: "M-1 5.69043e-17C-1 62.3914 -1.00648 128.031 11.53 178.068C17.8006 203.096 27.2328 224.327 41.4624 239.31C55.7238 254.327 74.7409 263 100 263L100 261C75.2591 261 56.7762 252.531 42.9126 237.933C29.0172 223.302 19.6994 202.445 13.47 177.582C1.00648 127.836 1 62.4748 1 -5.69043e-17L-1 5.69043e-17Z",
              stroke: "rgba(253,252,245,0.49)",
              fillRule: "nonzero",
              strokeWidth: 2,
            },
          ],
        },
        "Vector 3": {
          paths: [
            {
              d: "M-1 5.69043e-17C-1 62.3914 -1.00648 128.031 11.53 178.068C17.8006 203.096 27.2328 224.327 41.4624 239.31C55.7238 254.327 74.7409 263 100 263L100 261C75.2591 261 56.7762 252.531 42.9126 237.933C29.0172 223.302 19.6994 202.445 13.47 177.582C1.00648 127.836 1 62.4748 1 -5.69043e-17L-1 5.69043e-17Z",
              stroke: "rgba(253,252,245,0.49)",
              fillRule: "nonzero",
              strokeWidth: 2,
            },
          ],
        },
        "Group 11": {},
        Component1: {},
      },
      variantValues: { property1: "Default" },
    },
    {
      overrides: {
        "Vector 2": {
          paths: [
            {
              d: "M-1 5.69043e-17C-1 62.3914 -1.00648 128.031 11.53 178.068C17.8006 203.096 27.2328 224.327 41.4624 239.31C55.7238 254.327 74.7409 263 100 263L100 261C75.2591 261 56.7762 252.531 42.9126 237.933C29.0172 223.302 19.6994 202.445 13.47 177.582C1.00648 127.836 1 62.4748 1 -5.69043e-17L-1 5.69043e-17Z",
              stroke: "rgba(253,252,245,1)",
              fillRule: "nonzero",
              strokeWidth: 2,
            },
          ],
        },
        "Vector 3": {
          paths: [
            {
              d: "M-1 5.69043e-17C-1 62.3914 -1.00648 128.031 11.53 178.068C17.8006 203.096 27.2328 224.327 41.4624 239.31C55.7238 254.327 74.7409 263 100 263L100 261C75.2591 261 56.7762 252.531 42.9126 237.933C29.0172 223.302 19.6994 202.445 13.47 177.582C1.00648 127.836 1 62.4748 1 -5.69043e-17L-1 5.69043e-17Z",
              stroke: "rgba(253,252,245,1)",
              fillRule: "nonzero",
              strokeWidth: 2,
            },
          ],
        },
        "Group 11": {},
        Component1: {},
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
      width="100px"
      height="524px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Component1")}
      {...rest}
    >
      <View
        padding="0px 0px 0px 0px"
        width="100px"
        height="524px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="0px"
        {...getOverrideProps(overrides, "Group 11")}
      >
        <Icon
          width="100px"
          height="262px"
          viewBox={{ minX: 0, minY: 0, width: 100, height: 262 }}
          paths={[
            {
              d: "M-1 5.69043e-17C-1 62.3914 -1.00648 128.031 11.53 178.068C17.8006 203.096 27.2328 224.327 41.4624 239.31C55.7238 254.327 74.7409 263 100 263L100 261C75.2591 261 56.7762 252.531 42.9126 237.933C29.0172 223.302 19.6994 202.445 13.47 177.582C1.00648 127.836 1 62.4748 1 -5.69043e-17L-1 5.69043e-17Z",
              stroke: "rgba(253,252,245,0.7)",
              fillRule: "nonzero",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0%"
          bottom="50%"
          left="0%"
          right="0%"
          {...getOverrideProps(overrides, "Vector 2")}
        ></Icon>
        <Icon
          width="100px"
          height="262px"
          viewBox={{ minX: 0, minY: 0, width: 100, height: 262 }}
          paths={[
            {
              d: "M-1 5.69043e-17C-1 62.3914 -1.00648 128.031 11.53 178.068C17.8006 203.096 27.2328 224.327 41.4624 239.31C55.7238 254.327 74.7409 263 100 263L100 261C75.2591 261 56.7762 252.531 42.9126 237.933C29.0172 223.302 19.6994 202.445 13.47 177.582C1.00648 127.836 1 62.4748 1 -5.69043e-17L-1 5.69043e-17Z",
              stroke: "rgba(253,252,245,0.7)",
              fillRule: "nonzero",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="100%"
          bottom="-50%"
          left="0%"
          right="0%"
          {...getOverrideProps(overrides, "Vector 3")}
        ></Icon>
      </View>
    </View>
  );
}
