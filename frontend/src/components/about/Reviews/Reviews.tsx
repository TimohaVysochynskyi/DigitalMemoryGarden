import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Reviews.module.css";

export default function Reviews() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>Reviews</h2>
        <div className={css.content}>
          <div className={css.col}>
            <img
              src="/glass-jar.png"
              alt="Glass jar with reviews"
              className={css.image}
            />
          </div>
          <div className={css.col}>
            <div className={css.review}>
              <p className={css.reviewText}>
                This platform feels like a quiet place in the middle of chaos. I
                came just to read, but ended up sharing a memory I didn’t think
                I’d ever tell. Thank you for making it feel safe and meaningful.
              </p>
              <div className={css.reviewRow}>
                <span className={css.reviewAuthor}>Kateryna</span>
                <span className={css.reviewDate}>02.07.2025</span>
              </div>
            </div>
            <OutlineButton>Take one review</OutlineButton>
          </div>
        </div>
        <div className={css.blueSection}></div>
      </div>
    </>
  );
}
