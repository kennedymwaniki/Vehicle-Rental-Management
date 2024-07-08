import { ticketsAPI } from "./TicketsApi";

const TicketList = () => {
  const {
    data: ticketsData,
    error,
    isLoading,
    isError,
  } = ticketsAPI.useGetTicketsQuery();
  //   const [createTicket] = useCreateTicketMutation();
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
      <p className="text-yellow-400">Tickets</p>

      {ticketsData?.map((ticket) => (
        <div key={ticket.ticketId}>
          <>
            {ticket.ticketId}:{ticket.subject}
          </>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
