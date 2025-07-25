import { useLocation } from "react-router-dom";
import css from "./LanguageSwitch.module.css";

export default function LanguageSwitch() {
  const currentRoute = useLocation().pathname.replace(/\/$/, "");

  return (
    <>
      <div className={css.container}>
        {currentRoute == "/candles" || currentRoute == "/about" ? (
          <>
            <img
              src="/language-switch-light.png"
              alt="Language Switcher"
              className={css.icon}
            />
            <span className={css.currentLanguageLight}>ENG</span>
          </>
        ) : (
          <>
            <img
              src="/language-switch.png"
              alt="Language Switcher"
              className={css.icon}
            />
            <span className={css.currentLanguage}>ENG</span>
          </>
        )}
      </div>
    </>
  );
}
