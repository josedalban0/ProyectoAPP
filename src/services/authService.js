import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = "AIzaSyBgdz5zQn39834W3xIa3fkZxF86ARscVMA";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://identitytoolkit.googleapis.com/v1/' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `accounts:signUp?key=${API_KEY}`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `accounts:signInWithPassword?key=${API_KEY}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;