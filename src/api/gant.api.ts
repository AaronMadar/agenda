import { httpClient } from "./httpClient";

export const getShibutzimData = async (
  from: string,
  to: string,
  unitIds: string[],
  serviceTypes: string[] | null = null,
  resourceTypes: string[] | null = null,
) => {
  const { data } = await httpClient.get("/data.json", {
    params: {
      from,
      to,
      unitIds,
      serviceTypes,
      resourceTypes,
    },
  });
  return data;
};
