import { useState, useRef, useEffect } from "react";
import css from "./CategoryDropdown.module.css";

const categories = [
  "Childhood of war",
  "Displacement and escape",
  "Resistance",
  "Hope and love",
  "Wartime reality",
  "Loss and grief",
];

export default function CategoryDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={css.dropdownWrapper} ref={ref}>
      <button
        type="button"
        className={css.dropdownButton}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{value || "Category"}</span>
        <img
          src="/dropdown-arrow-down.png"
          alt="Dropdown arrow down"
          className={css.icon}
        />
      </button>
      {open && (
        <ul className={css.dropdownList}>
          {categories.map((cat) => (
            <li
              key={cat}
              className={css.dropdownItem}
              onClick={() => {
                onChange(cat);
                setOpen(false);
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
