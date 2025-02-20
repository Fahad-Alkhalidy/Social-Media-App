import { useEffect, useState } from "react";
import { profileDataTypes, profileDataTypesDefault } from "./profileDataTypes";
//import getCookie from "./getJWTCookie";
const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<profileDataTypes>(
    profileDataTypesDefault
  );
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
  }, []);
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
