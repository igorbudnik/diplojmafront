import React, { useContext } from "react";
import headerStyle from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent } from "react";
import Button from "../Button/button";
import { UserContext } from "../context";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const state = useContext(UserContext);
  const changePage = (e: SyntheticEvent, url: string, stateWillBe: string) => {
    e.preventDefault();
    state?.setMapState(stateWillBe);
    navigate(url);
  };

  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.nav}>
        <section className={headerStyle.logo}>
          <svg
            width="57"
            height="57"
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 57V22.7288L19.95 14.25V19.95L34.2 14.25V22.8H57V57H0ZM25.65 45.6H31.35V34.2H25.65V45.6ZM14.25 45.6H19.95V34.2H14.25V45.6ZM37.05 45.6H42.75V34.2H37.05V45.6ZM56.43 18.525H43.2487L45.6712 0H54.15L56.43 18.525Z"
              fill="#3A4143"
            />
          </svg>
        </section>
        <section className={headerStyle.buttons}>
          <Button
            onClick={(e) => changePage(e, "/", "about")}
            size="large"
            isDisabled={state?.mapState === "about"}
          >
            <span>О проекте</span>
          </Button>
          <Button
            onClick={(e) => changePage(e, "/team", "team")}
            size="large"
            isDisabled={state?.mapState === "team"}
          >
            <span>Наша команда</span>
          </Button>
          <Button
            onClick={(e) => changePage(e, "/map", "map")}
            size="large"
            isDisabled={state?.mapState === "map"}
          >
            <span>Карта</span>
          </Button>
          <Button
            onClick={(e) => changePage(e, "/table", "table")}
            size="large"
            isDisabled={state?.mapState === "table"}
          >
            <span>Таблица</span>
          </Button>
        </section>
      </nav>
    </header>
  );
}

export default Navbar;
