import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";

import { useRef, useEffect } from "react";
import type { Story } from "../../../types/story";

type VideoLoopSectionProps = {
  src: string;
  className?: string;
  loopStart: number;
  loopEnd: number;
};

function VideoLoopSection({
  src,
  className,
  loopStart,
  loopEnd,
}: VideoLoopSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const onLoadedMetadata = () => {
      video.currentTime = 0;
      video.play();
    };

    const checkLoop = () => {
      if (!isMounted || !video) return;
      if (video.currentTime >= loopEnd) {
        // Ставимо на loopStart і одразу play для плавності
        video.currentTime = loopStart + 0.01; // невеликий зсув для уникнення "заморозки"
        video.play();
      }
      rafRef.current = requestAnimationFrame(checkLoop);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    rafRef.current = requestAnimationFrame(checkLoop);

    return () => {
      isMounted = false;
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [src, loopStart, loopEnd]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      muted
      playsInline
      style={{
        objectFit: "contain",
        border: 0,
        outline: 0,
        background: "none",
      }}
    />
  );
}

type Props = {
  onSearch: () => void;
  onDetails: () => void;
  flower?: Story | null;
};

export default function Hero({ onSearch, onDetails, flower }: Props) {
  const handlePlantNewFlower = () => {
    window.scrollTo({
      top: document.getElementById("plant-new-memory-flower")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

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
            <OutlineButton onClick={onSearch}>
              Find some memory flower
            </OutlineButton>
            <OutlineButton onClick={handlePlantNewFlower}>
              Plant new memory flower
            </OutlineButton>
          </div>

          <div className={css.blueContainer}>
            <div className={css.storyDescription}>
              <p className={css.storyName}>
                {flower?.title || "Name of story"}
              </p>
              <p className={css.storyAuthor}>
                {flower?.name ? `By ${flower.name}` : ""}
              </p>
            </div>

            {typeof flower?.category === "object" &&
            flower.category.flowerAnimation ? (
              <VideoLoopSection
                src={flower.category.flowerAnimation}
                className={css.flower}
                loopStart={3}
                loopEnd={15}
              />
            ) : (
              <img
                src={
                  typeof flower?.category === "object" &&
                  "flowerImage" in flower.category &&
                  flower.category.flowerImage
                    ? flower.category.flowerImage
                    : "/garden-flower.png"
                }
                alt="Garden Flower"
                className={css.flower}
              />
            )}

            <div className={css.actionsWrapper}>
              <button className={css.actionButton} onClick={onDetails}>
                <img
                  src="/action-info.png"
                  alt="Read story"
                  className={css.actionIcon}
                />
              </button>
              {/* <button className={css.actionButton}>
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
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // ...existing code...
}
