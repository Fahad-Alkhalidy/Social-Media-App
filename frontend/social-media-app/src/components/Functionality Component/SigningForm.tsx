import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Loading from "./Loading";
import { LoginFormData, SignupFormData } from "../../Typescript Types/formType";
import storeIdInLocalStorage from "../../storeInLocalStorage";

interface SigningFormProps {
  formType: LoginFormData | SignupFormData;
  type: "login" | "signup";
}

const SigningForm: React.FC<SigningFormProps> = ({ formType, type }) => {
  const [formData, setFormData] = useState(formType);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fields =
    type === "login"
      ? ["email", "password"]
      : ["username", "email", "fullname", "password", "passwordConfirm"];

  //Handle Form Fields Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Handle Form Submission:
  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //basic client side password validation:
    if (type === "signup" && formData.password != formData.passwordConfirm) {
      setError("Password Do Not Match");
      return;
    }
    setLoading(true);
    setError(null);

    //sending a POST req:
    try {
      const response = await fetch(`/api/v1/users/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      storeIdInLocalStorage(result.data.user._id);
      if (response.ok) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Succussful!`);
        navigate("/");
      } else {
        setError(result.message || "Something went wrong, please try again!");
      }
    } catch (error) {
      console.log(error);
      setError("Network Error Occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="C:\Users\fahad\Desktop\Social Media Application\frontend\social-media-app\src\assets\react.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmission} className="space-y-6">
            {fields.map((el) => (
              <InputField
                key={el}
                value={formData[el as keyof typeof formData]}
                handleChange={handleChange}
                name={el}
              />
            ))}
            <div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Loading loading={loading} />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SigningForm;
/* eslint no-use-before-define: 0 */
