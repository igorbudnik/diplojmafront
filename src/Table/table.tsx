import "./table.css";
import {
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Paginator from "../Paginator/paginator";
import { DataContext, ParamsContext } from "../context";
import { makeArrayOfCoords } from "../MyMap/mymap";
import { IPlace } from "../App";
import MyMarker from "../MyMap/marker";

const TableComponent = () => {
  const dataState = useContext(DataContext);
  const paramsState = useContext(ParamsContext);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IPlace | null>(null);
  const onClickPlaceHandler = (data: IPlace | null) => {
    setOpenModal(!isOpenModal);
    setTableData(data);
  };

  const changePage = useCallback((e: SyntheticEvent, page: number) => {
    e.preventDefault();
    dataState?.setPage(page);
  }, []);

  const count = useMemo(() => {
    return Array.from(
      {
        length: dataState?.count ? dataState?.count / 10 : 0,
      },
      (_, i) => i + 1
    );
  }, [dataState?.count]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/factories/table/?offset=${
        dataState?.page! * 10 - 10
      }&` + paramsState?.searchParams
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(
        (data) => (
          dataState?.setDataState(data.data),
          dataState?.setCount(data.total),
          setLoaded(true)
        )
      );
  }, [dataState?.page, paramsState?.searchParams.toString()]);

  const columns = [
    "Наименование",
    "Полный адрес",
    "Регион",
    "Дата основания",
    "Координаты на карте",
  ];

  return (
    <div className="table-container">
      {isLoaded ? (
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataState?.dataState?.map((row, index) => (
              <tr onClick={() => onClickPlaceHandler(row)} key={index}>
                <td title={row.nativeName}>{row.nativeName}</td>
                <td title={row.fullAddress}>{row.fullAddress}</td>
                <td title={`${row.regionId}`}>{row.regionId}</td>
                <td title={row.createDate}>{row.createDate}</td>
                {row.coordinates !== "nan" ? (
                  <td title={`${row.coordinates}`}>
                    {String(
                      makeArrayOfCoords(row.coordinates as unknown as string)
                    ).replace(",", ", ")}
                  </td>
                ) : (
                  <td>Нет данных</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span>Загрузка данных таблицы...</span>
      )}
      {isOpenModal ? (
        <MyMarker data={tableData} closeModal={onClickPlaceHandler} />
      ) : null}
      <section className="section">
        <Paginator
          changePage={changePage}
          currentPage={dataState?.page!}
          count={count}
        />
        <span className="span">Найдено записей - {dataState?.count}</span>
      </section>
    </div>
  );
};

export default TableComponent;
