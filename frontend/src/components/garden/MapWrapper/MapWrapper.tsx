import css from "./MapWrapper.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";

export default function MapWrapper() {
  const listOfCategories = [
    "childhood of war",
    "Displacement and Escape",
    "resistance",
    "hope and love",
    "Wartime Reality",
    "Loss and Grief",
  ];

  return (
    <>
      <div className={css.container}>
        <div className={css.content}>
          <p className={css.titleMobile}>
            Ukraine will always remember those united by war
          </p>
          <img
            src="/garden-map.png"
            alt="Garden Map"
            className={css.mapImageMobile}
          />
          <p className={css.title}>
            Ukraine will always remember those united by war
          </p>
          <ul className={css.list}>
            {listOfCategories.map((category, index) => (
              <li key={index} className={css.listItem}>
                <img
                  src={`${index + 1}-union.png`}
                  alt="Union icon"
                  className={css.itemIcon}
                />
                <span className={css.itemText}>{category}</span>
              </li>
            ))}
          </ul>
          <div className={css.btnsWrapper}>
            <OutlineButton color="light">Read all stories</OutlineButton>
            <OutlineButton color="light">View all media</OutlineButton>
          </div>
        </div>

        <img src="/garden-map.png" alt="Garden Map" className={css.mapImage} />
      </div>
    </>
  );
}
