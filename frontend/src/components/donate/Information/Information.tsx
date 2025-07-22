import css from "./Information.module.css";

export default function Information() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>Where Your Donation Goes</h2>
        <div className={css.content}>
          <p className={css.description}>
            In times of war, every small act of solidarity matters. That’s why
            we’ve carefully selected three of the most trusted and transparent
            funds supporting Ukraineeach focused on a different area: frontline
            defense, humanitarian recovery, and protection of children. Whether
            you feel moved to help equip those defending their homes, support
            medical and reconstruction efforts, or ensure safety for displaced
            families, your contribution will go directly to where it’s needed
            most.
          </p>
          <div className={css.option}>
            <img
              src="/donate-alive-pic.webp"
              alt=""
              className={css.optionImage}
            />
            <div className={css.optionContent}>
              <h3 className={css.optionTitle}>Come Back Alive Foundation</h3>
              <p className={css.optionText}>
                Come Back Alive Foundation is one of the oldest and most
                respected Ukrainian charitable foundations supporting the
                military. Established in 2014, it provides non-lethal aid to
                Ukraine’s defenders - such as drones, thermal imaging,
                communication systems, and tactical training. Known for
                operating directly on the ground and publishing transparent
                financial reports, the foundation has gained both national and
                international trust.
              </p>
            </div>
          </div>
          <div className={css.option}>
            <img
              src="/donate-united-pic.webp"
              alt=""
              className={css.optionImage}
            />
            <div className={css.optionContent}>
              <h3 className={css.optionTitle}>UNITED24</h3>
              <p className={css.optionText}>
                UNITED24 is the official fundraising platform launched by the
                President of Ukraine. All donations are processed through the
                National Bank of Ukraine and go directly toward defense, medical
                aid, humanitarian demining, education, and infrastructure
                recovery. The platform provides clear weekly reports, and donors
                can choose specific areas to support, making it a reliable and
                well-governed mechanism for large-scale impact.
              </p>
            </div>
          </div>
          <div className={css.option}>
            <img
              src="/donate-unicef-pic.webp"
              alt=""
              className={css.optionImage}
            />
            <div className={css.optionContent}>
              <h3 className={css.optionTitle}>UNICEF UK</h3>
              <p className={css.optionText}>
                Emergency Appeal focuses on helping Ukrainian children and
                families affected by war. As a part of the United Nations,
                UNICEF operates across Ukraine and neighboring countries to
                deliver safe water, emergency shelter, healthcare, schooling
                materials, and emotional support. It is one of the most
                reputable global organizations ensuring the well-being of the
                most vulnerable population - children.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
