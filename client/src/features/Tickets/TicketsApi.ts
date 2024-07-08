import { TTicket } from "./../../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketsAPI = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-eg4t.onrender.com/api",
  }),
  tagTypes: ["Ticket"],
  endpoints: (builder) => ({
    getTickets: builder.query<TTicket[], void>({
      query: () => "support-tickets",
      providesTags: ["Ticket"],
    }),
    createTicket: builder.mutation<TTicket, Partial<TTicket>>({
      query: (newTicket) => ({
        url: "support-tickets",
        method: "POST",
        body: newTicket,
      }),
      invalidatesTags: ["Ticket"],
    }),
    updateTicket: builder.mutation<TTicket, Partial<TTicket>>({
      query: ({ ticketId, ...rest }) => ({
        url: `support-tickets/${ticketId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Ticket"],
    }),
    deleteTicket: builder.mutation<{ success: boolean; id: number }, number>({
      query: (ticketId) => ({
        url: `support-tickets/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ticket"],
    }),
  }),
}); // Cast the API to our defined interface

// Export the hooks
export default ticketsAPI;
