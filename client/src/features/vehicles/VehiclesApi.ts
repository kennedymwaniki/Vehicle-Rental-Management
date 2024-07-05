import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TVehicle {
  vehicleId: number;
  vehicleSpecsId: number;
  rentalRate: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

export const vehiclesAPI = createApi({
  reducerPath: "vehiclesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes:['getVehicles'],
  endpoints: (builder) => ({
    getVehicles: builder.query<TVehicle[], void>({
      query: () => "vehicles",
      providesTags: ["getVehicles"],
    }),
    createVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: (newVehicle) => ({
        url: "vehicles",
        method: "POST",
        body: newVehicle,
      }),
      invalidatesTags: ["getVehicles"],
    }),
    updateVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: ({ vehicleId, ...rest }) => ({
        url: `vehicles/${vehicleId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["getVehicles"],
    }),
    deleteVehicle: builder.mutation<{ success: boolean; id: number }, number>({
      query: (vehicleId) => ({
        url: `vehicles/${vehicleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getVehicles"],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehiclesAPI;