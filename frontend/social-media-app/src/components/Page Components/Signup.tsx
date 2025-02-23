import { SignupFormData } from "../../Typescript Types/formType";
import SigningForm from "../Functionality Component/SigningForm";

const Signup: React.FC = () => {
  const initialSignupData: SignupFormData = {
    username: "",
    email: "",
    fullname: "",
    password: "",
    passwordConfirm: "",
  };
  return <SigningForm formType={initialSignupData} type="signup" />;
};

export default Signup;
