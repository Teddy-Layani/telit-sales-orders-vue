import { client } from "./client";

export const getSalesOrders = async (params) => {
  const { data } = await client.get("SalesOrderSet", {
    params,
  });

  return data.d?.results;
};

export const getSalesOrder = async (id, params) => {
  const path = `SalesOrderSet('${id}')`;
  const { data } = await client.get(path, {
    params,
  });

  return data.d;
};
