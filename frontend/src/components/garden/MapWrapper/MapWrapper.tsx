import css from "./MapWrapper.module.css";
import popoverCss from "./popover.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { getAllMapEvents } from "../../../services/mapEvent";
import type { MapEvent } from "../../../types/mapEvent";
import type { Category } from "../../../types/category";

// Просте форматування дати (dd.MM.yyyy)
function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("uk-UA");
}

type MapWrapperProps = {
  categories: Category[];
};

export default function MapWrapper({ categories }: MapWrapperProps) {
  const [events, setEvents] = useState<MapEvent[]>([]);
  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);
  // Окремі ref та ширини для desktop і mobile
  const mapRef = useRef<HTMLDivElement>(null);
  const mapMobileRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(600);
  const [mapWidthMobile, setMapWidthMobile] = useState(320);
  useLayoutEffect(() => {
    function updateSize() {
      if (mapRef.current) setMapWidth(mapRef.current.offsetWidth);
      if (mapMobileRef.current)
        setMapWidthMobile(mapMobileRef.current.offsetWidth);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const flowerSize = Math.round(mapWidth / 25);
  const flowerSizeMobile = Math.round(mapWidthMobile / 25);

  useEffect(() => {
    getAllMapEvents().then(setEvents);
  }, []);

  useEffect(() => {
    const close = () => setActivePopoverId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className={css.container}>
      <div className={css.content}>
        <p className={css.titleMobile}>
          Ukraine will always remember those united by war
        </p>
        {/* Мобільна інтерактивна карта */}
        <div ref={mapMobileRef} className={css.mapContainerMobile}>
          <img
            src="/garden-map.png"
            alt="Garden Map"
            className={css.mapImageAbsolute}
          />
          {events.map((ev) => {
            const half = flowerSizeMobile / 2;
            const isActive = activePopoverId === ev._id;
            return (
              <div
                key={ev._id}
                style={{
                  position: "absolute",
                  left: `calc(${ev.x}% - ${half}px)`,
                  top: `calc(${ev.y}% - ${half}px)`,
                  width: flowerSizeMobile,
                  height: flowerSizeMobile,
                  zIndex: (ev.zIndex || 1) + 10,
                }}
              >
                <img
                  src={ev.miniatureImage}
                  alt={ev.title}
                  className={css.flowerMarker}
                  style={{ width: flowerSizeMobile, height: flowerSizeMobile }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopoverId(isActive ? null : ev._id);
                  }}
                  title={ev.title}
                />
                {isActive && (
                  <div
                    className={popoverCss.popover}
                    style={{
                      left: "50%",
                      top: 0,
                      transform: `translate(-50%, -110%)`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={popoverCss.popoverTitle}>{ev.title}</div>
                    <div className={popoverCss.popoverDate}>
                      {formatDate(ev.createdAt)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className={css.title}>
          Ukraine will always remember those united by war
        </p>
        <ul className={css.list}>
          {categories.map((cat) => (
            <li key={cat._id} className={css.listItem}>
              {cat.miniatureImage && (
                <img
                  src={cat.miniatureImage}
                  alt={cat.name}
                  className={css.itemIcon}
                />
              )}
              <span className={css.itemText}>{cat.name}</span>
            </li>
          ))}
        </ul>
        <div className={css.btnsWrapper}>
          <OutlineButton to="/archives" color="light">
            Read all stories
          </OutlineButton>
          <OutlineButton to="/gallery" color="light">
            View all media
          </OutlineButton>
        </div>
      </div>
      {/* Інтерактивна карта з позначками */}
      <div ref={mapRef} className={css.mapContainer}>
        <img
          src="/garden-map.png"
          alt="Garden Map"
          className={css.mapImageAbsolute}
        />
        {events.map((ev) => {
          const half = flowerSize / 2;
          const isActive = activePopoverId === ev._id;
          return (
            <div
              key={ev._id}
              style={{
                position: "absolute",
                left: `calc(${ev.x}% - ${half}px)`,
                top: `calc(${ev.y}% - ${half}px)`,
                width: flowerSize,
                height: flowerSize,
                zIndex: (ev.zIndex || 1) + 10,
              }}
            >
              <img
                src={ev.miniatureImage}
                alt={ev.title}
                className={css.flowerMarker}
                style={{ width: flowerSize, height: flowerSize }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePopoverId(isActive ? null : ev._id);
                }}
                title={ev.title}
              />
              {isActive && (
                <div
                  className={popoverCss.popover}
                  style={{
                    left: "50%",
                    top: 0,
                    transform: `translate(-50%, -110%)`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={popoverCss.popoverTitle}>{ev.title}</div>
                  <div className={popoverCss.popoverDate}>
                    {formatDate(ev.createdAt)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
