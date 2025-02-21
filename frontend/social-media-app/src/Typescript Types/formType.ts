export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  fullname: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdateUserDataForm {
  username: string;
  email: string;
  profilePicture?: File | null;
}

export const UpdateUserDataFormDefault: UpdateUserDataForm = {
  username: "",
  email: "",
  profilePicture: null,
};
