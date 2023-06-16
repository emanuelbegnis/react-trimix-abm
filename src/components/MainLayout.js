import React from "react";
import { Container } from "react-bootstrap";

const MainLayout = ({ children, ...props }) => {
  return (
    <>
      <Container className="p-1 mb-3" {...props}>
        {children}
      </Container>
    </>
  );
};

export default MainLayout;
