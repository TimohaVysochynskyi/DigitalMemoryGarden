import { Link } from "react-router-dom";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";

export default function Hero() {
  const handleArrowClick = () => {
    window.scrollTo({
      top: innerHeight * 0.85,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className={css.hero}>
        <div className={css.heroContent}>
          <h1 className={css.title}>
            The Digital <br />
            <span>Memory Garden</span>
          </h1>
          <p className={css.subtitle}>
            An interactive platform for collective remembrance of the ongoing
            war in Ukraine (2022–). Through participatory storytelling, the
            Digital Memory Garden invites you to preserve personal wartime
            memories – spoken or silent, written, drawn, or recorded. Each
            contribution becomes part of a living archive of courage, loss, and
            resilience. Let’s grow this digital garden of memory together – and
            carry our stories through generations. Your memory matters!
          </p>
          <div className={css.btnsWrapper}>
            <OutlineButton to="/garden">
              Join our digital memory field
            </OutlineButton>
            <OutlineButton onClick={handleArrowClick}>
              <img
                src="/btn-arrow-right.png"
                alt="Arrow Right"
                className={css.arrowIcon}
              />
            </OutlineButton>
          </div>
        </div>

        <div className={css.flowerWrapper}>
          <img
            src="/hero-flower.png"
            alt="Flower"
            className={css.flowerImage}
          />
          <img
            src="/hero-flower-text.png"
            alt="Flower Text"
            className={css.flowerText}
          />
          <Link to="/about" className={css.flowerPlayButton}>
            <img
              src="/hero-flower-play.png"
              alt="Flower Play Button"
              className={css.flowerPlayImage}
            />
          </Link>
        </div>
        <div className={css.btnMobile}>
          <OutlineButton>Join our digital memory field</OutlineButton>
        </div>
      </div>
    </>
  );
}
