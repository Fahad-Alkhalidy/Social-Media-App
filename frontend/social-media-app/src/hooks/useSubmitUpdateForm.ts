import { useEffect, useState } from "react";
import {
  UpdateUserDataForm,
  UpdateUserDataFormDefault,
} from "../Typescript Types/formType";

const controller = new AbortController();
const signal = controller.signal;

const useSubmitUpdateForm = (formData, file) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileUpdatedData, setProfileUpdatedData] =
    useState<UpdateUserDataForm>(UpdateUserDataFormDefault);
  useEffect(() => {
    const handleSubmission = async () => {
      try {
        setLoading(true);
        console.log(formData);
        formData.append("profilePicture", file);
        const response = await fetch(
          `/api/v1/users/${localStorage.getItem("id")}`,
          {
            method: "PATCH",
            signal,
            body: formData,
          }
        );
        const result = await response.json();
        if (response.ok) {
          setProfileUpdatedData(result.data.doc);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError")
          console.log("Fetch request was aborted");
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    handleSubmission();
  }, [formData, file]);
  return { loading, error, profileUpdatedData };
};

export default useSubmitUpdateForm;
