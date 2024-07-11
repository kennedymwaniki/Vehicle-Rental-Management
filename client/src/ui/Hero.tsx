const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16">
      <div className="text-center md:text-left md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find, book, rent a car— quick and super easy!
        </h1>
        <p className="text-lg mb-6">
          Streamline your car rental experience with our effortless booking
          process.
        </p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Explore Cars
        </button>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img src="src/assets/hero.png" alt="Car" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
