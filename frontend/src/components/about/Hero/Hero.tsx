import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle
          color="light"
          title="About us"
        ></HeroTitleAndSubtitle>
        <div className={css.content}>
          <h2 className={css.title}>Why is this important?</h2>
        </div>
      </div>
    </>
  );
}
