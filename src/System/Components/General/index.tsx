import React from 'react';

interface GeneralComponentProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

export const GeneralSystemComponent: React.FC<GeneralComponentProps> = ({ children, id, className }) => {
  return (
    <div id={id || "system-general-component"} className={className || "w-full"}>
      {children}
    </div>
  );
};

export default GeneralSystemComponent;
