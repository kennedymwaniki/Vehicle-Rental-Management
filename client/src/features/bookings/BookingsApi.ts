import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBooking } from "./../../types/types";

export const bookingsAPI = createApi({
  reducerPath: "bookingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-eg4t.onrender.com/api",
  }),
  tagTypes: ["getBookings", "getUserBookings"],

  endpoints: (builder) => ({
    getBookings: builder.query<TBooking[], void>({
      query: () => "bookings",
      providesTags: ["getBookings"],
    }),
    createBooking: builder.mutation<TBooking, Partial<TBooking>>({
      query: (newBooking) => ({
        url: "bookings",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["getBookings", "getUserBookings"],
    }),
    updateBooking: builder.mutation<TBooking, Partial<TBooking>>({
      query: ({ bookingId, ...rest }) => ({
        url: `bookings/${bookingId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["getBookings"],
    }),
    deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
      query: (bookingId) => ({
        url: `bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getBookings"],
    }),
  }),
});

export default bookingsAPI;
