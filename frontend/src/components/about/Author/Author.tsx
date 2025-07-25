import css from "./Author.module.css";

export default function Author() {
  return (
    <>
      <div className={css.container}>
        <h1 className={css.titleMobile}>About Author</h1>
        <div className={css.imageWrapper}>
          <div className={css.imageBorder}>
            <div className={css.image}>
              <img src="/author-image.png" alt="Lana Sokoliuk" />
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2 className={css.title}>Author</h2>
            <div className={css.headerCol}>
              <p className={css.authorName}>Lana Sokoliuk</p>
              <p className={css.authorRole}>Creator of the Platform</p>
            </div>
          </div>
          <p className={css.authorText}>
            <span className={css.authorTextBold}>
              About the Author and Project
            </span>
            <br />
            <br />
            Lana Sokoliuk is the creator of The Digital Memory Garden and a
            student of the Digital Media Design Master's programme at the
            University of Edinburgh. Her creative and academic work is driven by
            a deep interest in preserving collective memory, symbolic forms of
            storytelling, and designing emotionally intelligent, interactive
            platforms. This project was born from the belief that memory should
            not disappear in silence — it should be nurtured, shared, and held
            with care. The Digital Memory Garden is her way of transforming
            grief and remembrance into a participatory digital space.
          </p>
          <p className={css.authorQuote}>
            "Some memories are too fragile to be shouted, but too important to
            be lost. This space was built to hold them gently - to give people a
            way to speak without fear, to remember without noise, and to let
            stories grow quietly where they won’t be forgotten."
          </p>
        </div>
      </div>
    </>
  );
}
