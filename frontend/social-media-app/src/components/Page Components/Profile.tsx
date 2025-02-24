import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  profileDataTypes,
  profileDataTypesDefault,
} from "../../Typescript Types/profileDataTypes";
import {
  UpdateUserDataForm,
  UpdateUserDataFormDefault,
} from "../../Typescript Types/formType";
import { useNavigate } from "react-router-dom";
import Button from "../Functionality Component/Button";
import FriendReq from "../Functionality Component/FriendReq";
import {
  IFriendRequestComponents,
  IfriendRequestComponents,
} from "../../Typescript Types/friendRequestType";
import Loading from "../Functionality Component/Loading";
const controller = new AbortController();
const signal = controller.signal;
//import getCookie from "./getJWTCookie";
const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<profileDataTypes>(
    profileDataTypesDefault
  );
  const formyData = new FormData();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState(UpdateUserDataFormDefault);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  //const JWTToken = getCookie("jwt");
  //fetch the current user data:
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/users/${localStorage.getItem("id")}`,
          {
            signal,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //authorization: `Bearer ${JWTToken}`,
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setProfileData(result.data.doc);
          console.log(result);
        } else {
          setError(result.message || "No data available for such user!");
        }
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Fetch request was aborted");
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [isDataFetched]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const submissionData: UpdateUserDataForm = { ...formData };
    if (formData.profilePicture === null) delete submissionData.profilePicture;
    try {
      console.log(formData);
      formyData.append("profilePicture", file);
      const response = await fetch(
        `/api/v1/users/${localStorage.getItem("id")}`,
        {
          method: "PATCH",

          body: formyData,
        }
      );
      const result = await response.json();
      setProfileData(result.data.doc);
      if (response.ok) {
        setIsDataFetched(true);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/");
  };

  //fetch the friend requests:
  const [allUserFriendRequests, setAllUserFriendRequests] =
    useState<[{ IFriendRequestComponents }]>();

  useEffect(() => {
    const fetchUserReq = async () => {
      try {
        const response = await fetch(
          `/api/v1/friendReqs/${localStorage.getItem("id")}`,
          { signal }
        );
        const result = await response.json();

        if (response.ok) {
          setAllUserFriendRequests(result.data.userRequests);
        } else {
          throw "Error While Fetching";
        }
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Fetch request was aborted");
        console.log(error);
      }
    };
    fetchUserReq();
  }, []);
  console.log(allUserFriendRequests);
  return (
    <div className="w-full">
      {/* Loading Indicator */}
      <p className="text-center">{loading ? <Loading /> : ""}</p>

      <div className="flex flex-col lg:flex-row gap-5 mt-5">
        {/* Followed Pages Section */}
        <div className="card bg-base-300 rounded-box flex justify-center items-center h-fit basis-1/3 p-5">
          <h3 className="text-xl font-semibold">Followed Pages</h3>
          {/* Back Button */}
          <button
            onClick={handleBackButtonClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-500"
          >
            Back to Home
          </button>
        </div>

        {/* User Profile Section */}
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

          {/* Profile Update Form */}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <form onSubmit={handleSubmission} className="space-y-6">
              <div className="flex flex-col items-center">
                <input
                  id="profilePicture"
                  type="file"
                  className="file-input file-input-primary w-full"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="profilePicture"
                />
                <input
                  id="username"
                  type="text"
                  placeholder="New username"
                  className="input input-primary mt-4 w-full"
                  onChange={handleChange}
                  name="username"
                  value={formData.username}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="New email"
                  className="input input-primary mt-4 w-full"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                />
                <Button>Submit</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="card bg-base-300 rounded-box flex flex-col justify-start items-center max-h-screen basis-1/3 overflow-y-scroll">
          <p className="text-center text-lg font-medium mt-5">
            Friend Requests
          </p>
          <div className="">
            {allUserFriendRequests?.map(
              (friendRequest: IfriendRequestComponents) => (
                <FriendReq
                  key={friendRequest._id}
                  friendRequest={friendRequest}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Profile;
