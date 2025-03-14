import { ChangeEvent, FormEvent, useState } from "react";
import { IPostForm, PostFormDefault } from "../../../Typescript Types/formType";
import Loading from "../Loading";
import Button from "../Button";
import useCreatePost from "../../../hooks/useCreatePost";

const CreatePostDialog = () => {
  const [file, setFile] = useState<File | undefined>();
  const [formData, setFormData] = useState(PostFormDefault);
  const { loading, error, handleSubmission } = useCreatePost();

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

  const handleCreatePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formInfo = new FormData();
    // Create a new FormData object
    //formInfo.append("media", file);
    // Log formData before appending
    console.log("FormData before appending:", formData);

    // Append all form data to formInfo
    Object.keys(formData).forEach((key) => {
      // Check if formData key has a value before appending
      const value = formData[key as keyof IPostForm];
      if (value) {
        formInfo.append(key as keyof IPostForm, value as string | Blob);
        //console.log(`Appended ${key}: ${value}`); // Debugging log
      }
    });
    // Send the form data to handleSubmission
    console.log(formInfo);
    console.log(file);
    handleSubmission(formInfo, file);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form onSubmit={handleCreatePost} className="space-y-6">
        <div className="flex flex-col items-center">
          <input
            id="media"
            type="file"
            className="file-input file-input-primary w-full"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : undefined)
            }
            name="media"
          />
          <input
            id="content"
            type="text"
            placeholder="content"
            className="input input-primary mt-4 w-full"
            onChange={handleChange}
            name="content"
            value={formData.content}
          />
          <input
            id="hashtag"
            type="text"
            placeholder="hashtag"
            className="input input-primary mt-4 w-full"
            onChange={handleChange}
            name="hashtag"
            value={formData.hashtag}
          />
          <input
            id="visibility"
            type="text"
            placeholder="visibility"
            className="input input-primary mt-4 w-full  mb-4"
            onChange={handleChange}
            name="visibility"
            value={formData.visibility}
          />
          <Button>Submit</Button>
        </div>
      </form>
      <div>{loading ? <Loading /> : ""}</div>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreatePostDialog;
