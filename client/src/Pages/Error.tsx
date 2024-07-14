
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page not found</h2>
      <p className="text-lg mb-8">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link
        to="/"
        className="text-white bg-[#0ea5e9] hover:bg-blue-700 font-semibold py-2 px-4 rounded"
      >
        &larr; Back to home
      </Link>
    </div>
  );
};

export default Error;
