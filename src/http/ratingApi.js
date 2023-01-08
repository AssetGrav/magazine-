import { $host } from "./index";

export const createRating = async (rate, userId, deviceId) => {
  const { data } = await $host.post("api/rating", { rate, userId, deviceId });
  return data;
};

export const getRating = async (deviceId) => {
  const { data } = await $host.get("api/rating", { deviceId });
  return data;
};
