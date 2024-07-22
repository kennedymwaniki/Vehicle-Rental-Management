import { useState } from "react";
import axios from "axios";
import usersAPI from "./UserApi";
import Modal from "../../ui/Modal";
import { toast, Toaster } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
// import { Cloudinary } from "@cloudinary/url-gen";

// const cld = new Cloudinary({
//   cloud: {
//     cloudName: "dt7qq0zt2",
//   },
// });

interface FormData {
  fullName: string;
  email: string;
  username: string;
  address: string;
  contactPhone: string;
  password?: string;
  image?: FileList;
}

const UserProfile = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson).user : null;
  const navigate = useNavigate();
  const userId = user?.id;

  const hasImage = Boolean(user.image);

  const { data, error, isLoading } = usersAPI.useGetUserByIdQuery(userId, {
    skip: !userId,
    pollingInterval: 2000,
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
      // Handle image upload to Cloudinary if an image is provided
      let imageUrl = user.image; // Keep existing image if no new image is provided

      if (formData.image && formData.image.length > 0) {
        const imageFile = formData.image[0];
        const formDataImage = new FormData();
        formDataImage.append("file", imageFile);
        formDataImage.append("upload_preset", "upload_preset"); // Replace with your Cloudinary upload preset

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dt7qq0zt2/image/upload`,
          formDataImage
        );
        console.log(res);

        imageUrl = res.data.secure_url;
      }

      const res = await updateUser({ userId, ...formData, image: imageUrl });
      console.log(res);

      if (res.data) {
        const updatedUser = {
          ...user,
          fullName: res.data.msg.fullName,
          image: res.data.msg.image,
        };
        localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
      }

      // Close modal after submission
      setIsModalOpen(false);
      toast.success("Profile successfully updated");
      navigate("/");
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
      <Toaster position="top-center" />

      <div className="bg-blue-50 p-6 rounded-lg shadow-lg w-full max-w-sm">
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
                {...register("image")}
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

export default UserProfile;
