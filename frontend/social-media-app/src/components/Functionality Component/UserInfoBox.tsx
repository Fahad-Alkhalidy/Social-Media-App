import { IUser } from "../../Typescript Types/userType";
const handleFollow = async (userId: string) => {
  try {
    const response = await fetch("/api/v1/friendReqs/createAFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: localStorage.getItem("id"),
        receiver: userId,
      }),
    });
    const result = await response.json();
    if (response.ok) console.log(result);
  } catch (error) {
    console.log(error);
  }
};
const UserInfoBox: React.FC<IUser> = ({ User, displayFollowButtonAndBio }) => {
  const userId = User._id;
  return (
    <div>
      <div className="card card-dash bg-base-100 w-96 hover:bg-gray-600">
        <div className="card-body">
          <img
            height={50}
            width={50}
            src={User.profilePicture}
            className="rounded-full border-4 border-indigo-600"
          ></img>
          <h2 className="card-title">@{User.username}</h2>
          {displayFollowButtonAndBio ? (
            <div>
              <p>{User.bio}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleFollow(userId)}
                >
                  Follow
                </button>
              </div>
            </div>
          ) : (
            <p>Last Chat</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;
