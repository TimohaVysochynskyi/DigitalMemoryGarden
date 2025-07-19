import css from "./MemoryTools.module.css";

export default function MemoryTools() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>Our memory tools</h2>
        <div className={css.tools}>
          <div className={css.tool}>
            <div className={css.toolImageWrapper}>
              <img
                src="/tool-flower.png"
                alt="Flower image"
                className={css.toolImage}
              />
              <button className={css.toolButton}>
                <img
                  src="/eye-button.png"
                  alt="Eye button"
                  className={css.toolButtonImage}
                />
              </button>
            </div>
            <h3 className={css.toolTitle}>How to plant a flower of memory</h3>
          </div>
          <div className={css.tool}>
            <div className={css.toolImageWrapper}>
              <img
                src="/tool-candle.png"
                alt="Candle image"
                className={css.toolImage}
              />
              <button className={css.toolButton}>
                <img
                  src="/eye-button.png"
                  alt="Eye button"
                  className={css.toolButtonImage}
                />
              </button>
            </div>
            <h3 className={css.toolTitle}>How to light a memorial candle</h3>
          </div>
          <div className={css.tool}>
            <div className={css.toolImageWrapper}>
              <img
                src="/tool-books.png"
                alt="Books image"
                className={css.toolImage}
              />
              <button className={css.toolButton}>
                <img
                  src="/eye-button.png"
                  alt="Eye button"
                  className={css.toolButtonImage}
                />
              </button>
            </div>
            <h3 className={css.toolTitle}>How to use the memory archive</h3>
          </div>
        </div>
      </div>
    </>
  );
}
