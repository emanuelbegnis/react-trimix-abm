import React from "react";
import { Form } from "react-bootstrap";

const Datepicker = ({ fecha, setFecha }) => {
  const handleFecha = (e) => {
    setFecha(e.target.value);
  };

  return (
    <div>
      <Form.Group controlId="dob">
        <Form.Control
          type="date"
          name="fecha"
          value={fecha}
          onChange={handleFecha}
        />
      </Form.Group>
    </div>
  );
};
export default Datepicker;
