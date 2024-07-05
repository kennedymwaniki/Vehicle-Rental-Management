import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TFleet {
  fleetId: number;
  vehicleId: number;
  acquisitionDate: string;
  depreciationRate: number;
  currentValue: number;
  maintenanceCost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const fleetsAPI = createApi({
  reducerPath: "fleetsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getFleets: builder.query<TFleet[], void>({
      query: () => "fleets",
      providesTags: ["getFleets"],
    }),
    createFleet: builder.mutation<TFleet, Partial<TFleet>>({
      query: (newFleet) => ({
        url: "fleets",
        method: "POST",
        body: newFleet,
      }),
      invalidatesTags: ["getFleets"],
    }),
    updateFleet: builder.mutation<TFleet, Partial<TFleet>>({
      query: ({ fleetId, ...rest }) => ({
        url: `fleets/${fleetId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["getFleets"],
    }),
    deleteFleet: builder.mutation<{ success: boolean; id: number }, number>({
      query: (fleetId) => ({
        url: `fleets/${fleetId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getFleets"],
    }),
  }),
});

export const {
  useGetFleetsQuery,
  useCreateFleetMutation,
  useUpdateFleetMutation,
  useDeleteFleetMutation,
} = fleetsAPI;