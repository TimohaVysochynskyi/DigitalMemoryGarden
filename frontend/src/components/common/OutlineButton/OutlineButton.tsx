import clsx from "clsx";
import css from "./OutlineButton.module.css";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit" | "reset";
  to?: string; // Optional prop for navigation
};

export default function OutlineButton({
  children,
  onClick,
  color = "dark",
  type = "button",
  to,
}: Props) {
  return (
    <>
      {to ? (
        <Link to={to} className={clsx(css.button, css[color])}>
          {children}
        </Link>
      ) : (
        <button
          className={clsx(css.button, css[color])}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      )}
    </>
  );
}
