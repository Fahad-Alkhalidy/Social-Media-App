import { useState } from "react";
import useAcceptFriendRequest from "../../../hooks/useAcceptFriendRequest";
import { IFriendRequest } from "../../../Typescript Types/friendRequestType";
import Button from "../Button";
import useRejectFriendRequest from "../../../hooks/useRejectFriendRequest";
import Loading from "../Loading";

const FriendReqest: React.FC<IFriendRequest> = ({ friendRequest }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //Patch Request To Change The Status To Accept, and then remove req from UI
  const Accept = () => {
    const { loading, error } = useAcceptFriendRequest(friendRequest.sender);
    setLoading(loading);
    setError(error);
  };
  //Patch Request To Change The Status To Reject, and then remove req from UI
  const Reject = () => {
    const { loading, error } = useRejectFriendRequest(friendRequest.sender);
    setLoading(loading);
    setError(error);
  };
  return (
    <div className="card bg-base-200 rounded-box w-full mb-5">
      <p>{`${friendRequest.sender.username} wants to be a friend with you!`}</p>
      <Button onClick={Accept}>Accept</Button>
      <Button onClick={Reject}>Reject</Button>
      <p className="text-center">{loading ? <Loading></Loading> : ""}</p>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FriendReqest;
