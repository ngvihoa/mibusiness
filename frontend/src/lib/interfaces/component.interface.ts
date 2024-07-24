export type ModalTextProps = {
  headingText: string;
  bodyText: string;
};

export type ButtonProps = {
  onClickFunction?: () => void;
  className?: string;
  variant?: string;
  children: React.ReactNode;
};
