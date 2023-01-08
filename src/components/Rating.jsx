import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Star } from "react-bootstrap-icons";
import { Context } from "..";
import { createRating } from "../http/ratingApi";

const Rating = observer(({ id }) => {
  const { user, device } = useContext(Context);
  const [size, setSize] = useState(32);
  const arrRates = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  const changeColorCreateRating = (e) => {
    console.log("target", e.target, user.user.id, id);
    try {
      if (e.target.id !== "") {
        createRating(e.target.id, user.user.id, id).then((data) => {
          if (data.type === "new") {
            device.updateRating(id, e.target.id);
            device.setRate(id);
          }
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  console.log("rating1", device.rate);
  const changeStarSize = () => {
    if (size === 32) {
      setSize(36);
    } else {
      setSize(32);
    }
  };
  return (
    <Row>
      {arrRates.map((elem) => (
        <Col key={elem.id}>
          <button
            className="border-0 bg-white"
            onClick={changeColorCreateRating}
            cursor="pointer"
          >
            {elem.id > device.rate ? (
              <Star
                size={size}
                className="m-0"
                id={elem.id}
                onMouseOver={changeStarSize}
                onMouseOut={changeStarSize}
              />
            ) : (
              <Star
                size={size}
                color="#D3EB4B"
                id={elem.id}
                onMouseOver={changeStarSize}
                onMouseOut={changeStarSize}
              />
            )}
          </button>
        </Col>
      ))}
    </Row>
  );
});

export default Rating;
