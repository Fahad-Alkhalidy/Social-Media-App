import React, { ReactNode } from "react";

interface ButtonProps {
  Children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button
      type="submit"
      className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;
