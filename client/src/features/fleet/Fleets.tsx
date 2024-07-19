/* eslint-disable @typescript-eslint/no-unused-vars */
import fleetsAPI from "./FleetApis";
import { TFleet } from "../../types/types";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { MdAutoDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Modal from "../../ui/Modal"; //! Import the Modal component

const Fleets = () => {
  const [editFleetId, setEditFleetId] = useState<number | null | undefined>(
    null
  );
  const [fleetData, setFleetData] = useState<Partial<TFleet>>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newFleetData, setNewFleetData] = useState<Partial<TFleet>>({});
  const [_isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: fleetsData,
    error,
    isLoading: isFleetsLoading,
    isError,
  } = fleetsAPI.useGetFleetsQuery();
  console.log(fleetsData);
  //TODO: export this to admin dashboard
  const totalFleets = fleetsData?.reduce((acc, _curr) => acc + 1, 0) || 0;

  console.log(totalFleets);

  const [updateFleet] = fleetsAPI.useUpdateFleetMutation();
  const [deleteFleet] = fleetsAPI.useDeleteFleetMutation();
  const [createFleet] = fleetsAPI.useCreateFleetMutation();

  const handleEdit = (fleet: TFleet) => {
    setEditFleetId(fleet.fleetId);
    setFleetData(fleet);
  };

  const handleDelete = async (fleetId: number) => {
    try {
      await deleteFleet(fleetId).unwrap();
      toast.success("Fleet deleted successfully");
    } catch (error) {
      toast.error("Failed to delete fleet");
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateFleet({ fleetId: editFleetId, ...fleetData }).unwrap();
      toast.success("Fleet updated successfully");
      setEditFleetId(null);
    } catch (error) {
      toast.error("Failed to update fleet");
    }
  };

  const handleCreateFleet = async () => {
    setIsLoading(true);
    try {
      await createFleet(newFleetData).unwrap();
      toast.success("Fleet created successfully");
      setIsCreating(false);
      setNewFleetData({});
    } catch (error) {
      toast.error("Failed to create fleet");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFleetsLoading) {
    return <div className="text-center">Loading...</div>;
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
    <div className="container mx-auto p-4">
      <Toaster position="top-center" richColors />

      <h2 className="text-yellow-400 text-2xl mb-4">Fleets</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="py-2 px-4 border-b">Fleet ID</th>
              <th className="py-2 px-4 border-b">Vehicle ID</th>
              <th className="py-2 px-4 border-b">Acquisition Date</th>
              <th className="py-2 px-4 border-b">Depreciation Rate</th>
              <th className="py-2 px-4 border-b">Current Value</th>
              <th className="py-2 px-4 border-b">Maintenance Cost</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleetsData?.map((fleet: TFleet) => (
              <tr key={fleet.fleetId}>
                <td className="py-2 px-4 border-b">{fleet.fleetId}</td>
                <td className="py-2 px-4 border-b">
                  {editFleetId === fleet.fleetId ? (
                    <input
                      type="number"
                      value={fleetData.vehicleId || ""}
                      onChange={(e) =>
                        setFleetData({
                          ...fleetData,
                          vehicleId: parseInt(e.target.value),
                        })
                      }
                    />
                  ) : (
                    fleet.vehicleId
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editFleetId === fleet.fleetId ? (
                    <input
                      type="date"
                      value={fleetData.acquisitionDate || ""}
                      onChange={(e) =>
                        setFleetData({
                          ...fleetData,
                          acquisitionDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    fleet.acquisitionDate
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editFleetId === fleet.fleetId ? (
                    <input
                      type="number"
                      step="0.01"
                      value={fleetData.depreciationRate || ""}
                      onChange={(e) =>
                        setFleetData({
                          ...fleetData,
                          depreciationRate: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    fleet.depreciationRate
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editFleetId === fleet.fleetId ? (
                    <input
                      type="number"
                      step="0.01"
                      value={fleetData.currentValue || ""}
                      onChange={(e) =>
                        setFleetData({
                          ...fleetData,
                          currentValue: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    fleet.currentValue
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editFleetId === fleet.fleetId ? (
                    <input
                      type="number"
                      step="0.01"
                      value={fleetData.maintenanceCost || ""}
                      onChange={(e) =>
                        setFleetData({
                          ...fleetData,
                          maintenanceCost: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    fleet.maintenanceCost
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editFleetId === fleet.fleetId ? (
                    <input
                      type="text"
                      value={fleetData.status || ""}
                      onChange={(e) =>
                        setFleetData({ ...fleetData, status: e.target.value })
                      }
                    />
                  ) : (
                    fleet.status
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editFleetId === fleet.fleetId ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        onClick={() => setEditFleetId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                        onClick={() => handleEdit(fleet)}
                      >
                        <LuClipboardEdit />
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(fleet.fleetId || 0)}
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
          Add New Fleet
        </button>
        {isCreating && (
          <Modal onClose={() => setIsCreating(false)}>
            <div className="mt-4">
              <h3 className="text-xl mb-2">Create New Fleet</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateFleet();
                }}
              >
                <div className="mb-2">
                  <label className="block">Acquisition Date</label>
                  <input
                    type="date"
                    value={newFleetData.acquisitionDate}
                    onChange={(e) =>
                      setNewFleetData({
                        ...newFleetData,
                        acquisitionDate: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Vehicle ID</label>
                  <input
                    type="number"
                    value={newFleetData.vehicleId}
                    onChange={(e) =>
                      setNewFleetData({
                        ...newFleetData,
                        vehicleId: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Depreciation Rate</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newFleetData.depreciationRate}
                    onChange={(e) =>
                      setNewFleetData({
                        ...newFleetData,
                        depreciationRate: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Current Value</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newFleetData.currentValue}
                    onChange={(e) =>
                      setNewFleetData({
                        ...newFleetData,
                        currentValue: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Maintenance Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newFleetData.maintenanceCost}
                    onChange={(e) =>
                      setNewFleetData({
                        ...newFleetData,
                        maintenanceCost: Number(e.target.value),
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Status</label>
                  <input
                    type="text"
                    value={newFleetData.status}
                    onChange={(e) =>
                      setNewFleetData({
                        ...newFleetData,
                        status: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                  >
                    Create
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

export default Fleets;
