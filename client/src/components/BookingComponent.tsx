import { useParams, useNavigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import bookingsAPI from "../features/bookings/BookingsApi";
import vehiclesAPI from "../features/vehicles/VehiclesApi";
import { RootState } from "../app/store";
import { useState } from "react";

const Booking = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.user.id;

  const [createBooking] = bookingsAPI.useCreateBookingMutation();
  const { data: vehicleData } = vehiclesAPI.useGetVehiclesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((vehicle) => vehicle.vehicleId === Number(vehicleId)),
    }),
  });

  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    const bookingData = {
      ...data,
      vehicleId: Number(vehicleId),
      userId,
    };

    try {
      setIsSubmitting(true);
      await createBooking(bookingData).unwrap();
      toast.success("Booking created successfully!");
      navigate(-2);
      redirect("userdashboard");
    } catch (err) {
      toast.error("Failed to create booking");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!vehicleData) return <div>Loading vehicle data...</div>;

  return (
    <div className="container mx-auto py-8">
      <Toaster position="top-center" richColors />
      <h2 className="text-2xl font-bold mb-6">Book Vehicle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle ID
          </label>
          <input
            type="text"
            value={vehicleData.vehicleId}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            type="text"
            value={userId}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Amount
          </label>
          <input
            type="number"
            {...register("totalAmount", {
              required: "Amount is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Booking Date
          </label>
          <input
            type="date"
            {...register("bookingDate", {
              required: "Booking date is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Return Date
          </label>
          <input
            type="date"
            {...register("returnDate", { required: "Return date is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-4 py-2 ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600"
          } text-white rounded hover:bg-blue-700`}
        >
          {isSubmitting ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;