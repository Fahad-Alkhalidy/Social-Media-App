import useGetFriendRequests from "../../../hooks/useGetFriendRequests";
import FriendReqest from "./FriendRequest";
import { IFriendRequestComponents } from "../../../Typescript Types/friendRequestType";
import Loading from "../Loading";
const FriendRequestContainer = () => {
  const { error, loading, allUserFriendRequests } = useGetFriendRequests();
  return (
    <div className="card bg-base-300 rounded-box flex flex-col justify-start items-center min-h-150 basis-1/3 overflow-y-scroll">
      <p className="text-center text-lg font-medium mt-5">Friend Requests</p>
      <div className="">
        {allUserFriendRequests?.map(
          (friendRequest: IFriendRequestComponents) => (
            <FriendReqest
              key={friendRequest._id}
              friendRequest={friendRequest}
            />
          )
        )}
      </div>
      <p className="text-center">{loading ? <Loading></Loading> : ""}</p>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FriendRequestContainer;
