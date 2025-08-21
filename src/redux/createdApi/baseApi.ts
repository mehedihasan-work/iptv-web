import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../../constants/sharedUrls";

const dynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const baseUrl = backendUrl;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
