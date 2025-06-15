import { useMemo, useState } from "react";
import "./team.css";
import photos from "../photos.json";

interface ITeam {
  id: number;
  name: string;
  role: string;
  description: string;
  photo: string;
}

const Team = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const teamMembers = useMemo<ITeam[]>(
    () => [
      {
        id: 1,
        name: "Будник Игорь",
        role: "FE разработчик",
        description: "Ответственный за разработку визуальной части сайта",
        photo: photos[0].photo,
      },
      {
        id: 2,
        name: "Вялков Александр",
        role: "Аналитик",
        description: "Ответственный за исследование",
        photo: photos[1].photo,
      },
      {
        id: 3,
        name: "Долгих Владимир",
        role: "BE разработчик",
        description:
          "Ответственный за разработку серверной части сайта и парсинг информации",
        photo: photos[2].photo,
      },
      {
        id: 4,
        name: "Турусов Всеволод",
        role: "Руководитель проекта",
        description: "Ответственный за организационную работу проекта",
        photo: photos[3].photo,
      },
    ],
    []
  );
  const [info, setInfo] = useState<ITeam>({
    id: 0,
    name: "",
    role: "",
    description: "",
    photo: "",
  });

  const toggleAccordion = (index: number, description: ITeam) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
    setInfo(description);
  };

  return (
    <div className="team">
      <h1 className="teamMembers">Наша команда</h1>
      <section className="blocks">
        <ul className="accordion">
          {teamMembers.map((item, index) => (
            <li className="accordion-item" key={index}>
              <button
                className={`accordion-button ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() =>
                  toggleAccordion(index, {
                    id: item.id,
                    name: item.name,
                    role: item.role,
                    description: item.description,
                    photo: item.photo,
                  })
                }
              >
                {item.name}
                {activeIndex === index ? (
                  <svg
                    className="svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 32L32 2M32 2L2 2M32 2L2 32"
                      stroke="#FBF8F1"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                ) : (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 31L31 31M31 31L31 1M31 31L1 1"
                      stroke="#B0B0B0"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="bevel"
                    />
                  </svg>
                )}
              </button>

              <div
                className="accordion-content"
                style={{
                  height: activeIndex === index ? "130px" : "0",
                  opacity: activeIndex === index ? "1" : "0",
                }}
              ></div>
            </li>
          ))}
        </ul>

        <div className="info">
          <section className="text">
            <h1 className="infoName">{info.name}</h1>
            <span className="infoRole">{info.role}</span>
            <span className="infoDesc">{info.description}</span>
          </section>
        </div>
        {activeIndex || activeIndex === 0 ? (
          <img
            className="photo"
            src={info.photo}
            alt={info.name}
            width={280}
            height={325}
          />
        ) : null}
      </section>
    </div>
  );
};

export default Team;
