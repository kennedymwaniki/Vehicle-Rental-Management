import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { LuClipboardEdit } from "react-icons/lu";
import Modal from "../../ui/Modal";
import LocationsAPI from "./LocationsAPI";
import { TLocation } from "../../types/types";

const LocationsTable = () => {
  const [editLocationId, setEditLocationId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: locationsData,
    error,
    isLoading: loadingLocations,
    isError,
  } = LocationsAPI.useGetLocationsQuery(undefined, { pollingInterval: 60000 });

  const [updateLocation] = LocationsAPI.useUpdateLocationMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TLocation>();

  const onSubmit: SubmitHandler<TLocation> = async (data) => {
    try {
      if (editLocationId) {
        await updateLocation({ ...data, locationId: editLocationId }).unwrap();
        toast.success("Location updated successfully");
      }
      setIsModalOpen(false);
      setEditLocationId(null);
      reset();
    } catch (error) {
      toast.error("Failed to update location");
    }
  };

  const handleEdit = (location: TLocation) => {
    setEditLocationId(location.locationId);
    setIsModalOpen(true);
    setValue("name", location.name);
    setValue("address", location.address);
    setValue("contactPhone", location.contactPhone);
  };

  if (loadingLocations) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.toString()}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          classNames: {
            error: "error-toast",
            success: "success-toast",
            warning: "warning-toast",
            info: "info-toast",
          },
        }}
      />

      <h2 className="text-yellow-400 text-2xl mb-4">Locations</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="py-2 px-4 border-b">Location ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Contact Phone</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locationsData &&
              locationsData.map((location: TLocation) => (
                <tr key={location.locationId}>
                  <td className="py-2 px-4 border-b">{location.locationId}</td>
                  <td className="py-2 px-4 border-b">{location.name}</td>
                  <td className="py-2 px-4 border-b">{location.address}</td>
                  <td className="py-2 px-4 border-b">
                    {location.contactPhone}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() => handleEdit(location)}
                    >
                      <LuClipboardEdit className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
        onClick={() => {
          setEditLocationId(null);
          setIsModalOpen(true);
          reset();
        }}
      >
        Add New Location
      </button>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setEditLocationId(null);
            reset();
          }}
        >
          <div className="mt-4">
            <h3 className="text-xl mb-2">
              {editLocationId ? "Edit Location" : "Create New Location"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="border p-2 rounded w-full"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="mb-2">
                <label className="block">Address</label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="border p-2 rounded w-full"
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </div>
              <div className="mb-2">
                <label className="block">Contact Phone</label>
                <input
                  type="text"
                  {...register("contactPhone", {
                    required: "Contact Phone is required",
                  })}
                  className="border p-2 rounded w-full"
                />
                {errors.contactPhone && (
                  <span className="text-red-500">
                    {errors.contactPhone.message}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  {editLocationId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditLocationId(null);
                    reset();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LocationsTable;
