import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";

export default function Hero() {
  const categoriesList = [
    "Childhood of war",
    "Resistance",
    "The loss",
    "Hope and love",
    "Ordinary life",
    "",
    "",
    "",
    "",
  ];
  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title="Thematic archives">
          Browse written stories organized by theme – collected from across
          Ukraine. Discover what others have shared, and help preserve our
          collective memory.
        </HeroTitleAndSubtitle>

        <div className={css.content}>
          <div className={css.row}>
            <div className={css.booksWrapper}>
              {categoriesList.map((category, index) => (
                <div key={index} className={css.book}>
                  <p className={css.bookTitle}>{category}</p>
                </div>
              ))}
            </div>
            <div className={css.btnsWrapper}>
              <OutlineButton>Find story in archive</OutlineButton>
              <OutlineButton>Add story to archive</OutlineButton>
            </div>
          </div>
          <div className={css.blueSection}></div>
        </div>
      </div>
    </>
  );
}
