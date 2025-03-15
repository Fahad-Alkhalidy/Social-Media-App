import { useForm } from "react-hook-form";

type FormFields = {
  media: FileList;
  content: string;
  hashtag: string;
  visibility: string;
};

const CreatePostDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  // Handle form submission
  const onSubmit = async (data: FormFields) => {
    const formData = new FormData();

    // Append the form fields to FormData
    const id = localStorage.getItem("id");
    if (id) formData.append("user", id);
    formData.append("content", data.content);
    formData.append("hashtag", data.hashtag);
    formData.append("visibility", data.visibility);

    // Append the media (ensure it's handled as a file)
    if (data.media && data.media.length > 0) {
      formData.append("media", data.media[0]); // Append the first file
    }

    try {
      // Send the FormData as a POST request to the server
      const response = await fetch("/api/v1/posts/createNewPost/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Post Created!");
      } else {
        alert("Post Failed To Be Created!");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while submitting the post.");
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
      >
        <div className="flex flex-col items-center">
          <input
            {...register("media", { required: "The Post Must Have An Image" })}
            id="media"
            type="file"
            className="file-input file-input-primary w-full"
            name="media"
          />
          {errors.media && <p>{errors.media.message}</p>}{" "}
          {/* Error handling for file input */}
          <input
            {...register("content", {
              required: "The Post Must Contain A Content",
            })}
            id="content"
            type="text"
            placeholder="Content"
            className="input input-primary mt-4 w-full"
            name="content"
          />
          {errors.content && <p>{errors.content.message}</p>}{" "}
          {/* Error handling for content */}
          <input
            {...register("hashtag")}
            id="hashtag"
            type="text"
            placeholder="Hashtag"
            className="input input-primary mt-4 w-full"
            name="hashtag"
          />
          <select
            {...register("visibility", { required: true })}
            className="input input-primary mt-4 w-full mb-4"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostDialog;
