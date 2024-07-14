// src/components/Cars.tsx
import React from "react";

interface Car {
  id: number;
  name: string;
  features: string[];
  image: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Toyota T-20",
    features: [
      "Air-Conditioned",
      "Bluetooth Sound System",
      "Sunroof Available",
    ],
    image:
      "https://images.unsplash.com/photo-1615393245203-4f5b77102b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHRveW90YXxlbnwwfHx8fDE2NDU1MzE0MzM&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    id: 2,
    name: "Toyota T-30",
    features: [
      "Air-Conditioned",
      "Bluetooth Sound System",
      "Sunroof Available",
    ],
    image:
      "https://images.unsplash.com/photo-1605728889542-694d45fca2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIyfHx0b3lvdGElMjBjYXJ8ZW58MHx8fHwxNjQ1NTMxNDUw&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    id: 3,
    name: "Toyota T-20",
    features: [
      "Air-Conditioned",
      "Bluetooth Sound System",
      "Sunroof Available",
    ],
    image:
      "https://images.unsplash.com/photo-1583267747951-d2b3a9a52f34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDUxfHx0b3lvdGElMjBjYXJ8ZW58MHx8fHwxNjQ1NTMxNDc3&ixlib=rb-1.2.1&q=80&w=1080",
  },
];

const Cars: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Featured Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src="src/assets/hero.png"
              alt={car.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <ul className="mb-4">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/store" className="text-lg text-blue-500 hover:underline">
          See The Store
        </a>
      </div>
    </div>
  );
};

export default Cars;
