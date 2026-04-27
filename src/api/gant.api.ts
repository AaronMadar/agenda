import { httpClient } from "./httpClient";
import type { ShibutzimRes } from "@/types/shibutzim.types";

export const getShibutzimData = async (
  from: string,
  to: string,
  unitIds: string[],
  serviceTypeIds: string[] | null = null,
  resourceTypeIds: string[] | null = null,
): Promise<ShibutzimRes> => {
  const { data } = await httpClient.get("/shibutzim", {
    params: {
      from,
      to,
      unitIds,
      serviceTypeIds,
      resourceTypeIds,
    },
  });
  return data;
};
