import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import bookingsAPI from "../features/bookings/BookingsApi";
import vehiclesAPI from "../features/vehicles/VehiclesApi";
import { RootState } from "../app/store";

const Booking = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const userId = user?.user.id;
  console.log(userId);
  const [createBooking] = bookingsAPI.useCreateBookingMutation();
  const { data: vehicleData } = vehiclesAPI.useGetVehiclesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((vehicle) => vehicle.vehicleId === Number(vehicleId)),
    }),
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const bookingData = {
      ...data,
      vehicleId: Number(vehicleId),
      userId,
    };

    try {
      await createBooking(bookingData).unwrap();
      // Handle success (e.g., redirect or show success message)
    } catch (err) {
      console.log(err);
    }
  };

  if (!vehicleData) return <div>Loading vehicle data...</div>;

  return (
    <div className="container mx-auto py-8">
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
            totalAmount
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
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
