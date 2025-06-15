import React, { useContext, useState } from "react";
import Button from "../Button/button";
import FormFilters from "../FormFilters/formfilters";
import filterStyle from "./filter.module.css";
import BigFilter from "../BigFilter/big-filter";
import { FilterContext, ParamsContext } from "../context";

const Filter = () => {
  const [isOpen, setOpen] = useState(false);
  const filterState = useContext(FilterContext);
  const state = useContext(ParamsContext);

  const setOpenFilters = () => {
    setOpen(!isOpen);
  };

  const deleteFilters = () => {
    const params = new URLSearchParams();

    if (filterState?.filter === "Архитектурное наследие") {
      params.append("is_architectural", "true");
    }

    if (filterState?.filter === "Археологическое наследие") {
      params.append("is_archeological", "true");
    }

    if (filterState?.filter === "Историческое наследие") {
      params.append("is_historical", "true");
    }
    state?.setSearchParams(params);
  };
  return (
    <div className={filterStyle.main_bar}>
      <div className={filterStyle.bar}>
        {isOpen ? (
          <FormFilters isOpen={isOpen} setOpen={setOpen} />
        ) : (
          <section className={filterStyle.section}>
            <BigFilter />
            <div className={filterStyle.div}>
              {state?.searchParams.has("general_region_id") ||
              state?.searchParams.has("general_createDate") ||
              state?.searchParams.has("general_address_fullAddress") ||
              state?.searchParams.has("nativeName") ? (
                <Button onClick={(e) => deleteFilters()} isDisabled={false}>
                  Сбросить
                </Button>
              ) : null}

              <Button onClick={(e) => setOpenFilters()} isDisabled={false}>
                Поиск
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Filter;
