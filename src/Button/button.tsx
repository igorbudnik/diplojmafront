import React, { SyntheticEvent } from "react";
import buttonStyle from "./button.module.css";

interface button {
  onClick: (e: SyntheticEvent) => void;
  size?: string;
  children?: React.ReactNode;
  isDisabled: boolean;
}

const Button: React.FC<button> = ({ onClick, size, children, isDisabled }) => {
  return (
    <>
      {!isDisabled ? (
        <button
          className={buttonStyle.button}
          disabled={false}
          onClick={(e) => onClick(e)}
        >
          {children}
        </button>
      ) : (
        <button className={buttonStyle.active}>{children}</button>
      )}
    </>
  );
};

export default Button;
