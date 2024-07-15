import { useState } from "react";
import logo from "../../assets/kenny blue-Photoroom.png";
import { useForm } from "react-hook-form";
import loginAPI from "./LoginAPI";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Auth/authSlice";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router";
import MiniLoader from "../../ui/MiniLoader";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = loginAPI.useLoginUserMutation();
  const { register, handleSubmit } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await loginUser(data).unwrap();
      console.log("API Response:", response); // *:Debug: Log the entire response
      // *! check for response
      if (response) {
        console.log("response received"); 
        dispatch(setCredentials({ user: response, token: response.token }));
        toast.success("Logged in successfully");

        console.log("User role:", response.user.role); 

        if (response.user.role === "admin") {
          console.log(response.user.role);
          console.log("Redirecting to admin dashboard"); 
          navigate("/admindashboard");
        } else {
          console.log("Redirecting to user dashboard");
          navigate("/userdashboard");
        }
      } else {
        console.log("Invalid response structure:", response);
        toast.error("Failed to login: Invalid response from server");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      toast.error(
        "Failed to login: " +
          (err.data?.msg || err.error || err.message || String(err))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster position="top-center" />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-[100px] w-auto"
          src={logo}
          alt="Your Company"
        />
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                autoComplete="email"
                {...register("email", { required: true })}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", { required: true })}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10"
            >
              {loading ? <MiniLoader /> : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
