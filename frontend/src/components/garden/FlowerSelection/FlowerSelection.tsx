import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./FlowerSelection.module.css";

export default function FlowerSelection() {
  return (
    <>
      <div className={css.container}>
        <div className={css.titleWrapper}>
          <h2 className={css.title}>Childhood of war</h2>
          <p className={css.subtitle}>
            Stories from or about children growing up during wartime
          </p>
        </div>

        <div className={css.sliderWrapper}>
          <img
            src="/garden-dark-flower.png"
            alt="Garden Dark Flower"
            className={css.flower}
          />
          <div className={css.btnsWrapper}>
            <OutlineButton>
              <img
                src="/small-left-arrow.png"
                alt="Left arrow"
                className={css.arrow}
              />
            </OutlineButton>
            <OutlineButton>
              <img
                src="/small-right-arrow.png"
                alt="Right arrow"
                className={css.arrow}
              />
            </OutlineButton>
          </div>
        </div>
      </div>
    </>
  );
}
