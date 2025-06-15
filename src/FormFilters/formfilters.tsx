import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useMemo,
  useState,
} from "react";
import formStyle from "./formfilters.module.css";
import "./formfilters.css";
import Button from "../Button/button";
import { DataContext, FilterContext, IParams, ParamsContext } from "../context";

interface IForm {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const fields = [
  { name: "Наименование", value: "nativeName" },
  { name: "Полный адрес", value: "general_address_fullAddress" },
  { name: "Регион", value: "general_region_id" },

  { name: "Дата основания", value: "general_createDate" },
];

const FormFilters = ({ isOpen, setOpen }: IForm) => {
  const state = useContext(ParamsContext);
  const filterState = useContext(FilterContext);
  const dataState = useContext(DataContext);
  const [fieldsParams, setFieldsParams] = useState<IParams>({
    nativeName: "",
    general_region_id: "",
    general_createDate: "",
    general_address_fullAddress: "",
  });

  const returnFilters = () => {
    setOpen(!isOpen);
  };

  const urlSearch = useMemo(() => {
    const params = new URLSearchParams();

    if (fieldsParams.nativeName)
      params.append("nativeName", fieldsParams.nativeName);
    if (fieldsParams.general_region_id)
      params.append("general_region_id", fieldsParams.general_region_id);
    if (fieldsParams.general_createDate)
      params.append("general_createDate", fieldsParams.general_createDate);
    if (fieldsParams.general_address_fullAddress)
      params.append(
        "general_address_fullAddress",
        fieldsParams.general_address_fullAddress
      );
    if (filterState?.filter === "Архитектурное наследие") {
      params.append("is_architectural", "true");
    }

    if (filterState?.filter === "Археологическое наследие") {
      params.append("is_archeological", "true");
    }

    if (filterState?.filter === "Историческое наследие") {
      params.append("is_historical", "true");
    }

    return params;
  }, [
    fieldsParams.general_address_fullAddress,
    fieldsParams.general_createDate,
    fieldsParams.general_region_id,
    fieldsParams.nativeName,
  ]);

  const setSeatch = (e: SyntheticEvent) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/factories/table/?offset=${0}&` + urlSearch)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(
        (data) => (
          dataState?.setDataState(data.data), dataState?.setCount(data.total)
        )
      );
    state?.setSearchParams(urlSearch);
    dataState?.setPage(1);
    returnFilters();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFieldsParams((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className={formStyle.form}>
      <section className={formStyle.section}>
        {fields.map((x, i) => {
          return (
            <input
              key={i}
              name={x.value}
              type="text"
              className={formStyle.field}
              placeholder={x.name}
              value={fieldsParams[x.value as keyof IParams]}
              onChange={handleInputChange}
            />
          );
        })}

        <Button onClick={(e) => setSeatch(e)} isDisabled={false}>
          Применить
        </Button>
        <Button onClick={(e) => returnFilters()} isDisabled={false}>
          Отмена
        </Button>
      </section>
    </form>
  );
};

export default FormFilters;
