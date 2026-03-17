import { httpClient } from "./httpClient";

export const getShibutzimData = async (
  from: string | null,
  to: string | null,
  unitIds: string[] | null = null,
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
