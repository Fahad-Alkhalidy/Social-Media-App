import useAcceptFriendRequest from "../../../hooks/useAcceptFriendRequest";
import useRejectFriendRequest from "../../../hooks/useRejectFriendRequest";
import { IFriendRequest } from "../../../Typescript Types/friendRequestType";
import Button from "../Button";
import Loading from "../Loading";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const FriendRequest: React.FC<IFriendRequest> = ({ friendRequest }) => {
  // Use the hooks at the top level of the component
  const {
    loading: acceptLoading,
    error: acceptError,
    acceptFriendRequest,
  } = useAcceptFriendRequest();
  const {
    loading: rejectLoading,
    error: rejectError,
    rejectFriendRequest,
  } = useRejectFriendRequest();

  return (
    <div className="card bg-base-200 rounded-box w-full mb-5">
      <p>{`${friendRequest.sender.username} wants to be a friend with you!`}</p>
      <div className="mt-3 flex">
        <Button onClick={() => acceptFriendRequest(friendRequest.sender)}>
          <LibraryAddCheckIcon /> Accept
        </Button>
        <Button onClick={() => rejectFriendRequest(friendRequest.sender)}>
          <ThumbDownIcon /> Reject
        </Button>
      </div>
      <p className="text-center">
        {(acceptLoading || rejectLoading) && <Loading />}
      </p>
      {acceptError && (
        <p className="text-center text-red-500 mt-4">{acceptError}</p>
      )}
      {rejectError && (
        <p className="text-center text-red-500 mt-4">{rejectError}</p>
      )}
    </div>
  );
};

export default FriendRequest;
