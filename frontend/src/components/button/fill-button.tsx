import { ButtonProps } from "lib/interfaces/component.interface";

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
