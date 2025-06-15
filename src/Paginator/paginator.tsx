import { SyntheticEvent } from "react";
import pagiStyle from "./paginator.module.css";

interface IPages {
  changePage: (e: SyntheticEvent, page: number) => void;
  currentPage: number;
  count: number[];
}

interface PaginationOptions {
  currentPage: number;
  totalPages: number;
  maxVisibleButtons?: number;
}

const Paginator = ({ changePage, currentPage, count }: IPages) => {
  const getPages = ({
    currentPage,
    totalPages,
    maxVisibleButtons = 5,
  }: PaginationOptions): (number | "...")[] => {
    if (totalPages <= 1) return []; // Нет пагинации, если страница одна

    // Если страниц мало, показываем все кнопки
    if (totalPages <= maxVisibleButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisibleButtons / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisibleButtons - 1, totalPages);

    // Корректируем диапазон, если он выходит за пределы
    if (end - start + 1 < maxVisibleButtons) {
      start = Math.max(end - maxVisibleButtons + 1, 1);
    }

    const pages: (number | "...")[] = [];

    // Добавляем первую страницу и многоточие, если нужно
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }

    // Добавляем основной диапазон страниц
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Добавляем последнюю страницу и многоточие, если нужно
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const clickChangePage = (e: SyntheticEvent, action: string) => {
    switch (action) {
      case "left":
        changePage(e, currentPage - 1);
        return;
      case "right":
        changePage(e, currentPage + 1);
        return;
    }
  };

  return (
    <div className={pagiStyle.paginator}>
      {currentPage > 1 ? (
        <span
          style={{ border: "none", fontWeight: "bold" }}
          onClick={(e) => clickChangePage(e, "left")}
        >
          {"<"}
        </span>
      ) : null}
      {getPages({ currentPage: currentPage, totalPages: count.length }).map(
        (page, i) => {
          if (page === "...")
            return (
              <span key={i} style={{ pointerEvents: "none", border: "none" }}>
                {page}
              </span>
            );
          return (
            <span
              key={i}
              onClick={(e) => changePage(e, page)}
              className={currentPage === page ? pagiStyle.active : ""}
              style={{ pointerEvents: currentPage === page ? "none" : "auto" }}
            >
              {page}
            </span>
          );
        }
      )}
      {currentPage < count.length ? (
        <span
          style={{ border: "none", fontWeight: "bold" }}
          onClick={(e) => clickChangePage(e, "right")}
        >
          {">"}
        </span>
      ) : null}
    </div>
  );
};

export default Paginator;
