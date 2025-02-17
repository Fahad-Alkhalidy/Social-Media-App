import { LoginFormData } from "./formType";
import SigningForm from "./SigningForm";

const Login: React.FC = () => {
  const initialLoginData: LoginFormData = {
    email: "",
    password: "",
  };
  return <SigningForm formType={initialLoginData} type="login" />;
};

export default Login;
