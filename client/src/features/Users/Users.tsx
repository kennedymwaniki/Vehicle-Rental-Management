import { usersAPI } from "./UserApi";
import { TUser } from "../../types/types";
// interface User {
//   userId: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   address: string;
// }

const Users = () => {
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = usersAPI.useGetUsersQuery();

  console.log({ usersData, error, isLoading, isError });

  const handleEdit = (userId: number) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit logic here
  };

  const handleDelete = (userId: number) => {
    console.log(`Delete user with ID: ${userId}`);
    // Implement delete logic here
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.toString()}</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEdit(user.userId)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
