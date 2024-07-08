import { useGetUsersQuery } from "./UserApi";

const Users = () => {
  const { data: usersData, error, isLoading, isError } = useGetUsersQuery();

  console.log({ usersData, error, isLoading, isError });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      {usersData?.map((usr) => (
        <div key={usr.id}>{usr.fullName}</div>
      ))}
    </div>
  );
};

export default Users;
