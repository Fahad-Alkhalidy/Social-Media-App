import { useState } from "react";
import { UpdateUserDataFormDefault } from "../Typescript Types/formType";

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const [formData, setFormData] = useState(UpdateUserDataFormDefault);
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
export default handleChange;
