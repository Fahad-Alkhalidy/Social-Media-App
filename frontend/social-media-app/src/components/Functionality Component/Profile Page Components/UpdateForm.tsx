import { ChangeEvent, FormEvent, useState } from "react";
import {
  UpdateUserDataForm,
  UpdateUserDataFormDefault,
} from "../../../Typescript Types/formType";
import useSubmitUpdateForm from "../../../hooks/useSubmitUpdateForm";
import Button from "../Button";
import Loading from "../Loading";
import { handleChangeInForm } from "./handleChange";

const UpdateForm = () => {
  const formInfo = new FormData();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState(UpdateUserDataFormDefault);
  const { handleSubmission, loading, error } = useSubmitUpdateForm();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeInForm(e, setFormData);
  };

  const handleFormSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formInfo);
    handleSubmission(formInfo, file);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form onSubmit={handleFormSubmission} className="space-y-6">
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
            className="input input-primary mt-4 w-full mb-4"
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
