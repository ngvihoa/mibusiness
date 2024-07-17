import { ButtonProps } from "lib/type";

const LineButton = ({ onClickFunction, className, children }: ButtonProps) => {
  return (
    <button
      className={`btn line-button ${className}`}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

export default LineButton;
