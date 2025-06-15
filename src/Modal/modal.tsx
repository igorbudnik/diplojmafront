import ReactDOM from "react-dom";
import modalStyle from "./modal.module.css";
import { ReactNode, useEffect, useState } from "react";
import ModalOverlay from "../ModalOverlay/modal-overlay";
import x from "../x.png";
import { IPlace } from "../App";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

export interface ModalProps {
  children: ReactNode;
  setClosed: (data: IPlace | null) => void;
}

const Modal = (props: ModalProps) => {
  const { setClosed, children } = props;

  const modalEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setClosed(null);
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", modalEsc);

    return () => document.removeEventListener("keyup", modalEsc);
  }, []);
  return ReactDOM.createPortal(
    <div tabIndex={0} className={modalStyle.full}>
      <ModalOverlay changeOpen={setClosed} />
      <div className={modalStyle.modal}>
        <section id="head" className={modalStyle.section}>
          <div className={`close_icon ${modalStyle.close}`}>
            <img
              onClick={() => setClosed(null)}
              src={x}
              className={modalStyle.close}
            />
          </div>
          {children}
        </section>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
