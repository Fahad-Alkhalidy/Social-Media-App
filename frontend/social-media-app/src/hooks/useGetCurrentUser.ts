import { useState, useEffect } from "react";
import {
  profileDataTypes,
  profileDataTypesDefault,
} from "../Typescript Types/profileDataTypes";
const controller = new AbortController();
const signal = controller.signal;
const useGetCurrentUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<profileDataTypes>(
    profileDataTypesDefault
  );
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
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError")
          console.log("Fetch request was aborted");
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  return { loading, error, profileData };
};

export default useGetCurrentUser;
