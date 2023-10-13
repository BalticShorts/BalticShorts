import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css'; // Import the CSS file

export const Footer = ({
  property1,
  className,
  groupClassName,
  divClassName,
  frameClassName,
  frameClassNameOverride,
}) => {
  const filePath = "./static/img/"
  return (
    <Container fluid className={`FOOTER ${property1} ${className}`}>
      <Row>
        <Col xs={6} className={`group ${groupClassName}`}>
          <img id='footer-logo'
            alt="Group"
            src={property1 === "variant-2" ? require(filePath+"group-45-1.png") : require(filePath+"group-45.png")}
          />
        </Col>
        <Col xs={6} className={`text-wrapper ${divClassName}`}>
          ©️ 2023
        </Col>
      </Row>
      <Row>
        <Col xs={6} className={`frame ${frameClassName}`}>
          <div className="div"><a className="link-text" href='/Info'>Par projektu</a></div>
          <div className="text-wrapper-2"><a className="link-text" href='/Catalogue'>Katalogs</a></div>
          <div className="text-wrapper-3"><a className="link-text" href='/Contact'>Kontakti</a></div>
        </Col>
        <Col xs={6} className={`frame-2 ${frameClassNameOverride}`}>
          <div className="text-wrapper-4"><a className="link-text" href='/Instagram'>Instagram</a></div>
          <div className="text-wrapper-5"><a className="link-text" href='/Facebook'>Facebook</a></div>
        </Col>
      </Row>
    </Container>
  );
};

Footer.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
