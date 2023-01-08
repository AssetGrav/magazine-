import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  console.log("device", device);
  return (
    <Row className="d-flex justify-content-start">
      {device.brands.map((brand) => (
        <Card
          key={brand.id}
          className="ms-3 text-center"
          style={{ width: "100px", cursor: "pointer" }}
          onClick={() => {
            brand.id !== device.selectedBrand.id
              ? device.setSelectedBrand(brand)
              : device.setSelectedBrand({});
          }}
          border={brand.id === device.selectedBrand.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
