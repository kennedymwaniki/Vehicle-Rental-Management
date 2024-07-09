import { TUser } from "./../../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersAPI = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-eg4t.onrender.com/api/",
  }),
  tagTypes: ["getUsers"],

  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => "users",
      providesTags: ["getUsers"],
    }),
    createUsers: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
        providesTags: ["createUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),
    updateUser: builder.mutation<TUser, Partial<TUser>>({
      query: ({ userId, ...rest }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: rest,
        providesTags: ["updateUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),
    deleteUsers: builder.mutation<{ success: boolean; userId: number }, number>(
      {
        query: (userId) => ({
          url: `users/${userId}`,
          method: "DELETE",
          providesTags: ["deleteUser"],
        }),
        invalidatesTags: ["getUsers"],
      }
    ),
  }),
});

export default usersAPI;
