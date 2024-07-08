import { fleetsAPI } from "./FleetApis";

const Fleets = () => {
  const {
    data: fleetsData,
    error,
    isLoading,
    isError,
  } = fleetsAPI.useGetFleetsQuery();

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
      <p>Fleets</p>
      {fleetsData?.map((pay) => (
        <div key={pay.fleetId}>
          <>{pay.currentValue}</>
        </div>
      ))}
    </div>
  );
};

export default Fleets;
