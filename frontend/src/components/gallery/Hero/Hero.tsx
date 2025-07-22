import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title="The gallery">
          Explore the media archive: video stories, audio messages, and images
          contributed by people across the Digital Memory Garden.
        </HeroTitleAndSubtitle>

        <div className={css.content}>
          <div className={css.row}>
            <div className={css.imageWrapper}>
              <div className={css.imageBorder}>
                <div className={css.image}></div>
              </div>
            </div>
            <div className={css.btnsWrapper}>
              <button type="button" className={css.button}>
                Photo
              </button>
              <button type="button" className={css.button}>
                Video
              </button>
              <button type="button" className={css.button}>
                Audio
              </button>
            </div>
          </div>
          <div className={css.blueSection}></div>
        </div>
      </div>
    </>
  );
}
