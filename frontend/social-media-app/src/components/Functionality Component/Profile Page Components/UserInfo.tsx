import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import Loading from "../Loading";

const UserInfo = ({ setUserInfo }) => {
  const { loading, error, profileData } = useGetCurrentUser();
  setUserInfo(profileData);
  return (
    <div className="card bg-base-300 rounded-box flex flex-col items-center justify-center h-fit basis-1/3 p-5">
      <div className="text-center space-y-4">
        <p className="font-medium text-lg">{profileData.coverPhoto}</p>
        <div className="flex justify-center items-center">
          <img
            className="rounded-full border-4 border-indigo-600"
            height={100}
            width={100}
            src={`http://localhost:3000/image/users/${profileData.profilePicture}`}
            alt="Profile"
          />
        </div>
        <p>
          <strong>Username:</strong> {profileData.username}
        </p>
        <p>
          <strong>Email:</strong> {profileData.email}
        </p>
        <p>
          <strong>Name:</strong> {profileData.fullname}
        </p>
        <p>
          <strong>Role:</strong> {profileData.role}
        </p>
        <p>
          <strong>Joined:</strong> {profileData.createdAt}
        </p>
      </div>
      <p className="text-center">{loading ? <Loading></Loading> : ""}</p>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UserInfo;
