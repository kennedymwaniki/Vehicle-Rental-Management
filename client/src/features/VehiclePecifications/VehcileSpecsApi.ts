import { TVehicleSpecs } from './../../types/types';
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const vehicleSpecAPI = createApi({
    reducerPath: "vehicleSpecAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
    endpoints: (builder) =>({
        getVehicleSpecs: builder.query<TVehicleSpecs, void>({
            query: () => "vehicleSpecs",
            }),
            
    })
})








export default vehicleSpecAPI