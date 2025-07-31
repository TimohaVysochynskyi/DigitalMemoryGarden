import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import type { Story } from "../../../types/story";
import css from "./Hero.module.css";

type Props = {
  onSearch?: () => void;
  lastAddedCandle?: Story | null;
  onDetails?: () => void;
};

export default function Hero({ onSearch, lastAddedCandle, onDetails }: Props) {
  console.log("Hero - lastAddedCandle:", lastAddedCandle);
  console.log("Hero - candleType:", lastAddedCandle?.candleType);
  console.log(
    "Hero - candleType.image:",
    typeof lastAddedCandle?.candleType === "object"
      ? lastAddedCandle.candleType?.image
      : "not object"
  );

  const handleLightNewCandle = () => {
    window.scrollTo({
      top: document.getElementById("light-new-memory-candle")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title="Memory candles" color="light">
          Honor someone’s memory with a symbolic digital candle. Add their name,
          a date, or a message – and help keep their light alive.
        </HeroTitleAndSubtitle>

        <div className={css.heroContent}>
          <div className={css.btnsWrapper}>
            <OutlineButton color="light" onClick={onSearch}>
              Find some memory candle
            </OutlineButton>
            <OutlineButton color="light" onClick={handleLightNewCandle}>
              Light new memory candle
            </OutlineButton>
          </div>
          <div className={css.candlesWrapper}>
            <div className={css.leftCandles}>
              <div className={css.commonCandle}>
                <img
                  src="/1-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/2-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/3-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/4-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/5-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
            </div>
            <div className={css.mainCandleWrapper}>
              <div className={css.mainCandle}>
                <div className={css.candleImageContainer}>
                  <img
                    src={
                      lastAddedCandle &&
                      typeof lastAddedCandle.candleType === "object" &&
                      lastAddedCandle.candleType?.image
                        ? `${lastAddedCandle.candleType.image}`
                        : "/main-candle.png"
                    }
                    alt={
                      lastAddedCandle
                        ? `Candle for ${lastAddedCandle.name || "Unknown"}`
                        : "Main candle"
                    }
                    className={css.mainCandleImage}
                    onError={(e) => {
                      console.log("Failed to load image:", e.currentTarget.src);
                      e.currentTarget.src = "/main-candle.png";
                    }}
                    onLoad={(e) => {
                      // Position fire animation above the candle image
                      const img = e.currentTarget;
                      const fire = img.parentElement?.querySelector(
                        `.${css.fire}`
                      ) as HTMLVideoElement;
                      if (fire && lastAddedCandle) {
                        // Position fire exactly above the candle top
                        fire.style.top = `-${fire.offsetHeight + 5}px`;
                      }
                    }}
                  />
                  {lastAddedCandle && (
                    <video
                      src="/Fire.webm"
                      className={css.fire}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                </div>
              </div>
              <div className={css.mainCandleBottom}>
                <button
                  className={css.candleButton}
                  onClick={
                    lastAddedCandle && onDetails
                      ? onDetails
                      : handleLightNewCandle
                  }
                >
                  <img
                    src={
                      lastAddedCandle ? "/action-info.png" : "/candle-plus.png"
                    }
                    alt={
                      lastAddedCandle ? "View candle details" : "Add new candle"
                    }
                    className={css.candleIcon}
                  />
                </button>
                <img
                  src="/candle-bottom.png"
                  alt="Candle bottom"
                  className={css.candleBottomImage}
                />
              </div>
            </div>
            <div className={css.rightCandles}>
              <div className={css.commonCandle}>
                <img
                  src="/6-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/7-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/8-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/9-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <img
                  src="/10-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
