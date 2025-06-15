import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import MyMap from "./MyMap/mymap";
import Filter from "./Filter/filter";
import {
  DataContext,
  FilterContext,
  ParamsContext,
  TFilter,
  UserContext,
} from "./context";
import TableComponent from "./Table/table";
import Navbar from "./Navbar/navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "./About/about";
import Team from "./Team/team";

export interface IPlace {
  id: number;
  nativeName: string;
  info_category: string;
  fullAddress: string;
  coordinates: string;
  isActual: boolean;
  securityInfo: string;
  photoTitle: number;
  objectTypeValue: string;
  regionId: string;
  createDate: string;
  isHistoricalHeritage: boolean;
  isArchitecturalHeritage: boolean;
  isArcheologicalHeritage: boolean;
  category: string;
}

function App() {
  const [mapState, setMapState] = useState("");
  const [dataState, setDataState] = useState<IPlace[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<TFilter>("Все субъекты");
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams()
  );

  useLayoutEffect(() => {
    const currentUrl = window.location.href.split("/");
    setMapState(
      currentUrl[currentUrl.length - 1]
        ? currentUrl[currentUrl.length - 1]
        : "about"
    );
  }, []);

  return (
    <Router>
      <FilterContext.Provider value={{ filter, setFilter }}>
        <DataContext.Provider
          value={{ dataState, count, setDataState, setCount, page, setPage }}
        >
          <UserContext.Provider value={{ mapState, setMapState }}>
            <ParamsContext.Provider value={{ searchParams, setSearchParams }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route
                  path="/map"
                  element={
                    <>
                      <Filter />
                      <MyMap />
                    </>
                  }
                />
                <Route
                  path="/table"
                  element={
                    <>
                      <Filter />
                      <TableComponent />
                    </>
                  }
                />
              </Routes>
            </ParamsContext.Provider>
          </UserContext.Provider>
        </DataContext.Provider>
      </FilterContext.Provider>
    </Router>
  );
}

export default App;
