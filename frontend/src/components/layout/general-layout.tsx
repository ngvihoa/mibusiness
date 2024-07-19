import React from "react";

interface GeneralLayoutProps {
  name: string;
  children: React.ReactNode;
  classContainer: string;
}

const GeneralLayout = ({
  name,
  children,
  classContainer,
}: GeneralLayoutProps) => {
  return (
    <div
      className={`${classContainer} general-layout-container container mt-20`}
    >
      <h3>{name}</h3>
      {children}
    </div>
  );
};

export default GeneralLayout;
