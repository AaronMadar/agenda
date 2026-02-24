import { httpClient } from "./httpClient";

export const getShibutzimData = async () => {
  const { data } = await httpClient.get("/data.json");
  return data;
};
