import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { profileDataTypes, profileDataTypesDefault } from "./profileDataTypes";
import {
  UpdateUserDataForm,
  UpdateUserDataFormDefault,
} from "../Typescript Types/formType";
//import getCookie from "./getJWTCookie";
const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<profileDataTypes>(
    profileDataTypesDefault
  );
  const [formData, setFormData] = useState(UpdateUserDataFormDefault);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [formData]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const submissionData: UpdateUserDataForm = { ...formData };
    if (formData.profilePicture === null) delete submissionData.profilePicture;
    try {
      console.log(formData);
      console.log(JSON.stringify(submissionData));
      const response = await fetch(
        `/api/v1/users/${localStorage.getItem("id")}`,
        {
          method: "PATCH",
          body: JSON.stringify(submissionData),
        }
      );
      const result = await response.json();
      setProfileData(result.data.doc);
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
  return (
    <>
      <p>{loading ? "loading..." : ""}</p>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
          {
            <div>
              <p>{profileData.coverPhoto}</p>
              <p>{profileData.profilePicture}</p>
              <p>{profileData.username}</p>
              <p>{profileData.email}</p>
              <p>{profileData.fullname}</p>
              <p>{profileData.role}</p>
              <p>{profileData.createdAt}</p>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmission} className="space-y-6">
                  <input
                    id="profilePicture"
                    type="file"
                    className="file-input file-input-primary"
                    onChange={handleChange}
                    name="profilePicture"
                  />
                  <input
                    id="username"
                    type="text"
                    placeholder="new user name"
                    className="input input-primary"
                    onChange={handleChange}
                    name="username"
                    value={formData["username" as keyof typeof formData]}
                  />
                  <input
                    id="email"
                    type="text"
                    placeholder="new email"
                    className="input input-primary"
                    onChange={handleChange}
                    name="email"
                    value={formData["email" as keyof typeof formData]}
                  />
                  <input
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  ></input>
                </form>
              </div>
            </div>
          }
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
          content
        </div>
      </div>
      <p>{error}</p>
    </>
  );
};

export default Profile;
