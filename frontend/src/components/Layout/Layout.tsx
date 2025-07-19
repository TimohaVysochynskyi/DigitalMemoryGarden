import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

import css from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <Header />

      <main className={css.container}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
