
import { useGetTicketsQuery, useCreateTicketMutation } from './TicketsApi';

const TicketList = () => {
  const { data: tickets, isLoading, isError } = useGetTicketsQuery();
  const [createTicket] = useCreateTicketMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tickets</div>;

  return (
    <div>
      {tickets?.map(ticket => (
        <div key={ticket.ticketId}>{ticket.subject}</div>
      ))}
      <button onClick={() => createTicket({ subject: 'New Ticket', description: 'Description' })}>
        Create New Ticket
      </button>
    </div>
  );
};

export default TicketList;