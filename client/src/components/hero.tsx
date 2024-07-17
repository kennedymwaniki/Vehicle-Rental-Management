import { useState } from "react";

const Heros = () => {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <div className="relative bg-white h-screen">
      {/* CarHub logo */}
      <div className="absolute top-4 left-4 flex items-center z-10">
        <img
          src="/path-to-carhub-logo.png"
          alt="CarHub"
          className="h-6 w-6 mr-2"
        />
        <span className="text-xl font-bold">CarHub</span>
      </div>

      {/* Sign in Button */}
      <div className="absolute top-4 right-4 z-10">
        <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-100 shadow-md">
          Sign in
        </button>
      </div>

      <div className="flex h-full">
        {/* Left side content */}
        <div className="w-1/2 flex flex-col justify-center pl-16">
          <h1 className="text-5xl font-bold mb-4">
            Find, book,
            <br />
            rent a car—
            <br />
            quick and
            <br />
            super easy!
          </h1>
          <p className="text-lg mb-6">
            Streamline your car rental experience with
            <br />
            our effortless booking process.
          </p>
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 w-fit"
            onClick={() => setShowExplore(!showExplore)}
          >
            Explore Cars
          </button>
          {showExplore && (
            <div className="mt-4 bg-white p-4 rounded-md shadow-md">
              <p>Car exploration options would appear here.</p>
            </div>
          )}
        </div>

        {/* Right side with background and car image */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-[url('src/assets/hero-bg.png')] bg-no-repeat bg-cover bg-right-top" />
          <img
            src="src/assets/hero.png"
            alt="Toyota Fortuner"
            className="absolute top-0 right-0 w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Heros;
