import { ButtonProps } from "src/lib/type";

const FillButton = ({
  onClickFunction,
  className,
  variant,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

export default FillButton;
