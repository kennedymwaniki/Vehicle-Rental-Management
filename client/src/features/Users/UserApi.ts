import {
  TAlluserRelations,
  TUser,
  TUserBookingsResponse,
  TUserTicketsResponse,
  UserResponseMsg,
} from "./../../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersAPI = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-eg4t.onrender.com/api/",
  }),
  tagTypes: ["getUsers", "getUserBookings"],

  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => "users",
      providesTags: ["getUsers"],
    }),
    getUserById: builder.query<TUser, void>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "GET",
        providesTags: ["getUserById"],
      }),
    }),
    createUsers: builder.mutation<{ msg: UserResponseMsg }, Partial<TUser>>({
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
    getUserBookingsById: builder.query<TUserBookingsResponse, void>({
      query: (userId) => ({
        url: `users/bookings/${userId}`,
        method: "GET",
      }),
      providesTags: ["getUserBookings"],
    }),
    getUserTcketsById: builder.query<TUserTicketsResponse, void>({
      query: (userId) => ({
        url: `users/tickets/${userId}`,
        method: "GET",
        providesTags: ["getUserTickets"],
      }),
    }),
    getAllUserRelations: builder.query<TAlluserRelations, void>({
      query: (userId) => ({
        url: `users/relations/${userId}`,
        method: "GET",
        providesTags: ["getAllUserRelations"],
      }),
    }),
  }),
});

export default usersAPI;
