import client from "../utils/network/client";

/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
// import { QueryCache } from 'react-query'

// export const queryCache = new QueryCache({
//   onError: error => {
//     console.log(error)
//   }
// })
export const postAPI = async (route: string, body: any) => {
  try {
    const res = await client.post(route, body);
    return res.data;
  } catch (e) {
    throw e;
  }
};
export const patchAPI = async (route: string, body?: any) => {
  try {
    const res = await client.patch(route, body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteAPI = async (route: string, body?: any) => {
  try {
    const res = await client.delete(route, body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getAPI = async <E>(route: string) => {
  try {
    return await client.get(route) as E;
  } catch (e) {
    throw e;
  }
};
