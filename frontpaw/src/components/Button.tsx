import React, { FC } from "react";
import cs from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textContent: string;
  variant: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({
  textContent,
  variant,
  className,
  ...props
}) => {
  const cssColor = {
    primary:
      "bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 mt-2 mb-2 justify-center",
    secondary:
      "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 font-medium px-4 py-2 rounded-lg transition duration-200 mt-2 mb-2 justify-center",
  };
  return (
    <button
      className={cs(cssColor[variant], "rounded-md", className)}
      {...props}
    >
      {textContent}
    </button>
  );
};

export default Button;
