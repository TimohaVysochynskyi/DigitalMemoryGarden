import css from "./Information.module.css";

export default function Information() {
  return (
    <>
      <div className={css.container}>
        <div className={css.videoWrapper}>
          <iframe
            id="kaltura_player"
            src='https://cdnapisec.kaltura.com/p/2010292/embedPlaykitJs/uiconf_id/55171522?iframeembed=true&entry_id=1_pllbvj4i&config[provider]={"widgetId":"1_r8l45si2"}'
            allowFullScreen
            allow="autoplay *; fullscreen *; encrypted-media *"
            sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
            title="Kaltura Player"
            className={css.video}
          />
          <div className={css.videoRow}>
            <div className={css.videoCol}>
              <p className={css.videoTitle}>Interview</p>
            </div>
            <p className={css.videoDescription}>
              In this video interview with Professor Rachel Granger, we discuss
              the role of digital platforms in preserving personal and
              collective wartime memory. The conversation explores how
              interactive design, storytelling, and emotion come together to
              support remembrance, resilience, and cultural heritage. We explore
              why platforms like The Digital Memory Garden matter - for healing,
              connection, and history - and how they help keep memory alive in
              times of war and displacement.
            </p>
          </div>
        </div>
        <div className={css.professorWrapper}>
          <img
            src="/about-professor.png"
            alt="About Professor"
            className={css.professorImage}
          />
          <p className={css.professorText}>Rachel Granger</p>
          <p className={css.professorText}>
            Professor of Creative Development and Social Sciences
          </p>
          <p className={css.professorText}>De Montfort University, Leicester</p>
        </div>
      </div>
    </>
  );
}
