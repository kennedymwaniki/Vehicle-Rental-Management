import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TTicket } from "../../types/types";
import Modal from "../../ui/Modal";
import ticketsAPI from "../Tickets/TicketsApi";
import usersAPI from "./UserApi";
import { toast, Toaster } from "sonner";

const UserTickets = () => {
  const UserJson = localStorage.getItem("user");
  const user = UserJson ? JSON.parse(UserJson).user : null;
  const userId = user?.id;

  const {
    data: UserTickets,
    error,
    isLoading,
  } = usersAPI.useGetUserTcketsByIdQuery(userId, {
    skip: !userId,
  });

  const [createTicket] = ticketsAPI.useCreateTicketMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const { register, handleSubmit, reset } = useForm<TTicket>({
    defaultValues: {
      ticketId: null,
      userId: userId || 0,
      subject: "",
      description: "",
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const onSubmit: SubmitHandler<TTicket> = async (data) => {
    setIsCreating(true);
    try {
      await createTicket(data);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("failed to create Ticket");
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tickets.</p>;
  }

  return (
    <div className="p-4">
      <Toaster position="top-center" />

      <h1 className="text-2xl font-semibold mb-4">Your Tickets</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Ticket
      </button>
      {UserTickets?.tickets?.length ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Ticket ID</th>
              <th className="border-b py-2 px-4">Subject</th>
              <th className="border-b py-2 px-4">Description</th>
              <th className="border-b py-2 px-4">Status</th>
              <th className="border-b py-2 px-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            {UserTickets.tickets.map((ticket: TTicket, index: number) => (
              <tr
                key={ticket.ticketId}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border-b py-2 px-4">{ticket.ticketId}</td>
                <td className="border-b py-2 px-4">{ticket.subject}</td>
                <td className="border-b py-2 px-4">{ticket.description}</td>
                <td className="border-b py-2 px-4">{ticket.status}</td>
                <td className="border-b py-2 px-4">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tickets found</p>
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject", { required: true })}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium">
                userId
              </label>
              <input
                id="userId"
                value={userId}
                readOnly
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description", { required: true })}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            {/* <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div> */}
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isCreating ? "Hold on....." : "Create Ticket"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UserTickets;
