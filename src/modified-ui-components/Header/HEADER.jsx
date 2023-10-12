import PropTypes from "prop-types";
import React from "react";
import { LogoLongWaveAnim } from "./LogoLongWaveAnim";
import { MeklT } from "./MeklT";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ property1, className, signOut }) => {
  const navigate = useNavigate();

  return (
    <div className={`navbar ${property1} ${className}`}>
      {["default", "variant-2"].includes(property1) && <div className="baltic-shorts">BALTIC SHORTS</div>}

      {property1 === "variant-4" && <a className="text-wrapper" href={() => navigate('/profile')}>Mans profils</a>}

      <div className="overlap-group">
        {property1 === "variant-4" && <MeklT className="mekl-t-instance" group="image.png" property1="default" />}

        <div className="katalogs">
          {property1 === "variant-4" && <>Katalogs</>}

          {["default", "variant-2", "variant-3"].includes(property1) && <div className="sakums" onClick={() => navigate('/')}>Sākums</div>}
        </div>
        {["default", "variant-2", "variant-3"].includes(property1) && <div className="div">Meklēt</div>}
      </div>
      {property1 === "variant-4" && <LogoLongWaveAnim className="logo-long-wave-anim" />}

      {["default", "variant-2"].includes(property1) && (
        <div className="overlap">
          <div className="text-wrapper-2" onClick={() => navigate('/profile')}>Mans profils</div>
          <div className="EN-LV-LT-EE">
            {property1 === "default" && (
              <>
                <p className="span-wrapper">
                  <span className="span">EN | </span>
                </p>
                <p className="span-wrapper">
                  <span className="text-wrapper-3">LV</span>
                </p>
                <p className="span-wrapper">
                  <span className="span"> | LT | EE</span>
                </p>
              </>
            )}

            {property1 === "variant-2" && <p className="p">EN | LV | LT | EE</p>}
          </div>
        </div>
      )}

      {property1 === "variant-3" && (
        <>
          <div className="text-wrapper" onClick={() => navigate('/profile')}>Mans profils</div>
          <img className="group" alt="Group" src="group-10.png" />
        </>
      )}
      <div><button onClick={signOut}>Sign out</button></div>
    </div>
  );
};

Navbar.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
};
