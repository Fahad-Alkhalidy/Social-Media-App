import { ChangeEvent, FormEvent, useState } from "react";
import { handleChangeInForm } from "./handleChange";
import { UpdateUserDataFormDefault } from "../../../Typescript Types/formType";
import Loading from "../Loading";
import Button from "../Button";
import useCreatePost from "../../../hooks/useCreatePost";

const CreatePostDialog = () => {
  const formInfo = new FormData();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState(UpdateUserDataFormDefault);
  const { loading, error, handleSubmission } = useCreatePost();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeInForm(e, setFormData);
  };

  const handleCreatePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmission(formInfo, file);
    //const submissionData: UpdateUserDataForm = { ...formData };
    //if (formData.profilePicture === null) delete submissionData.profilePicture;
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form onSubmit={handleCreatePost} className="space-y-6">
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

export default CreatePostDialog;
