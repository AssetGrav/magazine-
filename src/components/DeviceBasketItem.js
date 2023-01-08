import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { CardImg, Col, Form, Row } from "react-bootstrap";
import { Context } from "..";
import { updateBasketDevice } from "../http/deviceApi";

const DeviceBasketItem = observer(({ basketDevice }) => {
  const { user, device } = useContext(Context);
  const handleChange = (e) => {
    device.updateBasket({ ...basketDevice, quantity: e.target.value });
    updateBasketDevice(
      String(basketDevice.date.id),
      String(user.userBasket.id),
      e.target.value
    );
    device.setTotalSum();
  };
  useEffect(() => {
    device.setTotalSum();
  }, []);

  return (
    <>
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col md="2" lg="2" xl="2">
          <CardImg
            src={process.env.REACT_APP_API_URL + basketDevice.date.img}
            className="h-25 w-50"
            alt="Cotton T-shirt"
          />
        </Col>
        <Col md="3" lg="3" xl="3">
          <h4 tag="h6" className="text-base">
            {basketDevice.date.name}
          </h4>
        </Col>
        <Col md="2" lg="2" xl="2" className="d-flex align-items-center">
          <Form>
            <Form.Group className="mb-3" controlId="Form.ControlInput1">
              <Form.Label id="basic-addon1" className="ps-3">
                quantity
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                defaultValue={
                  !basketDevice.quantity ? 1 : basketDevice.quantity
                }
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md="3" lg="2" xl="2" className="text-end">
          <h5 tag="h6" className="mb-0">
            {!basketDevice.quantity
              ? 1 * basketDevice.date.price
              : basketDevice.quantity * basketDevice.date.price}
          </h5>
        </Col>
        <Col md="1" lg="1" xl="1" className="text-end">
          <h5>тг</h5>
        </Col>
      </Row>
      <hr className="my-4" />
    </>
  );
});

export default DeviceBasketItem;
