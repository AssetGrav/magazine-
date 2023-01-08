import React from "react";
import { Form } from "react-bootstrap";

const Select = ({ onChange }) => {
  return (
    <div className="mb-4 pb-2">
      <Form.Select
        aria-label="Default select example"
        className="p-2 rounded"
        style={{ width: "100%" }}
        bg="grey"
        onChange={onChange}
      >
        <option>Open this select menu</option>
        <option value="5">Standard-Delivery- €4.00</option>
        <option value="10">Fast-Delivery- €10.00</option>
        <option value="25">World-Delivery- €25.00</option>
      </Form.Select>
    </div>
  );
};

export default Select;
