//import { ChangeEvent, FormEvent, useEffect, useState } from "react";
//import FriendReq from "../Functionality Component/FriendReq";

// import {
//   UpdateUserDataForm,
//   UpdateUserDataFormDefault,
//} from "../../Typescript Types/formType";
import { useNavigate } from "react-router-dom";
//import Button from "../Functionality Component/Button";

//import Loading from "../Functionality Component/Loading";
//import Post from "../Functionality Component/Post";
import UserPosts from "../Functionality Component/Profile Page Components/UserPosts";
import UserInfo from "../Functionality Component/Profile Page Components/UserInfo";
import UpdateForm from "../Functionality Component/Profile Page Components/UpdateForm";
import FriendRequestContainer from "../Functionality Component/Profile Page Components/FriendRequestContainer";
import { useState } from "react";

//import getCookie from "./getJWTCookie";
const Profile: React.FC = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/");
  };

  //<p className="text-center">{loading ? <Loading /> : ""}</p>
  return (
    <div className="w-full">
      {/* Loading Indicator */}

      <div className="flex flex-col lg:flex-row gap-5 mt-5">
        {/* Followed Pages Section */}
        <UserPosts></UserPosts>
        {/* Back Button */}
        <button
          onClick={handleBackButtonClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-500"
        >
          Back to Home
        </button>
      </div>

      {/* User Profile Section */}
      <UserInfo></UserInfo>

      {/* Profile Update Form */}
      <UpdateForm updatedUserData={setUserData}></UpdateForm>

      {/* Additional Content Section */}
      <FriendRequestContainer></FriendRequestContainer>
      {/* Error Message */}
    </div>
  );
  //{error && <p className="text-center text-red-500 mt-4">{error}</p>}
};

export default Profile;
