import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TPayment {
  paymentId: number;
  bookingId: number;
  amount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export const paymentsAPI = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ['getPayments'],
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

export const {
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsAPI;