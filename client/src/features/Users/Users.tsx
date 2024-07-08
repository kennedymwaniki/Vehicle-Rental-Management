import { usersAPI } from "./UserApi";

const Users = () => {
  const {
    data: usersData,
    error,
    isLoading,
    isError,
  } = usersAPI.useGetUsersQuery();

  console.log({ usersData, error, isLoading, isError });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      <p className="text-yellow-400">Users</p>
      {usersData?.map((usr) => (
        <div key={usr.userId}>
          <>
            {usr.userId}:{usr.fullName}
          </>
        </div>
      ))}
    </div>
  );
};

export default Users;
