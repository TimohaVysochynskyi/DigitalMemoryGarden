import clsx from "clsx";
import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Hero.module.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/category";
import type { Category } from "../../../types/category";
import { useTranslation } from "react-i18next";

type Props = {
  onSearch?: () => void;
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
};

export default function Hero({
  onSearch,
  selectedCategoryId,
  onCategoryChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { t } = useTranslation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );

  useEffect(() => {
    getAllCategories().then(setCategories);
    const handleResize = () => {
      setShowHint(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!showHint) return;
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = e.clientX;
      const targetY = e.clientY;

      const minX = 10 * 20;
      const minY = 150 * 20;
      const maxX = window.innerWidth - 280;
      const maxY = window.innerHeight - 100;

      setMouse({
        x: Math.max(minX, Math.min(maxX, targetX)),
        y: Math.max(minY, Math.min(maxY, targetY)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showHint]);

  const handleAddStory = () => {
    window.scrollTo({
      top: document.getElementById("add-story")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title={t("archives.hero.title")}>
          {t("archives.hero.subtitle")}
        </HeroTitleAndSubtitle>

        <div className={css.content}>
          <div className={css.row}>
            {showHint && (
              <div
                className={css.hint}
                style={{
                  transform: `translate(${mouse.x / 20}px, ${mouse.y / 20}px)`,
                }}
              >
                <span className={css.hintText}>
                  {t("archives.hero.hint", "Select a category")}
                </span>
                <svg
                  className={css.hintArrow}
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 8L28 24"
                    stroke="#1B2F48"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 24H28V16"
                    stroke="#1B2F48"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
            <div className={css.booksWrapper}>
              {typeof window !== "undefined" && window.innerWidth <= 768
                ? categories.map((category) => (
                    <div
                      key={category._id}
                      className={clsx(
                        css.book,
                        category._id === selectedCategoryId && css.selectedBook
                      )}
                      onClick={() => onCategoryChange(category._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <p className={css.bookTitle}>{category.name}</p>
                    </div>
                  ))
                : Array.from({ length: 9 }).map((_, i) => {
                    const category = categories[i];
                    return (
                      <div
                        key={category ? category._id : `empty-${i}`}
                        className={clsx(
                          css.book,
                          category &&
                            category._id === selectedCategoryId &&
                            css.selectedBook
                        )}
                        onClick={() =>
                          category && onCategoryChange(category._id)
                        }
                        style={{ cursor: category ? "pointer" : "default" }}
                      >
                        {category && (
                          <p className={css.bookTitle}>{category.name}</p>
                        )}
                      </div>
                    );
                  })}
            </div>
            <div className={css.btnsWrapper}>
              <OutlineButton onClick={onSearch}>
                {t("archives.hero.findStory")}
              </OutlineButton>
              <OutlineButton onClick={handleAddStory}>
                {t("archives.hero.addStory")}
              </OutlineButton>
            </div>
          </div>
          <div className={css.blueSection}></div>
        </div>
      </div>
    </>
  );
}
