import "leaflet/dist/leaflet.css";
import "./mymap.css";
import mapStyle from "./mymap.module.css";
import { IPlace } from "../App";
import Modal from "../Modal/modal";

interface IMarkerData {
  data: IPlace | null;
  closeModal: (data: IPlace | null) => void;
}

const MyMarker = ({ data, closeModal }: IMarkerData) => {
  return (
    <>
      <Modal setClosed={closeModal}>
        <h1 className={mapStyle.h1}>Информация о субъекте</h1>
        <div className={mapStyle.blocks}>
          <section className={mapStyle.head}>
            <img
              src={`https://okn-mk.mkrf.ru/maps/show/id/${data?.photoTitle}/preview.jpg`}
              width={500}
              height={320}
            />
          </section>
          <div className={mapStyle.info}>
            <div className={mapStyle.objName}>{data?.nativeName}</div>
            <section className={mapStyle.objAddress}>
              <b>Полный адрес:</b> {data?.fullAddress}
            </section>
            <section className={mapStyle.objCategory}>
              <b>Категория субъекта:</b> {data?.category}
            </section>
          </div>
        </div>

        {data?.securityInfo ? (
          <div className={mapStyle.main}>
            <div className={mapStyle.objDesc}>{data?.securityInfo}</div>
          </div>
        ) : (
          <div className={mapStyle.noInfo}>
            Нет информации о данном субъекте
          </div>
        )}
      </Modal>
    </>
  );
};

export default MyMarker;
