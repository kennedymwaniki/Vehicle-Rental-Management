import { useGetPaymentsQuery } from "./PaymentsApi";

const Payments = () => {
  const {
    data: paymentData,
    error,
    isLoading,
    isError,
  } = useGetPaymentsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error.toString()}
        console.log(error)
      </div>
    );
  }

  return (
    <div>
      <p>Payments</p>
      {paymentData?.map((pay) => (
        <div key={pay.paymentId}>
          <>{pay.amount}</>
        </div>
      ))}
    </div>
  );
};

export default Payments;