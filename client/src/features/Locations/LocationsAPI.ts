import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TLocation } from "../../types/types";

const LocationsAPI = createApi({
  reducerPath: "LocationsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-eg4t.onrender.com/api",
  }),
  tagTypes: ["getLocations"],
  endpoints: (builder) => ({
    getLocations: builder.query<TLocation[], void>({
      query: () => "locations",
      providesTags: ["getLocations"],
    }),
    createLocation: builder.mutation<TLocation, Partial<TLocation>>({
      query: (location) => ({
        url: "locations",
        method: "POST",
        body: location,
      }),
      invalidatesTags: ["getLocations"],
    }),
    deleteLocation: builder.mutation<{ success: boolean; id: number }, number>({
      query: (locationId) => ({
        url: `locations/${locationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getLocations"],
    }),
    updateLocation: builder.mutation<TLocation, Partial<TLocation>>({
      query: ({ locationId, ...rest }) => ({
        url: `locations/${locationId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["getLocations"],
    }),
  }),
});

export default LocationsAPI;
