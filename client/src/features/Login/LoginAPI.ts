import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";

export interface logInUser {
  email: string;
  password: string;
}

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/auth" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, logInUser>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export default loginAPI;
