import { ChangeEvent, FormEvent, useState } from "react";
import {
  UpdateUserDataForm,
  UpdateUserDataFormDefault,
} from "../../../Typescript Types/formType";
import useSubmitUpdateForm from "../../../hooks/useSubmitUpdateForm";
import Button from "../Button";
import Loading from "../Loading";

const UpdateForm = ({ updateUserData }) => {
  const formInfo = new FormData();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState(UpdateUserDataFormDefault);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const HandleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { loading, error, profileUpdatedData } = useSubmitUpdateForm(
      formInfo,
      file
    );
    updateUserData(profileUpdatedData);
    setLoading(loading);
    setError(error);
    const submissionData: UpdateUserDataForm = { ...formData };
    if (formData.profilePicture === null) delete submissionData.profilePicture;
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form onSubmit={HandleSubmission} className="space-y-6">
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
      <p className="text-center">{loading ? <Loading></Loading> : ""}</p>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};
export default UpdateForm;
