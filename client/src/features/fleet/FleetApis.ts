import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TFleet } from "./../../types/types";
// interface TFleet {
//   fleetId: number;
//   vehicleId: number;
//   acquisitionDate: string;
//   depreciationRate: number;
//   currentValue: number;
//   maintenanceCost: number;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

export const fleetsAPI = createApi({
  reducerPath: "fleetsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
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
