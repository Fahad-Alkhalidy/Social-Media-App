import { SignupFormData } from "./formType";
import SigningForm from "./SigningForm";

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
