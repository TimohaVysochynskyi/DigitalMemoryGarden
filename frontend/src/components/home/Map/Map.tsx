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
            This living map blossoms with digital flowers - each one marking a
            story, a voice, a memory rooted across Ukraine
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
