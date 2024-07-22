interface CarItemProps {
  vehicle: {
    vehicleId: number;
    image_url: string;
    vehicleSpecsId: number;
    rentalRate: number;
    availability: boolean;
    vehicleSpec: {
      color: string;
      model: string;
      year: number;
      seatingCapacity: number;
      manufacturer: string;
      fuelType: string;
      engineCapacity: string;
    };
  };
  onBookClick: (vehicleId: number) => void;
}

const CarItem = ({ vehicle, onBookClick }: CarItemProps) => {
  const { vehicleId, rentalRate, availability, image_url, vehicleSpec } =
    vehicle;
  const {
    model,
    manufacturer,
    year,
    color,
    seatingCapacity,
    fuelType,
    engineCapacity,
  } = vehicleSpec;

  return (
    <div
      className={`flex flex-col bg-white rounded-lg shadow-md m-2 p-2 ${
        !availability ? "grayscale" : ""
      }`}
    >
      <div className="flex-shrink-0">
        <img
          src={image_url}
          alt={`${manufacturer} ${model}`}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="flex-grow mt-4">
        <h3 className="text-xl font-bold">{`${year} ${manufacturer} ${model}`}</h3>
        <p className="text-gray-700">
          <strong className="text-blue-800">Color:</strong> {color}
        </p>
        <p className="text-gray-700">
          <strong className="text-blue-800">Seating Capacity:</strong>{" "}
          {seatingCapacity}
        </p>
        <p className="text-indigo-600">
          <strong className="text-blue-800">Fuel Type:</strong> {fuelType}
        </p>
        <p className="text-gray-700">
          <strong className="text-blue-800">Engine Capacity:</strong>{" "}
          {engineCapacity}
        </p>
        <p className="text-gray-700">
          <strong className="text-blue-800">Rental Rate:</strong> ${rentalRate}{" "}
          per day
        </p>
      </div>
      <button
        onClick={() => onBookClick(vehicleId)}
        disabled={!availability}
        className={`mt-4 px-4 py-2 text-white rounded ${
          availability
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Book
      </button>
    </div>
  );
};

export default CarItem;
