import css from "./Map.module.css";
import popoverCss from "./popover.module.css";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { getAllMapEvents } from "../../../services/mapEvent";
import type { MapEvent } from "../../../types/mapEvent";

// Просте форматування дати (dd.MM.yyyy)
function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("uk-UA");
}

export default function Map() {
  const [events, setEvents] = useState<MapEvent[]>([]);
  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(600);

  useLayoutEffect(() => {
    function updateSize() {
      if (mapRef.current) setMapWidth(mapRef.current.offsetWidth);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const flowerSize = Math.round(mapWidth / 25);

  useEffect(() => {
    getAllMapEvents().then(setEvents);
  }, []);

  useEffect(() => {
    const close = () => setActivePopoverId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <>
      <div className={css.container}>
        <div className={css.content}>
          <h3 className={css.title}>
            Ukraine will always remember those united by war
          </h3>
          <p className={css.description}>
            This living map blossoms with digital flowers - each one marking a
            story, a voice, a memory rooted across Ukraine
          </p>
        </div>
        <div ref={mapRef} className={css.mapContainer}>
          <img
            src="/home-map.png"
            alt="Map of Ukraine"
            className={css.mapImage}
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
    </>
  );
}
