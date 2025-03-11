import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-22 h-10 ml-3 rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;
