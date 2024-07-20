// import audi from "../assets/download.jpeg";

interface CarItemProps {
  vehicle: {
    vehicleId: number;
    image_url: string;
    vehicleSpecsId: number;
    rentalRate: number;
    availability: boolean;
  };
  onBookClick: (vehicleId: number) => void;
}

const CarItem = ({ vehicle, onBookClick }: CarItemProps) => {
  const { vehicleId, rentalRate, availability, image_url } = vehicle;

  return (
    <div
      className={`flex items-center p-4 bg-white rounded-lg shadow-md ${
        !availability ? "grayscale" : ""
      }`}
    >
      <div className="w-1/3">
        <img
          src={image_url} // Add image paths manually
          alt="Vehicle"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="w-2/3 pl-4">
        <h3 className="text-xl font-bold">Vehicle Name</h3>
        <p className="text-gray-700">Rental Rate: ${rentalRate} per day</p>
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
    </div>
  );
};

export default CarItem;
