import { ChangeEvent } from "react";

export const handleChangeInForm = (
  e: ChangeEvent<HTMLInputElement>,
  setFormData
) => {
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
