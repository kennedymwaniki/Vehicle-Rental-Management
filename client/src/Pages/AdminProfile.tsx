import { useState } from "react";
import usersAPI from "../features/Users/UserApi";
import Modal from "../ui/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  username: string;
  address: string;
  contactPhone: string;
  password?: string; // Optional field
  avatar?: string; // Optional field for avatar image
}

const AdminProfile = () => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson).user : null;

  const userId = user?.id;

  const hasImage = Boolean(user.image);

  const { data, error, isLoading } = usersAPI.useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const [updateUser] = usersAPI.useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      console.log(formData);
      const res = await updateUser({ userId, ...formData }).unwrap();
      console.log(res);

      if (res) {
        const updatedUser = { ...user, fullName: res.fullName };
        localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
      }

      // Close modal after submission
      setIsModalOpen(false);
      toast.success("Profile successfully updated");
      navigate("/admindashboard");
    } catch (error) {
      toast.error("update failed");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          classNames: {
            error: "error-toast",
            success: "success-toast",
            warning: "warning-toast",
            info: "info-toast",
          },
        }}
      />
      <div className="bg-blue-500 p-6 rounded-3xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img
            src={hasImage ? user.image : "https://via.placeholder.com/100"}
            alt="Avatar"
            className="rounded-full border-4 border-blue-200"
          />
        </div>
        {data && (
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">{data.fullName}</p>
            <p className="text-gray-600 mb-1">Email: {data.email}</p>
            <p className="text-gray-600 mb-1">Username: {data.fullName}</p>
            <p className="text-gray-600 mb-1">Address: {data.address}</p>
            <p className="text-gray-600 mb-1">Phone: {data.contactPhone}</p>
            <p className="text-gray-600 mb-4">Role: {data.role}</p>
            <button
              className="bg-blue-50 text-black px-4 py-2 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                defaultValue={data?.fullName}
                {...register("fullName")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                defaultValue={data?.email}
                {...register("email")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                defaultValue={data?.fullName}
                {...register("username")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                defaultValue={data?.address}
                {...register("address")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                defaultValue={data?.contactPhone}
                {...register("contactPhone")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Avatar</label>
              <input
                type="file"
                {...register("avatar")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminProfile;
