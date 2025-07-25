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
            <a href="https://savelife.in.ua/en/" className={css.option}>
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
            <a href="https://u24.gov.ua" className={css.option}>
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
              <div className={css.label}>
                Donate to Defense, Medical Aid & Rebuild
              </div>
            </a>
            <a
              href="https://www.unicef.org.uk/donate/donate-now-to-protect-children-in-ukraine/"
              className={css.option}
            >
              <div className={css.card}>
                <img
                  src="/donate-unicef.png"
                  alt="UNICEF UK"
                  className={css.image}
                />
                <h3 className={css.cardTitle}>UNICEF UK – Emergency Appeal:</h3>
                <p className={css.cardSubtitle}>Protect Children in Ukraine</p>
              </div>
              <div className={css.label}>
                Help Vulnerable Ukrainian Children
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
