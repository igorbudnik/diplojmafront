import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mymap.css";
import L from "leaflet";
import mapStyle from "./mymap.module.css";
import { IPlace } from "../App";
import MyMarker from "./marker";
import customIconUrl from "../icon.png";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { createClusterCustomIcon } from "./cluster";
import { DataContext, ParamsContext } from "../context";

type Marker = L.MarkerClusterGroup;
type Map = L.Map;

export const makeArrayOfCoords = (item: string): number[] => {
  return item.replaceAll("'", "").slice(1, -1).split(",").map(Number);
};

// Создаем кастомную иконку
const customIcon = L.icon({
  iconUrl: customIconUrl,
  iconSize: [16, 16],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const MyMap = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [markerData, setMarkerData] = useState<IPlace | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker | null>(null);
  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const state = useContext(ParamsContext);
  // const dataState = useContext(DataContext);

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current) return;

    try {
      const mapInstance = L.map(mapRef.current, {
        maxZoom: 18,
        minZoom: 3,
        zoomControl: true,
      }).setView([54.70171133622425, 38.73950413311637], 4);

      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?lang=ru"
      ).addTo(mapInstance);

      mapInstanceRef.current = mapInstance;

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    } catch (err) {
      setError("Ошибка инициализации карты");
      console.error("Leaflet init error:", err);
    }
  }, []);

  const onClickPlaceHandler = (data: IPlace | null) => {
    setOpenModal(!isOpenModal);
    setMarkerData(data);
  };

  useEffect(() => {
    setLoaded(true);

    if (!mapInstanceRef.current) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/factories/search/?${state?.searchParams.toString()}`
        );

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const data = await response.json();

        // Очищаем предыдущие маркеры
        if (markersRef.current) {
          markersRef.current.clearLayers();
        }

        // Создаем группу кластеров
        const markerClusterGroup = new L.MarkerClusterGroup({
          iconCreateFunction: createClusterCustomIcon,
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true,
        });
        markersRef.current = markerClusterGroup;
        // dataState?.setDataState(data);
        // dataState?.setCount(data.total);
        // Добавляем маркеры в группу кластеров
        data.forEach((item: IPlace) => {
          try {
            const arr = makeArrayOfCoords(
              item?.coordinates as unknown as string
            );

            if (arr[1] && arr[0]) {
              const marker = L.marker([arr[1], arr[0]], {
                icon: customIcon,
              }).on({
                click: () => onClickPlaceHandler(item),
              });
              markerClusterGroup.addLayer(marker);
            }
          } catch (markerErr) {
            console.error("Marker error:", markerErr);
          }
        });

        // Добавляем группу кластеров на карту
        mapInstanceRef.current?.addLayer(markerClusterGroup);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
          console.error("Ошибка загрузки данных:", err);
        }
      }
    };

    fetchData()
      .then(() => {
        fetch(
          "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/RUS.geo.json"
        )
          .then((res) => res.json())
          .then((data) => {
            L.geoJSON(data, {
              style: {
                fillColor: "#CCCAFF",
                weight: 1,
              },
            }).addTo(mapInstanceRef.current!);
          })
          .catch((err) => setError(err));
      })
      .then(() => setLoaded(false))
      .catch((err) => setError(err));

    return () => {
      if (markersRef.current) {
        markersRef.current.clearLayers();
      }
    };
  }, [state?.searchParams.toString()]);

  return (
    <div className={mapStyle.map}>
      <div className={mapStyle.border}>
        {error ? (
          "Возникла ошибка. Попробуйте обновить страницу"
        ) : (
          <div
            ref={mapRef}
            id="map"
            style={{
              height: "650px",
              width: "98%",
              visibility: error ? "hidden" : "visible",
            }}
          >
            {isLoaded && (
              <div className="loader-center">
                <div className="map-loading">Загрузка карты...</div>
              </div>
            )}
          </div>
        )}

        {isOpenModal ? (
          <MyMarker data={markerData} closeModal={onClickPlaceHandler} />
        ) : null}
      </div>
    </div>
  );
};

export default MyMap;
