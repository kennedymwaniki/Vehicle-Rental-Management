import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBooking } from "./../../types/types";

// interface TBooking {
//   bookingId: number;
//   userId: number;
//   vehicleId: number;
//   locationId: number;
//   bookingDate: string;
//   returnDate: string;
//   totalAmount: number;
//   bookingStatus: "Pending" | "Completed" | "Failed";
//   createdAt: string;
//   updatedAt: string;
// }

export const bookingsAPI = createApi({
  reducerPath: "bookingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["getBookings"],

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
      invalidatesTags: ["getBookings"],
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

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsAPI;
