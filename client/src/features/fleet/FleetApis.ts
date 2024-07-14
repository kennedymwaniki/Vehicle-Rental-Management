import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TFleet } from "./../../types/types";


export const fleetsAPI = createApi({
  reducerPath: "fleetsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-eg4t.onrender.com/api",
  }),
  tagTypes: ["getFleets"],

  endpoints: (builder) => ({
    getFleets: builder.query<TFleet[], void>({
      query: () => "fleet",
      providesTags: ["getFleets"],
    }),
    createFleet: builder.mutation<TFleet, Partial<TFleet>>({
      query: (newFleet) => ({
        url: "fleet",
        method: "POST",
        body: newFleet,
      }),
      invalidatesTags: ["getFleets"],
    }),
    updateFleet: builder.mutation<TFleet, Partial<TFleet>>({
      query: ({ fleetId, ...rest }) => ({
        url: `fleet/${fleetId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["getFleets"],
    }),
    deleteFleet: builder.mutation<{ success: boolean; id: number }, number>({
      query: (fleetId) => ({
        url: `fleet/${fleetId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getFleets"],
    }),
  }),
});

export default fleetsAPI;
