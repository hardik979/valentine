import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`px-6 py-2 text-white rounded-xl transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
