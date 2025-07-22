import clsx from "clsx";
import css from "./Book.module.css";

export default function Book() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>
          Archive <span>Childhood of War</span>
        </h2>
        <div className={css.sliderWrapper}>
          <button type="button" className={clsx(css.arrowBtn, css.arrowLeft)}>
            <img
              src="/small-left-arrow.png"
              alt="Left arrow"
              className={css.arrowIcon}
            />
          </button>
          <div className={css.bookBg}>
            <div className={css.bookContent}>
              <div className={css.middleLine}></div>
              <div className={css.record}>
                <div className={css.recordTop}>
                  <h3 className={css.recordTitle}>Lorem ipsum.</h3>
                  <div className={css.recordEmpty} />
                </div>
                <p className={css.recordText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula
                  consectetur, ultrices mauris. Maecenas vitae mattis.
                </p>
              </div>
              <div className={css.record}>
                <div className={css.recordTop}>
                  <h3 className={css.recordTitle}>Lorem ipsum.</h3>
                  <div className={css.recordEmpty} />
                </div>
                <p className={css.recordText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula
                  consectetur, ultrices mauris. Maecenas vitae mattis.
                </p>
              </div>
              <div className={css.record}>
                <div className={css.recordTop}>
                  <h3 className={css.recordTitle}>Lorem ipsum.</h3>
                  <div className={css.recordEmpty} />
                </div>
                <p className={css.recordText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula
                  consectetur, ultrices mauris. Maecenas vitae mattis.
                </p>
              </div>
              <div className={css.record}>
                <div className={css.recordTop}>
                  <h3 className={css.recordTitle}>Lorem ipsum.</h3>
                  <div className={css.recordEmpty} />
                </div>
                <p className={css.recordText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula
                  consectetur, ultrices mauris. Maecenas vitae mattis.
                </p>
              </div>
            </div>
          </div>
          <button type="button" className={clsx(css.arrowBtn, css.arrowRight)}>
            <img
              src="/small-right-arrow.png"
              alt="Right arrow"
              className={css.arrowIcon}
            />
          </button>
        </div>
      </div>
    </>
  );
}
