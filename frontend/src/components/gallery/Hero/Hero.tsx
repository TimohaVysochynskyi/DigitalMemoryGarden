import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import type { MediaType } from "../../../types/Gallery";
import css from "./Hero.module.css";

type Props = {
  selectedMediaType: MediaType;
  onMediaTypeChange: (mediaType: MediaType) => void;
};

export default function Hero({ selectedMediaType, onMediaTypeChange }: Props) {
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
              <button
                type="button"
                className={`${css.button} ${
                  selectedMediaType === "photo" ? css.active : ""
                }`}
                onClick={() => onMediaTypeChange("photo")}
              >
                Photo
              </button>
              <button
                type="button"
                className={`${css.button} ${
                  selectedMediaType === "video" ? css.active : ""
                }`}
                onClick={() => onMediaTypeChange("video")}
              >
                Video
              </button>
              <button
                type="button"
                className={`${css.button} ${
                  selectedMediaType === "audio" ? css.active : ""
                }`}
                onClick={() => onMediaTypeChange("audio")}
              >
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
