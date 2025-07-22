import { Link, NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import clsx from "clsx";
import { useState } from "react";

export default function Header() {
  const currentRoute = useLocation().pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    if (currentRoute == "/candles" || currentRoute == "/about") {
      return clsx(css.link, css.lightLink, isActive && css.linkActive);
    } else {
      return clsx(css.link, isActive && css.linkActive);
    }
  };

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.mobileLink, isActive && css.mobileLinkActive);
  };

  // Закривати меню при переході по лінку
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={css.header}>
        <Link to="/" className={css.logoLink}>
          {currentRoute == "/candles" || currentRoute == "/about" ? (
            <img src="/logo-yellow.png" alt="Logo" className={css.logo} />
          ) : (
            <img src="/logo-blue.png" alt="Logo" className={css.logo} />
          )}
        </Link>

        {/* Desktop nav */}
        <nav className={css.nav}>
          <NavLink className={linkClass} to="/garden">
            Garden
          </NavLink>
          <NavLink className={linkClass} to="/candles">
            Candles
          </NavLink>
          <NavLink className={linkClass} to="/archives">
            Archives
          </NavLink>
          <NavLink className={linkClass} to="/gallery">
            Gallery
          </NavLink>
          <NavLink className={linkClass} to="/donate">
            Donate
          </NavLink>
          <NavLink className={linkClass} to="/about">
            About us
          </NavLink>
        </nav>

        <LanguageSwitch />

        {/* Burger button */}
        <button
          className={clsx(css.burger, menuOpen && css.burgerOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile menu */}
        <div className={clsx(css.mobileMenu, menuOpen && css.mobileMenuOpen)}>
          <nav className={css.mobileNav}>
            <NavLink
              className={mobileLinkClass}
              to="/"
              onClick={handleNavClick}
            >
              Home
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/garden"
              onClick={handleNavClick}
            >
              Garden
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/candles"
              onClick={handleNavClick}
            >
              Candles
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/archives"
              onClick={handleNavClick}
            >
              Archives
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/gallery"
              onClick={handleNavClick}
            >
              Gallery
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/donate"
              onClick={handleNavClick}
            >
              Donate
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/about"
              onClick={handleNavClick}
            >
              About us
            </NavLink>
          </nav>
          <img
            src="/burger-flower.png"
            alt="Flower decoration"
            className={css.menuFlower}
          />
        </div>
        {/* overlay */}
        {menuOpen && <div className={css.overlay} onClick={handleNavClick} />}
      </header>
    </>
  );
}
