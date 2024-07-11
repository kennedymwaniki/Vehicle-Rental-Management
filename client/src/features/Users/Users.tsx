/* eslint-disable @typescript-eslint/no-unused-vars */
import { usersAPI } from "./UserApi";
import { TUser } from "../../types/types";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { MdAutoDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Modal from "../../ui/Modal"; // Import the Modal component

const Users = () => {
  const [editUserId, setEditUserId] = useState<number | null | undefined>(null);
  const [userData, setUserData] = useState<Partial<TUser>>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newUserData, setNewUserData] = useState<Partial<TUser>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: usersData,
    error,
    isLoading: isUsersLoading,
    isError,
  } = usersAPI.useGetUsersQuery();
  console.log(usersData);

  const [updateUser] = usersAPI.useUpdateUserMutation();
  const [deleteUser] = usersAPI.useDeleteUsersMutation();
  const [createUser] = usersAPI.useCreateUsersMutation();

  const handleEdit = (user: TUser) => {
    setEditUserId(user.userId);
    setUserData(user);
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateUser({ userId: editUserId, ...userData }).unwrap();
      toast.success("User updated successfully");
      setEditUserId(null);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleCreateUser = async () => {
    setIsLoading(true);
    try {
      await createUser(newUserData).unwrap();
      toast.success("User created successfully");
      setIsCreating(false);
      setNewUserData({});
    } catch (error) {
      toast.error("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  if (isUsersLoading) {
    return <div className="text-center">Loading...</div>;
  }

  // if (isError) {
  //   return (
  //     <div>
  //       Error: {error.toString()}
  //       console.log(error)
  //     </div>
  //   );
  // }

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
                <td className="py-2 px-4 border-b">
                  {editUserId === user.userId ? (
                    <input
                      type="text"
                      value={userData.fullName || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, fullName: e.target.value })
                      }
                    />
                  ) : (
                    user.fullName
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editUserId === user.userId ? (
                    <input
                      type="text"
                      value={userData.email || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editUserId === user.userId ? (
                    <input
                      type="text"
                      value={userData.contactPhone || ""}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          contactPhone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.contactPhone
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editUserId === user.userId ? (
                    <input
                      type="text"
                      value={userData.address || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                    />
                  ) : (
                    user.address
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editUserId === user.userId ? (
                    <input
                      type="text"
                      value={userData.role || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, role: e.target.value })
                      }
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editUserId === user.userId ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        onClick={() => setEditUserId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
          onClick={() => setIsCreating(true)}
        >
          Add New User
        </button>
        {isCreating && (
          <Modal onClose={() => setIsCreating(false)}>
            <div className="mt-4">
              <h3 className="text-xl mb-2">Create New User</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateUser();
                }}
              >
                <div className="mb-2">
                  <label className="block">Full Name</label>
                  <input
                    type="text"
                    value={newUserData.fullName || ""}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        fullName: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Email</label>
                  <input
                    type="email"
                    value={newUserData.email || ""}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        email: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Phone</label>
                  <input
                    type="text"
                    value={newUserData.contactPhone || ""}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        contactPhone: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Address</label>
                  <input
                    type="text"
                    value={newUserData.address || ""}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        address: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block">Role</label>
                  <input
                    type="text"
                    value={newUserData.role || ""}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        role: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setIsCreating(false)}
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
