import { useTranslation } from "react-i18next";
import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import css from "./Hero.module.css";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle color="light" title={t("about.hero.title")}>
          {t("about.hero.subtitle")}
        </HeroTitleAndSubtitle>
        <div className={css.content}>
          <h2 className={css.title}>Why is this important?</h2>
        </div>
      </div>
    </>
  );
}
