import clsx from "clsx";
import css from "./OutlineButton.module.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit" | "reset";
};

export default function OutlineButton({
  children,
  onClick,
  color = "dark",
  type = "button",
}: Props) {
  return (
    <button
      className={clsx(css.button, css[color])}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
