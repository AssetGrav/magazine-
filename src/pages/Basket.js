import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "..";
import DeviceBasketList from "../components/DeviceBasketList";
import Select from "../components/Select";
import { fetchBasketDevices } from "../http/deviceApi";
import { SHOP_ROUTE } from "../utils/consts";

const Basket = observer(() => {
  const { device, user } = useContext(Context);
  const [delivery, setDelivery] = useState();
  useEffect(() => {
    fetchBasketDevices(user.user.id).then((data) => {
      device.setBasketDevices(data);
    });
  }, []);

  const handleChange = (e) => {
    setDelivery(Number(e.target.value));
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col size="12">
            <Card
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-0">
                <Row className="g-0">
                  <Col lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h2 tag="h1" className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </h2>
                        <h2 className="mb-0 text-muted">
                          {device.basketDevices.length +
                            (device.basketDevices.length < 2
                              ? " item"
                              : " items")}
                        </h2>
                      </div>

                      <hr className="my-4" />
                      <DeviceBasketList />

                      <div className="pt-5">
                        <h2 tag="h6" className="mb-0">
                          <Link tag="a" to={SHOP_ROUTE} className="text-body">
                            <p icon="long-arrow-alt-left me-2" /> Back to shop
                          </Link>
                        </h2>
                      </div>
                    </div>
                  </Col>
                  <Col lg="4" className="bg-grey">
                    <div className="p-5">
                      <h2 tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                        Summary
                      </h2>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h4 tag="h5" className="text-uppercase">
                          {(device.basketDevices.length < 2
                            ? "item "
                            : "items ") + device.basketDevices.length}
                        </h4>
                        <h4 tag="h5">$ {device.totalSum}</h4>
                      </div>

                      <h4 tag="h5" className="text-uppercase mb-3">
                        Shipping
                      </h4>

                      <Select onChange={handleChange} />

                      <h4 tag="h5" className="text-uppercase mb-3">
                        Give code
                      </h4>

                      <div className="mb-5">
                        <InputGroup size="lg" label="Enter your code" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h4 tag="h6" className="text-uppercase">
                          Total price
                        </h4>
                        <h4 tag="h6">
                          ${" "}
                          {delivery
                            ? device.totalSum +
                              delivery *
                                (device.basketDevices.length > 1
                                  ? device.basketDevices.length
                                  : 1)
                            : "select delivery"}
                        </h4>
                      </div>

                      <Button color="dark" size="lg">
                        Register
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default Basket;
