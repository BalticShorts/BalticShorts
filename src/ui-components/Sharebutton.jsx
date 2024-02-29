/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Icon } from "@aws-amplify/ui-react";
export default function Sharebutton(props) {
  const { overrides, ...rest } = props;
  return (
    <Icon
      width="30px"
      height="30px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      viewBox={{ minX: 0, minY: 0, width: 30, height: 30 }}
      paths={[
        {
          d: "M29 15C29 22.732 22.732 29 15 29L15 31C23.8366 31 31 23.8366 31 15L29 15ZM15 29C7.26801 29 1 22.732 1 15L-1 15C-1 23.8366 6.16344 31 15 31L15 29ZM1 15C1 7.26801 7.26801 1 15 1L15 -1C6.16344 -1 -1 6.16344 -1 15L1 15ZM15 1C22.732 1 29 7.26801 29 15L31 15C31 6.16344 23.8366 -1 15 -1L15 1Z",
          stroke: "rgba(253,252,245,1)",
          fillRule: "nonzero",
          strokeWidth: 1,
          style: { transform: "translate(0%, 0%)" },
        },
        {
          d: "M17.7 4.31616L12.0217 0.132482C11.5617 -0.206909 10.9356 0.145289 10.9356 0.740823L10.9356 2.48474C5.79337 2.48474 1.44515 6.10917 0.0090739 11.0954C-0.0509292 11.3068 0.201084 11.4626 0.341091 11.3025C2.4252 8.95024 5.37535 7.48168 8.64952 7.48168L10.9356 7.48168L10.9356 9.10819C10.9356 9.70372 11.5637 10.0559 12.0217 9.71653L17.7 5.53285C18.1 5.23828 18.1 4.6086 17.7 4.31616Z",
          fill: "rgba(253,252,245,1)",
          fillRule: "nonzero",
          style: { transform: "translate(20%, 30%)" },
        },
      ]}
      {...getOverrideProps(overrides, "Sharebutton")}
      {...rest}
    ></Icon>
  );
}
