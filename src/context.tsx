import { createContext } from "react";
import { IPlace } from "./App";

export interface IParams {
  nativeName: string;
  general_region_id: string;
  general_createDate: string;
  general_address_fullAddress: string;
}

type StateContextType = {
  mapState: string;
  setMapState: React.Dispatch<React.SetStateAction<string>>;
};

type DataContextType = {
  dataState: IPlace[];
  count: number;
  setDataState: React.Dispatch<React.SetStateAction<IPlace[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

type ParamsContextType = {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export type TFilter =
  | "Все субъекты"
  | "Историческое наследие"
  | "Архитектурное наследие"
  | "Археологическое наследие";
type FilterContextType = {
  filter: TFilter;
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>;
};

export const UserContext = createContext<null | StateContextType>(null);
export const DataContext = createContext<null | DataContextType>(null);
export const ParamsContext = createContext<null | ParamsContextType>(null);
export const FilterContext = createContext<null | FilterContextType>(null);
