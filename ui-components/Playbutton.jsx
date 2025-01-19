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
import { Icon } from "@aws-amplify/ui-react";
export default function Playbutton(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    { overrides: { Playbutton: {} }, variantValues: { property1: "Default" } },
    {
      overrides: {
        Playbutton: {
          paths: [
            {
              d: "M50 0L51.7321 -1L50 -4L48.2679 -1L50 0ZM93.3013 75L93.3013 77L96.7654 77L95.0333 74L93.3013 75ZM6.69873 75L4.96668 74L3.23463 77L6.69873 77L6.69873 75ZM48.2679 1L91.5692 76L95.0333 74L51.7321 -1L48.2679 1ZM93.3013 73L6.69873 73L6.69873 77L93.3013 77L93.3013 73ZM8.43078 76L51.7321 1L48.2679 -1L4.96668 74L8.43078 76Z",
              stroke: "rgba(253,252,245,1)",
              fillRule: "nonzero",
              strokeWidth: 2,
              style: { transform: "translate(100%, 0%)" },
            },
            {
              d: "M50 0L93.3013 75L6.69873 75L50 0Z",
              fill: "rgba(253,252,245,1)",
              fillRule: "nonzero",
              style: { transform: "translate(100%, 0%)" },
            },
          ],
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        },
      },
      variantValues: { property1: "Variant2" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <Icon
      width="100px"
      height="100px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      viewBox={{ minX: 0, minY: 0, width: 100, height: 100 }}
      paths={[
        {
          d: "M50 0L51.7321 -1L50 -4L48.2679 -1L50 0ZM93.3013 75L93.3013 77L96.7654 77L95.0333 74L93.3013 75ZM6.69873 75L4.96668 74L3.23463 77L6.69873 77L6.69873 75ZM48.2679 1L91.5692 76L95.0333 74L51.7321 -1L48.2679 1ZM93.3013 73L6.69873 73L6.69873 77L93.3013 77L93.3013 73ZM8.43078 76L51.7321 1L48.2679 -1L4.96668 74L8.43078 76Z",
          stroke: "rgba(253,252,245,1)",
          fillRule: "nonzero",
          strokeWidth: 2,
          style: { transform: "translate(100%, 0%)" },
        },
      ]}
      {...getOverrideProps(overrides, "Playbutton")}
      {...rest}
    ></Icon>
  );
}
