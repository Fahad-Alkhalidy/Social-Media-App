import { ChangeEvent, useState } from "react";
import {
  PostFormDefault,
  UpdateUserDataFormDefault,
} from "../Typescript Types/formType";

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const [formData, setFormData] = useState(PostFormDefault);
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
  return { formData };
};
export default handleChange;
