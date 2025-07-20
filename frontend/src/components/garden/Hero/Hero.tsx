import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.hero}>
        <div className={css.titleWrapper}>
          <h1 className={css.title}>Memory garden</h1>
          <p className={css.subtitle}>
            Mark a moment or a feeling. Upload a written story, record a video,
            or add an image, sound, or drawing – and let it bloom as a digital
            flower.
          </p>
        </div>

        <div className={css.btnsWrapper}>
          <OutlineButton>Find some memory flower</OutlineButton>
          <OutlineButton>Plant new memory flower</OutlineButton>
        </div>

        <div className={css.blueContainer}>
          <div className={css.storyDescription}>
            <p className={css.storyName}>Name of story</p>
            <p className={css.storyAuthor}>By Maria Vysach</p>
          </div>

          <div className={css.actionsWrapper}>
            <OutlineButton>
              <img
                src="/action-info.png"
                alt="Read story"
                className={css.actionIcon}
              />
            </OutlineButton>
            <OutlineButton>
              <img
                src="/action-audio.png"
                alt="Audio from story"
                className={css.actionIcon}
              />
            </OutlineButton>
            <OutlineButton>
              <img
                src="/action-photo.png"
                alt="Photo from story"
                className={css.actionIcon}
              />
            </OutlineButton>
            <OutlineButton>
              <img
                src="/action-video.png"
                alt="Video from story"
                className={css.actionIcon}
              />
            </OutlineButton>
          </div>
        </div>
      </div>
    </>
  );
}
