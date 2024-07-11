import { ticketsAPI } from "./TicketsApi";
import { TTicket } from "../../types/types";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { MdAutoDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Modal from "../../ui/Modal";

const TicketsTable = () => {
  const [editTicketId, setEditTicketId] = useState<number | null | undefined>(
    null
  );
  const [ticketData, setTicketData] = useState<Partial<TTicket>>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newTicketData, setNewTicketData] = useState<Partial<TTicket>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: ticketsData,
    error,
    isLoading: isTicketsLoading,
    isError,
  } = ticketsAPI.useGetTicketsQuery();

  console.log("TicketsData:",ticketsData)
  // console.log("TicketsData:",isError)

  const [updateTicket] = ticketsAPI.useUpdateTicketMutation();
  const [deleteTicket] = ticketsAPI.useDeleteTicketMutation();
  const [createTicket] = ticketsAPI.useCreateTicketMutation();

  const handleEdit = (ticket: TTicket) => {
    setEditTicketId(ticket.ticketId);
    setTicketData(ticket);
  };

  const handleDelete = async (ticketId: number) => {
    try {
      await deleteTicket(ticketId).unwrap();
      toast.success("Ticket deleted successfully");
    } catch (error) {
      toast.error("Failed to delete ticket");
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateTicket({ ticketId: editTicketId, ...ticketData }).unwrap();
      toast.success("Ticket updated successfully");
      setEditTicketId(null);
    } catch (error) {
      toast.error("Failed to update ticket");
    }
  };

  const handleCreateTicket = async () => {
    setIsLoading(true);
    try {
      await createTicket(newTicketData).unwrap();
      toast.success("Ticket created successfully");
      setIsCreating(false);
      setNewTicketData({});
    } catch (error) {
      toast.error("Failed to create ticket");
    } finally {
      setIsLoading(false);
    }
  };

  if (isTicketsLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.toString()}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />

      <h2 className="text-yellow-400 text-2xl mb-4">Tickets</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="py-2 px-4 border-b">Ticket ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ticketsData?.map((ticket: TTicket) => (
              <tr key={ticket.ticketId}>
                <td className="py-2 px-4 border-b">{ticket.ticketId}</td>
                <td className="py-2 px-4 border-b">
                  {editTicketId === ticket.ticketId ? (
                    <input
                      type="number"
                      value={ticketData.userId || ""}
                      onChange={(e) =>
                        setTicketData({
                          ...ticketData,
                          userId: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    ticket.userId
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editTicketId === ticket.ticketId ? (
                    <input
                      type="text"
                      value={ticketData.subject || ""}
                      onChange={(e) =>
                        setTicketData({
                          ...ticketData,
                          subject: e.target.value,
                        })
                      }
                    />
                  ) : (
                    ticket.subject
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editTicketId === ticket.ticketId ? (
                    <textarea
                      value={ticketData.description || ""}
                      onChange={(e) =>
                        setTicketData({
                          ...ticketData,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    ticket.description
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editTicketId === ticket.ticketId ? (
                    <input
                      type="text"
                      value={ticketData.status || ""}
                      onChange={(e) =>
                        setTicketData({ ...ticketData, status: e.target.value })
                      }
                    />
                  ) : (
                    ticket.status
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editTicketId === ticket.ticketId ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        onClick={() => setEditTicketId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                        onClick={() => handleEdit(ticket)}
                      >
                        <LuClipboardEdit />
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(ticket.ticketId || 0)}
                      >
                        <MdAutoDelete />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
          onClick={() => setIsCreating(true)}
        >
          Create New Ticket
        </button>
        {isCreating && (
          <Modal onClose={() => setIsCreating(false)}>
            <div className="mt-4">
              <h3 className="text-xl mb-2">Create New Ticket</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateTicket();
                }}
              >
                <div className="mb-2">
                  <label className="block">User ID</label>
                  <input
                    type="number"
                    value={newTicketData.userId || ""}
                    onChange={(e) =>
                      setNewTicketData({
                        ...newTicketData,
                        userId: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Subject</label>
                  <input
                    type="text"
                    value={newTicketData.subject || ""}
                    onChange={(e) =>
                      setNewTicketData({
                        ...newTicketData,
                        subject: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Description</label>
                  <textarea
                    value={newTicketData.description || ""}
                    onChange={(e) =>
                      setNewTicketData({
                        ...newTicketData,
                        description: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Status</label>
                  <input
                    type="text"
                    value={newTicketData.status || ""}
                    onChange={(e) =>
                      setNewTicketData({
                        ...newTicketData,
                        status: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TicketsTable;
