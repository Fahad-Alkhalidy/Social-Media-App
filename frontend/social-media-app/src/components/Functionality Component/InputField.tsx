interface InputFieldProps {
  value: string;
  handleChange: (even: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
const InputField: React.FC<InputFieldProps> = ({
  value,
  handleChange,
  name,
}) => {
  return (
    <div>
      <label htmlFor="fullname" className="block text-sm/6 font-medium">
        {name}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type="{name}"
          value={value}
          onChange={handleChange}
          required
          autoComplete={name}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default InputField;
