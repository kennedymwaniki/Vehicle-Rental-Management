import { useForm, SubmitHandler } from "react-hook-form";
import { usersAPI } from "./UserApi";
import { TUser } from "../../types/types";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { MdAutoDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Modal from "../../ui/Modal";

const Users = () => {
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    data: usersData,
    error,
    isLoading: isUsersLoading,
    isError,
  } = usersAPI.useGetUsersQuery();

  const [updateUser] = usersAPI.useUpdateUserMutation();
  const [deleteUser] = usersAPI.useDeleteUsersMutation();
  const [createUser] = usersAPI.useCreateUsersMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TUser & { password: string }>();

  const onSubmit: SubmitHandler<TUser & { password: string }> = async (
    data
  ) => {
    try {
      if (editUserId) {
        // If editing, only include password if it's not empty
        const updateData = { ...data };
        if (!updateData.password) {
          delete updateData.password;
        }
        await updateUser({ userId: editUserId, ...updateData }).unwrap();
        toast.success("User updated successfully");
        setIsEditing(false);
      } else {
        await createUser(data).unwrap();
        toast.success("User created successfully");
        setIsCreating(false);
      }
      reset();
    } catch (error) {
      toast.error(
        editUserId ? "Failed to update user" : "Failed to create user"
      );
    }
  };

  const handleEdit = (user: TUser) => {
    setEditUserId(user.userId);
    setIsEditing(true);
    Object.keys(user).forEach((key) => {
      setValue(key as keyof TUser, user[key as keyof TUser]);
    });
    // Clear the password field when editing
    setValue("password", "");
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (isUsersLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.toString()}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />

      <h2 className="text-yellow-400 text-2xl mb-4">Users</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-slate-400">
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((user: TUser) => (
              <tr key={user.userId}>
                <td className="py-2 px-4 border-b">{user.userId}</td>
                <td className="py-2 px-4 border-b">{user.fullName}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.contactPhone}</td>
                <td className="py-2 px-4 border-b">{user.address}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    <LuClipboardEdit />
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user.userId || 0)}
                  >
                    <MdAutoDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
          onClick={() => {
            setIsCreating(true);
            setEditUserId(null);
            reset();
          }}
        >
          Add New User
        </button>
        {(isCreating || isEditing) && (
          <Modal
            onClose={() => {
              setIsCreating(false);
              setIsEditing(false);
              setEditUserId(null);
              reset();
            }}
          >
            <div className="mt-4">
              <h3 className="text-xl mb-2">
                {editUserId ? "Edit User" : "Create New User"}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                  <label className="block">Full Name</label>
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.fullName && (
                    <span className="text-red-500">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">
                    Password{" "}
                    {editUserId && "(Leave blank to keep current password)"}
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: editUserId ? false : "Password is required",
                    })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block">Phone</label>
                  <input
                    type="text"
                    {...register("contactPhone")}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Role</label>
                  <input
                    type="text"
                    {...register("role", { required: "Role is required" })}
                    className="border p-2 rounded w-full"
                  />
                  {errors.role && (
                    <span className="text-red-500">{errors.role.message}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                  >
                    {editUserId ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => {
                      setIsCreating(false);
                      setIsEditing(false);
                      setEditUserId(null);
                      reset();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Users;
