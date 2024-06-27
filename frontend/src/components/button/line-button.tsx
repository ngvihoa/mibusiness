import { ButtonProps } from "src/lib/type";

const LineButton = ({
  onClickFunction,
  className,
  variant,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-outline-${variant} ${className}`}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

export default LineButton;
