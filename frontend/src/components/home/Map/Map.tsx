import css from "./Map.module.css";

export default function Map() {
  return (
    <>
      <div className={css.container}>
        <div className={css.content}>
          <h3 className={css.title}>
            Ukraine will always remember those united by war
          </h3>
          <p className={css.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauri...
          </p>
        </div>
        <img
          src="/home-map.png"
          alt="Map of Ukraine"
          className={css.mapImage}
        />
      </div>
    </>
  );
}
