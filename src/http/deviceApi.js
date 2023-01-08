import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevice = async (typeId, brandId, page, limit) => {
  const { data } = await $host.get("api/device", {
    params: { typeId, brandId, page, limit },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const addToBasket = async (deviceId, userId, quantity) => {
  const { data } = await $host.post("api/basket", {
    deviceId,
    userId,
    quantity,
  });
  return data;
};

export const fetchBasketDevices = async (userId) => {
  const { data } = await $host.get("api/basket/" + userId);
  return data;
};

export const updateBasketDevice = async (deviceId, basketId, quantity) => {
  const { data } = await $host.put("api/basket", {
    deviceId,
    basketId,
    quantity,
  });
  return data;
};
