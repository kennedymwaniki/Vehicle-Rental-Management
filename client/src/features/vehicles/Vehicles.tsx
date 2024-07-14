import { vehiclesAPI } from "./VehiclesApi";
import { TVehicle } from "../../types/types";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { MdAutoDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Modal from "../../ui/Modal";

const Vehicles = () => {
  const {
    data: vehiclesData,
    error,
    isLoading,
    isError,
  } = vehiclesAPI.useGetVehiclesQuery();

  const [editVehicleId, setEditVehicleId] = useState<number | null>(null);
  const [vehicleData, setVehicleData] = useState<Partial<TVehicle>>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newVehicleData, setNewVehicleData] = useState<Partial<TVehicle>>({});
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [updateVehicle] = vehiclesAPI.useUpdateVehicleMutation();
  const [deleteVehicle] = vehiclesAPI.useDeleteVehicleMutation();
  const [createVehicle] = vehiclesAPI.useCreateVehicleMutation();

  const handleEdit = (vehicle: TVehicle) => {
    setEditVehicleId(vehicle.vehicleId);
    setVehicleData(vehicle);
    setIsEditing(true);
  };

  const handleDelete = async (vehicleId: number | null) => {
    if (vehicleId !== null && vehicleId !== undefined) {
      setIsLoadingAction(true);
      try {
        await deleteVehicle(vehicleId).unwrap();
        toast.success("Vehicle deleted successfully");
      } catch (error) {
        toast.error("Failed to delete vehicle");
      } finally {
        setIsLoadingAction(false);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editVehicleId) {
      setIsLoadingAction(true);
      try {
        await updateVehicle({ vehicleId: editVehicleId, ...vehicleData }).unwrap();
        toast.success("Vehicle updated successfully");
        setEditVehicleId(null);
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update vehicle");
      } finally {
        setIsLoadingAction(false);
      }
    }
  };

  const handleCreateVehicle = async () => {
    setIsLoadingAction(true);
    try {
      await createVehicle(newVehicleData).unwrap();
      toast.success("Vehicle created successfully");
      setIsCreating(false);
      setNewVehicleData({});
    } catch (error) {
      toast.error("Failed to create vehicle");
    } finally {
      setIsLoadingAction(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error?.message || "Something went wrong"}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />
      <h2 className="text-yellow-400 text-2xl mb-4">Vehicles</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="py-2 px-4 border-b">Vehicle ID</th>
              <th className="py-2 px-4 border-b">Vehicle Specs ID</th>
              <th className="py-2 px-4 border-b">Rental Rate</th>
              <th className="py-2 px-4 border-b">Availability</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesData?.map((vehicle: TVehicle) => (
              <tr key={vehicle.vehicleId}>
                <td className="py-2 px-4 border-b">{vehicle.vehicleId}</td>
                <td className="py-2 px-4 border-b">
                  {editVehicleId === vehicle.vehicleId ? (
                    <input
                      type="number"
                      value={vehicleData.vehicleSpecsId || ""}
                      onChange={(e) =>
                        setVehicleData({
                          ...vehicleData,
                          vehicleSpecsId: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    vehicle.vehicleSpecsId
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editVehicleId === vehicle.vehicleId ? (
                    <input
                      type="number"
                      value={vehicleData.rentalRate || ""}
                      onChange={(e) =>
                        setVehicleData({
                          ...vehicleData,
                          rentalRate: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    vehicle.rentalRate
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editVehicleId === vehicle.vehicleId ? (
                    <input
                      type="checkbox"
                      checked={vehicleData.availability || false}
                      onChange={(e) =>
                        setVehicleData({
                          ...vehicleData,
                          availability: e.target.checked,
                        })
                      }
                    />
                  ) : (
                    vehicle.availability ? "Yes" : "No"
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editVehicleId === vehicle.vehicleId ? (
                    <button
                      onClick={handleSaveEdit}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      disabled={isLoadingAction}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                        disabled={isEditing && editVehicleId !== vehicle.vehicleId}
                      >
                        {isEditing && editVehicleId === vehicle.vehicleId ? "Editing..." : <LuClipboardEdit />}
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.vehicleId)}
                        className="px-2 py-1 bg-red-500 text-white rounded ml-2"
                        disabled={isLoadingAction}
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
      </div>

      {isCreating && (
        <Modal  onClose={() => setIsCreating(false)}>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateVehicle();
              }}
            >
              <div className="mb-2">
                <label className="block">Vehicle Specs ID</label>
                <input
                  type="number"
                  value={newVehicleData.vehicleSpecsId || ""}
                  onChange={(e) =>
                    setNewVehicleData({
                      ...newVehicleData,
                      vehicleSpecsId: Number(e.target.value),
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Rental Rate</label>
                <input
                  type="number"
                  value={newVehicleData.rentalRate || ""}
                  onChange={(e) =>
                    setNewVehicleData({
                      ...newVehicleData,
                      rentalRate: Number(e.target.value),
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Availability</label>
                <input
                  type="checkbox"
                  checked={newVehicleData.availability || false}
                  onChange={(e) =>
                    setNewVehicleData({
                      ...newVehicleData,
                      availability: e.target.checked,
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                  disabled={isLoadingAction}
                >
                  {isLoadingAction ? "Creating..." : "Create"}
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

      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Vehicle
        </button>
      )}
    </div>
  );
};

export default Vehicles;
