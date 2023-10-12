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
import { Icon } from "@aws-amplify/ui-react";
export default function Arrow(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        Arrow: {
          paths: [
            {
              d: "M17.5 13.5L16.8892 14.2918L17.5 14.763L18.1108 14.2918L17.5 13.5ZM-0.610803 0.791782L16.8892 14.2918L18.1108 12.7082L0.610803 -0.791782L-0.610803 0.791782ZM18.1108 14.2918L35.6108 0.791782L34.3892 -0.791782L16.8892 12.7082L18.1108 14.2918Z",
              stroke: "rgba(253,252,245,0.49)",
              fillRule: "nonzero",
              strokeWidth: 2,
              style: { transform: "translate(0%, 0%)" },
            },
          ],
        },
      },
      variantValues: { property1: "Default" },
    },
    {
      overrides: {
        Arrow: {
          paths: [
            {
              d: "M17.5 13.5L16.8892 14.2918L17.5 14.763L18.1108 14.2918L17.5 13.5ZM-0.610803 0.791782L16.8892 14.2918L18.1108 12.7082L0.610803 -0.791782L-0.610803 0.791782ZM18.1108 14.2918L35.6108 0.791782L34.3892 -0.791782L16.8892 12.7082L18.1108 14.2918Z",
              stroke: "rgba(253,252,245,1)",
              fillRule: "nonzero",
              strokeWidth: 2,
              style: { transform: "translate(0%, 0%)" },
            },
          ],
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
      width="35px"
      height="13.5px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      viewBox={{ minX: 0, minY: 0, width: 35, height: 13 }}
      paths={[
        {
          d: "M17.5 13.5L16.8892 14.2918L17.5 14.763L18.1108 14.2918L17.5 13.5ZM-0.610803 0.791782L16.8892 14.2918L18.1108 12.7082L0.610803 -0.791782L-0.610803 0.791782ZM18.1108 14.2918L35.6108 0.791782L34.3892 -0.791782L16.8892 12.7082L18.1108 14.2918Z",
          stroke: "rgba(253,252,245,0.7)",
          fillRule: "nonzero",
          strokeWidth: 2,
          style: { transform: "translate(0%, 0%)" },
        },
      ]}
      {...getOverrideProps(overrides, "Arrow")}
      {...rest}
    ></Icon>
  );
}
