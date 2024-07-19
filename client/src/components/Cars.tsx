import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import vehiclesAPI from "../features/vehicles/VehiclesApi";
import CarItem from "./CarItems";
import CarLoader from "./CarLoader";

const Cars = () => {
  const {
    data: vehiclesData,

    isLoading,
    isError,
  } = vehiclesAPI.useGetVehiclesQuery();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const handleBookClick = (vehicleId: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(`/booking/${vehicleId}`);
    }
  };

  if (isLoading) return <CarLoader />;
  if (isError) return <div>Error</div>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Select a Vehicle</h2>
      <div className="grid grid-cols-1 gap-6">
        {vehiclesData?.map((vehicle) => (
          <CarItem
            key={vehicle.vehicleId}
            vehicle={vehicle}
            onBookClick={handleBookClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Cars;
