const formyData = new FormData();
const [file, setFile] = useState();

const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  const submissionData: UpdateUserDataForm = { ...formData };
  if (formData.profilePicture === null) delete submissionData.profilePicture;
  try {
    console.log(formData);
    formyData.append("profilePicture", file);
    const response = await fetch(
      `/api/v1/users/${localStorage.getItem("id")}`,
      {
        method: "PATCH",

        body: formyData,
      }
    );
    const result = await response.json();
    setProfileData(result.data.doc);
    if (response.ok) {
      setIsDataFetched(true);
    }
  } catch (error) {
    console.log(error);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

export default handleSubmission;
