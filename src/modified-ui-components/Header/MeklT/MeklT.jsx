/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const MeklT = ({ property1, className }) => {
  return (
    <div className={`mekl-t ${className}`}>
      <div className="aizv-rt">
        {property1 === "variant-2" && <>Aizvērt</>}

        {property1 === "default" && <>Meklēt</>}
      </div>
      {property1 === "default" && (
        <div className="group">
          <div className="overlap-group">
            <img className="img" alt="Group" src="/img/group-16-2.png" />
            <div className="ellipse" />
          </div>
        </div>
      )}

      {property1 === "variant-2" && <img className="group-2" alt="Group" src="/img/group-15.png" />}
    </div>
  );
};

MeklT.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
