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
        </div>
      </div>
    </>
  );
}
