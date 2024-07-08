import { vehiclesAPI } from "./VehiclesApi";

const Vehicles = () => {
  const {
    data: vehiclesData,
    error,
    isLoading,
    isError,
  } = vehiclesAPI.useGetVehiclesQuery();

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
      <p>Vehicles</p>
      {vehiclesData?.map((vehicle) => (
        <div key={vehicle.vehicleId}>
          <>
            {vehicle.vehicleId}-{vehicle.rentalRate}
          </>
        </div>
      ))}
    </div>
  );
};

export default Vehicles;
