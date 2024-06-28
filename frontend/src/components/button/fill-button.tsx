import { ButtonProps } from "src/lib/type";

const FillButton = ({ onClickFunction, className, children }: ButtonProps) => {
  return (
    <button
      className={`btn fill-button ${className}`}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

export default FillButton;
