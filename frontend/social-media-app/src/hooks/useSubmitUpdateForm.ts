import { useEffect, useState } from "react";
import {
  UpdateUserDataForm,
  UpdateUserDataFormDefault,
} from "../Typescript Types/formType";

const controller = new AbortController();
const signal = controller.signal;

const useSubmitUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileUpdatedData, setProfileUpdatedData] =
    useState<UpdateUserDataForm>(UpdateUserDataFormDefault);

  const handleSubmission = async (formData, file) => {
    try {
      setLoading(true);
      formData.append("profilePicture", file);
      console.log(formData);
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
  return { handleSubmission, loading, error, profileUpdatedData };
};

export default useSubmitUpdateForm;
