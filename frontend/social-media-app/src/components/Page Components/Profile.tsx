import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import UserPosts from "../Functionality Component/Profile Page Components/UserPosts";
import UserInfo from "../Functionality Component/Profile Page Components/UserInfo";
import UpdateForm from "../Functionality Component/Profile Page Components/UpdateForm";
import FriendRequestContainer from "../Functionality Component/Profile Page Components/FriendRequestContainer";
import useCreatePost from "../../hooks/useCreatePost";
import CreatePostDialog from "../Functionality Component/Profile Page Components/CreatePostDialog";

const Profile: React.FC = () => {
  const [openUpdateUserDataDialog, setUpdateUserDataDialog] =
    useState<boolean>(false);
  const [openCreateNewPostDialog, setCreateNewPostDialog] =
    useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  // Handle back button navigation
  const handleBackButtonClick = () => {
    navigate("/");
  };

  // Toggle the dialog state
  const handleOpenUpdateFormDialog = () => {
    setUpdateUserDataDialog((prevState) => !prevState);
  };

  const handleCloseCreateNewPost = () => {
    setCreateNewPostDialog(false);
  };

  return (
    <div className="bg-base-300">
      <div className="navbar bg-primary text-primary-content">
        <button className="btn btn-ghost text-xl">daisyUI</button>
        <button
          onClick={handleBackButtonClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          Back to Home
        </button>
      </div>
      <div className="flex max-h-screen w-full">
        {/* Left Section: User Posts */}
        <div className="basis-1/3">
          <UserPosts handleCreateNewPost={setCreateNewPostDialog} />
        </div>

        {/* Center Section: User Profile and Modal */}
        <div className="flex flex-col align-middle basis-1/3">
          <UserInfo />

          {/* Button to open the Update Form Modal */}
          <button
            onClick={handleOpenUpdateFormDialog}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4  hover:bg-indigo-500"
          >
            Update Your Info
          </button>

          {/* Modal for Updating User Info */}
          {openUpdateUserDataDialog && (
            <div className="modal modal-open" role="dialog">
              <div className="modal-box">
                <h3 className="text-lg font-bold">Update Your Profile</h3>
                <UpdateForm />
                <div className="modal-action">
                  <button onClick={handleOpenUpdateFormDialog} className="btn">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {openCreateNewPostDialog && (
            <div className="modal modal-open" role="dialog">
              <div className="modal-box">
                <h3 className="text-lg font-bold">Create A New Post</h3>
                {/* <UpdateForm updatedUserData={setUserData} /> */}
                <CreatePostDialog></CreatePostDialog>
                <div className="modal-action">
                  <button onClick={handleCloseCreateNewPost} className="btn">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Friend Requests */}
        <div className="basis-1/3">
          <FriendRequestContainer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
