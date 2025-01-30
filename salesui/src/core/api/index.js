import { client, shClient } from "./client";

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


export const createSalesOrder = async(payload) => {
  const {data} = await client.post('SalesOrderSet', payload);
  return data.d;
};

export const getCustomers = async(params) => {
    const {data} = await shClient.get('CustomerSet', {
      params
    });
    return data.d?.results;
};

export const getPlants = async(params) => {
  const {data} = await shClient.get('PlantSet', {
    params
  });
  return data.d?.results;
};

export const getMaterials = async(params) => {
  const {data} = await shClient.get('MaterialSet', {
    params
  });
  return data.d?.results;
};