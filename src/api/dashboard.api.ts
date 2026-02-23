import { httpClient } from "./httpClient";

export const getDashboardSummary = async () => {
  const { data } = await httpClient.get("/dashboardSummary.json");
  return data;
};

export const getDashboardCalendarData = async () => {
  const { data } = await httpClient.get("/data.json");
  return data;
};
