import css from "./LanguageSwitch.module.css";

export default function LanguageSwitch() {
  return (
    <>
      <div className={css.container}>
        <img
          src="/language-switch.png"
          alt="Language Switcher"
          className={css.icon}
        />
        <span className={css.currentLanguage}>ENG</span>
      </div>
    </>
  );
}
