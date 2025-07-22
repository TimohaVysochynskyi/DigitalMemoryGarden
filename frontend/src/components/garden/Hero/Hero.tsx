import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title="Memory garden">
          Mark a moment or a feeling. Upload a written story, record a video, or
          add an image, sound, or drawing – and let it bloom as a digital
          flower.
        </HeroTitleAndSubtitle>

        <div className={css.heroContent}>
          <div className={css.btnsWrapper}>
            <OutlineButton>Find some memory flower</OutlineButton>
            <OutlineButton>Plant new memory flower</OutlineButton>
          </div>

          <div className={css.blueContainer}>
            <div className={css.storyDescription}>
              <p className={css.storyName}>Name of story</p>
              <p className={css.storyAuthor}>By Maria Vysach</p>
            </div>

            <img
              src="/garden-flower.png"
              alt="Garden Flower"
              className={css.flower}
            />

            <div className={css.actionsWrapper}>
              <button className={css.actionButton}>
                <img
                  src="/action-info.png"
                  alt="Read story"
                  className={css.actionIcon}
                />
              </button>
              <button className={css.actionButton}>
                <img
                  src="/action-audio.png"
                  alt="Audio from story"
                  className={css.actionIcon}
                />
              </button>
              <button className={css.actionButton}>
                <img
                  src="/action-photo.png"
                  alt="Photo from story"
                  className={css.actionIcon}
                />
              </button>
              <button className={css.actionButton}>
                <img
                  src="/action-video.png"
                  alt="Video from story"
                  className={css.actionIcon}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
