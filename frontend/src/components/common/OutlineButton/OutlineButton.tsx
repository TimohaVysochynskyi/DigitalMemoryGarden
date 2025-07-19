import clsx from "clsx";
import css from "./OutlineButton.module.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
};

export default function OutlineButton({
  children,
  onClick,
  color = "dark",
}: Props) {
  return (
    <button
      className={clsx(css.button, css[color])}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
