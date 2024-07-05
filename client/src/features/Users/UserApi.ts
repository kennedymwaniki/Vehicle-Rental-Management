import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TUser {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: string;
}

export const usersAPI = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ['getUsers'],

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
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: rest,
        providesTags: ["updateUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),
    deleteUsers: builder.mutation<{ success: boolean; id: number }, number>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: rest,
        providesTags: ["deleteUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),
  }),
});


export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersAPI;