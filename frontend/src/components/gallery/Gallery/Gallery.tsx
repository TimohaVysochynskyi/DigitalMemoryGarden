import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import { useState } from "react";
import css from "./Gallery.module.css";

export default function Gallery() {
  const [category, setCategory] = useState("");

  return (
    <>
      <div className={css.container}>
        <div className={css.filterWrapper}>
          <button type="button" className={css.filterButton}>
            Photos
          </button>
          <button type="button" className={css.filterButton}>
            Videos
          </button>
          <button type="button" className={css.filterButton}>
            Audios
          </button>
          <CategoryDropdown value={category} onChange={setCategory} />
        </div>

        <div className={css.grid}>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
          <div className={css.gridItem}></div>
        </div>

        <OutlineButton>Show more</OutlineButton>
      </div>
    </>
  );
}
