// src/components/FeatureCars.tsx
import React from "react";
import carImage1 from "../assets/audi-rs7.jpg"; // Make sure these paths are correct
import carImage2 from "../assets/bmw-7.jpg";
import carImage3 from "../assets/audi.png";

const FeatureCars: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Featured Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={carImage1}
            alt="Toyota T-20"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Audi T-20</h3>
            <ul className="mb-4">
              <li className="flex items-center">
                <span className="mr-2">•</span>Air-Conditioned
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>Bluetooth Sound System
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>Sunroof Available
              </li>
            </ul>
            <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
              Rent Now
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={carImage2}
            alt="Toyota T-30"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Toyota T-30</h3>
            <ul className="mb-4">
              <li className="flex items-center">
                <span className="mr-2">•</span>Air-Conditioned
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>Bluetooth Sound System
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>Sunroof Available
              </li>
            </ul>
            <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
              Rent Now
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={carImage3}
            alt="Toyota T-20"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Toyota T-20</h3>
            <ul className="mb-4">
              <li className="flex items-center">
                <span className="mr-2">•</span>Air-Conditioned
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>Bluetooth Sound System
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>Sunroof Available
              </li>
            </ul>
            <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
              Rent Now
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <a href="cars" className="text-lg text-blue-500 hover:underline">
          See The Store
        </a>
      </div>
    </div>
  );
};

export default FeatureCars;
