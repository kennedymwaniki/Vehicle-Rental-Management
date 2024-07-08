import { TTicket } from "./../../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketsAPI = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Ticket"],
  endpoints: (builder) => ({
    getTickets: builder.query<TTicket[], void>({
      query: () => "customersupporttickets",
      providesTags: ["Ticket"],
    }),
    createTicket: builder.mutation<TTicket, Partial<TTicket>>({
      query: (newTicket) => ({
        url: "customersupporttickets",
        method: "POST",
        body: newTicket,
      }),
      invalidatesTags: ["Ticket"],
    }),
    updateTicket: builder.mutation<TTicket, Partial<TTicket>>({
      query: ({ ticketId, ...rest }) => ({
        url: `customersupporttickets/${ticketId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Ticket"],
    }),
    deleteTicket: builder.mutation<{ success: boolean; id: number }, number>({
      query: (ticketId) => ({
        url: `customersupporttickets/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ticket"],
    }),
  }),
}); // Cast the API to our defined interface

// Export the hooks
export const {
  useGetTicketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketsAPI;
