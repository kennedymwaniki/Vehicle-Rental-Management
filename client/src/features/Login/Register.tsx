
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginAPI from "./LoginAPI";
import { Toaster, toast } from "sonner";
import MiniLoader from "../../ui/MiniLoader";
import userReg from "../../assets/user registration.png"; // Make sure to replace this path with the correct path to your image

interface RegisterFormInputs {
  fullName: string;
  email: string;
  contactPhone: string;
  password: string;
  address: string;
}

const RegisterComponent = () => {
  const { register, handleSubmit, reset } = useForm<RegisterFormInputs>();
  const [registerUser, { isLoading }] = loginAPI.useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data).unwrap();
      reset();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-purple-100">
        <img
          src={userReg}
          alt="Register Illustration"
          className="w-full max-w-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster position="top-center" richColors />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-purple-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details to create your account
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-4 rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  {...register("fullName", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contact Phone
              </label>
              <div className="mt-2">
                <input
                  id="contactPhone"
                  type="tel"
                  {...register("contactPhone", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  {...register("address", { required: true })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10"
              >
                {isLoading ? <MiniLoader /> : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
