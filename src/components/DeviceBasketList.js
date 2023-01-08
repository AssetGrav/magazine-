import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import DeviceBasketItem from "./DeviceBasketItem";

const DeviceBasketList = observer(() => {
  const { device } = useContext(Context);
  return (
    <>
      {device.basketDevices.map((basketDevice) => (
        <DeviceBasketItem
          key={basketDevice.date.id}
          basketDevice={basketDevice}
        />
      ))}
    </>
  );
});

export default DeviceBasketList;
