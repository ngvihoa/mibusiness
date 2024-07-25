import React from "react";
import { Container } from "react-bootstrap";

interface GeneralLayoutProps {
  name: string;
  children: React.ReactNode;
  classContainer: string;
  fluid?: boolean;
}

const GeneralLayout = ({
  name,
  children,
  classContainer,
  fluid = false,
}: GeneralLayoutProps) => {
  return (
    <Container
      className={`${classContainer} general-layout-container mt-20`}
      fluid={fluid}
    >
      <div className="layout-header">
        <h3>{name}</h3>
      </div>
      {children}
    </Container>
  );
};

export default GeneralLayout;
