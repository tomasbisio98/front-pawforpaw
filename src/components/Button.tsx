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
      "bg-[#33A69A] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#2A5559] transition-colors duration-200 mt-2 mb-2 justify-center",
    secondary:
      "bg-[#F2F2F0] text-[#2A5559] border border-[#B4D9C4] hover:bg-[#B4D9C4] font-medium px-4 py-2 rounded-lg transition duration-200 mt-2 mb-2 justify-center",
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
