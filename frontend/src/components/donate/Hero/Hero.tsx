import HeroTitleAndSubtitle from "../../common/HeroTitleAndSubtitle/HeroTitleAndSubtitle";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.hero}>
        <HeroTitleAndSubtitle title="Donate"></HeroTitleAndSubtitle>

        <div className={css.content}>
          <h2 className={css.title}>Donation Initiatives for Ukraine</h2>
          <div className={css.row}>
            <a href="#" className={css.option}>
              <div className={css.card}>
                <img
                  src="/donate-drone.png"
                  alt="Drone"
                  className={css.image}
                />
                <h3 className={css.cardTitle}>Come Back Alive Foundation</h3>
              </div>
              <div className={css.label}>Support Army Needs</div>
            </a>
            <a href="#" className={css.option}>
              <div className={css.card}>
                <img
                  src="/donate-united.png"
                  alt="United24"
                  className={css.image}
                />
                <h3 className={css.cardTitle}>UNITED24</h3>
                <p className={css.cardSubtitle}>
                  The Initiative of the President of Ukraine
                </p>
              </div>
              <div className={css.label}>Support Army Needs</div>
            </a>
            <a href="#" className={css.option}>
              <div className={css.card}>
                <img
                  src="/donate-unicef.png"
                  alt="UNICEF UK"
                  className={css.image}
                />
                <h3 className={css.cardTitle}>UNICEF UK – Emergency Appeal</h3>
              </div>
              <div className={css.label}>Support Army Needs</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
