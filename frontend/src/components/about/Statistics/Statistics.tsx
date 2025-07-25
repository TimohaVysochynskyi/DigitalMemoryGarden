import css from "./Statistics.module.css";

export default function Statistics() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>Statistics</h2>

        <div className={css.content}>
          <div className={css.item}>
            <h4 className={css.itemTitle}>
              2 <span>million</span>
            </h4>
            <p className={css.itemDescription}>Damaged Homes</p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>100+</h4>
            <p className={css.itemDescription}>Destroyed Towns</p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>
              3.7 <span>million</span>
            </h4>
            <p className={css.itemDescription}>Displaced Inside Ukraine</p>
          </div>
          <div className={css.item}>
            <h4 className={css.itemTitle}>
              5 <span>million</span>
            </h4>
            <p className={css.itemDescription}>Refugees in Europe</p>
          </div>
        </div>
      </div>
    </>
  );
}
