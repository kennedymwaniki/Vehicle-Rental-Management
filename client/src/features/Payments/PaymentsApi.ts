import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPayment } from "./../../types/types";


export const paymentsAPI = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["getPayments"],
  endpoints: (builder) => ({
    getPayments: builder.query<TPayment[], void>({
      query: () => "payments",
      providesTags: ["getPayments"],
    }),
    createPayment: builder.mutation<TPayment, Partial<TPayment>>({
      query: (newPayment) => ({
        url: "payments",
        method: "POST",
        body: newPayment,
      }),
      invalidatesTags: ["getPayments"],
    }),
    updatePayment: builder.mutation<TPayment, Partial<TPayment>>({
      query: ({ paymentId, ...rest }) => ({
        url: `payments/${paymentId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["getPayments"],
    }),
    deletePayment: builder.mutation<{ success: boolean; id: number }, number>({
      query: (paymentId) => ({
        url: `payments/${paymentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getPayments"],
    }),
  }),
});

// export const useGetPaymentsQuery: UseQuery<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "getPayments", TPayment[], "paymentsApi">> = paymentsAPI.useGetPaymentsQuery;
// export const useCreatePaymentMutation: UseMutation<MutationDefinition<Partial<TPayment>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "getPayments", TPayment, "paymentsApi">> = paymentsAPI.useCreatePaymentMutation;
// export const useUpdatePaymentMutation: UseMutation<MutationDefinition<Partial<TPayment>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "getPayments", TPayment, "paymentsApi">> = paymentsAPI.useUpdatePaymentMutation;
// export const useDeletePaymentMutation: UseMutation<MutationDefinition<number, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "getPayments", { ... }, "paymentsApi">> = paymentsAPI.useDeletePaymentMutation;

export default paymentsAPI;
