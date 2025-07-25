import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title="Memory candles" color="light">
          Honor someone’s memory with a symbolic digital candle. Add their name,
          a date, or a message – and help keep their light alive.
        </HeroTitleAndSubtitle>

        <div className={css.heroContent}>
          <div className={css.btnsWrapper}>
            <OutlineButton color="light">Find some memory candle</OutlineButton>
            <OutlineButton color="light">Light new memory candle</OutlineButton>
          </div>
          <div className={css.candlesWrapper}>
            <div className={css.leftCandles}>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/1-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/2-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/3-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/4-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/5-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
            </div>
            <div className={css.mainCandleWrapper}>
              <div className={css.mainCandle}>
                <img
                  src="/main-candle.png"
                  alt="Main candle"
                  className={css.mainCandleImage}
                />
              </div>
              <div className={css.mainCandleBottom}>
                <button className={css.candleButton}>
                  <img
                    src="/candle-plus.png"
                    alt="Add new candle"
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
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/6-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/7-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/3-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/8-candle.png"
                  alt="Candle"
                  className={css.commonCandleImage}
                />
              </div>
              <div className={css.commonCandle}>
                <video
                  src="/Fire.webm"
                  autoPlay
                  loop
                  muted
                  className={css.candleFire}
                ></video>
                <img
                  src="/9-candle.png"
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
