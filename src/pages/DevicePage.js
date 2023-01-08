import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { addToBasket, fetchDevice, fetchOneDevice } from "../http/deviceApi";
import jwt_decode from "jwt-decode";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Rating from "../components/Rating";

const DevicePage = observer(() => {
  const [oneDevice, setOneDevice] = useState({ info: [] });
  const { device } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setOneDevice(data), device.setRate(id));
  }, [id]);
  const handleChange = () => {
    try {
      const token = localStorage.getItem("token");
      const jwtDecode = jwt_decode(token);
      const findDevice = device.basketDevices.find((elem) => {
        return elem.date.id === Number(id);
      });
      if (findDevice === undefined) {
        addToBasket(id, jwtDecode.id, 1).then((data) => {
          history.push(SHOP_ROUTE);
        });
        device.setBasketDevice({ date: oneDevice, quantity: 1 });
      }
      history.push(SHOP_ROUTE);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchDevice(null, null, 1, 3).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={
              oneDevice.img === undefined
                ? ""
                : process.env.REACT_APP_API_URL + oneDevice.img
            }
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-item-center">
            <h2>{oneDevice.name}</h2>
            <Rating id={id} />
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>от: {oneDevice.price} тенге</h3>
            <Button variant={"outline-dark"} onClick={() => handleChange(id)}>
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {oneDevice.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;
