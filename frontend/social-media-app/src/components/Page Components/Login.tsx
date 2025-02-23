import { LoginFormData } from "../../Typescript Types/formType";
import SigningForm from "../Functionality Component/SigningForm";

const Login: React.FC = () => {
  const initialLoginData: LoginFormData = {
    email: "",
    password: "",
  };
  return <SigningForm formType={initialLoginData} type="login" />;
};

export default Login;
