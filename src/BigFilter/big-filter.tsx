import React, {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useMemo,
  useState,
} from "react";
import filterStyle from "./big-filter.module.css";
import { DataContext, FilterContext, ParamsContext, TFilter } from "../context";
import up from "../up.svg";
import down from "../down.svg";

const BigFilter = () => {
  const state = useContext(ParamsContext);
  const dataState = useContext(DataContext);
  const filterState = useContext(FilterContext);
  const [open, setOpen] = useState<boolean>(false);
  const options = useMemo(() => {
    return [
      { name: "Все субъекты", value: "All" },
      { name: "Историческое наследие", value: "IsHistorical" },
      { name: "Архитектурное наследие", value: "IsArchitectural" },
      { name: "Археологическое наследие", value: "IsArcheological" },
    ];
  }, []);

  const addFilterToParams = (e: SyntheticEvent, name: string) => {
    e.preventDefault();
    const params = state?.searchParams!;
    if (name === "Все субъекты") {
      params.delete("is_historical");
      params.delete("is_architectural");
      params.delete("is_archeological");
    }
    if (name === "Архитектурное наследие") {
      params.append("is_architectural", "true");
      params.delete("is_historical");
      params.delete("is_archeological");
    }

    if (name === "Археологическое наследие") {
      params.append("is_archeological", "true");
      params.delete("is_historical");
      params.delete("is_architectural");
    }

    if (name === "Историческое наследие") {
      params.append("is_historical", "true");
      params.delete("is_architectural");
      params.delete("is_archeological");
    }

    state?.setSearchParams(params);
    dataState?.setPage(1);

    filterState?.setFilter(name as TFilter);
  };

  return (
    <div className={filterStyle.main}>
      <div className={filterStyle.select} onClick={() => setOpen(!open)}>
        {filterState?.filter}
        {open ? (
          <img className={filterStyle.img} src={up} width={24} height={24} />
        ) : (
          <img className={filterStyle.img} src={down} width={24} height={24} />
        )}
        {open && (
          <div className={filterStyle.options}>
            {options.map((item, index) => {
              return (
                <div
                  onClick={(e) => addFilterToParams(e, item.name)}
                  className={filterStyle.option}
                  key={index}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BigFilter;
