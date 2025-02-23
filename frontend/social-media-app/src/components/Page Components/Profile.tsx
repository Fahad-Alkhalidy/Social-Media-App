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

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/users/${localStorage.getItem("id")}`,
          {
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
  return (
    <div className="w-full">
      {/* Loading Indicator */}
      <p className="text-center">{loading && "Loading..."}</p>

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
                <button
                  type="submit"
                  className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="card bg-base-300 rounded-box flex justify-center items-center h-fit basis-1/3 p-5">
          <p className="text-center text-lg font-medium">Content</p>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Profile;
