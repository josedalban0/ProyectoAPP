import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://proyectoec-248c3-default-rtdb.firebaseio.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products.json',
    }),
    getCategory: builder.query({
      query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoryQuery } = shopApi;