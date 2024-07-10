import React, { useState } from "react";

const RegisterComponent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    // For example, send registration data to backend or perform validation
    console.log({ fullName, email, contactPhone, password, address });
    // Reset form fields after submission if needed
    setFullName("");
    setEmail("");
    setContactPhone("");
    setPassword("");
    setAddress("");
  };

  return (
    <div className="flex flex-col min-h-full items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="contactPhone"
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              Contact Phone
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              autoComplete="tel"
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
