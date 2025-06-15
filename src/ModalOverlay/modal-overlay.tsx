import { IPlace } from "../App";
import modalStyle from "./modal-overlay.module.css";

export interface PropsOverlay {
  changeOpen: (data: IPlace | null) => void;
}

const ModalOverlay = (props: PropsOverlay) => {
  const { changeOpen } = props;

  return (
    <div onClick={() => changeOpen(null)} className={modalStyle.full}></div>
  );
};

export default ModalOverlay;
