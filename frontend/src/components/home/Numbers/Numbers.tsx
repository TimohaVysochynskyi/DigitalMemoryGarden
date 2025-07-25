import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Numbers.module.css";

export default function Numbers() {
  return (
    <>
      <div className={css.container}>
        <h3 className={css.title}>Statistics</h3>

        <div className={css.content}>
          <div className={css.item}>
            <h4 className={css.itemTitle}>271</h4>
            <p className={css.itemDescription}>People joined</p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>437</h4>
            <p className={css.itemDescription}>Stories collected</p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>231</h4>
            <p className={css.itemDescription}>Places remembered</p>
          </div>
        </div>

        <div className={css.buttonContainer}>
          <OutlineButton to="/garden">
            Join our digital memory field
          </OutlineButton>
        </div>
      </div>
    </>
  );
}
