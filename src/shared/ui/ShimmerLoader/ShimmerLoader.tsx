import { useState } from "react";
import s from "./ShimmerLoader.module.css";

const ShimmerLoader = () => {
  const [isActive, setIsActive] = useState(false);

  const trackHeights = [15, 49, 89, 33, 49, 85, 81, 49, 15];

  return (
    <div className={s.loadingContainer}>
      <header className={s.loadingHeader}>
        <div className={s.soundfluencersLogo}>
          <button onClick={() => setIsActive(!isActive)} className={s.btn}>
            <div className={s.logoWave}>
              <div className={`${s.logoBar} ${s.logoBar1}`}></div>
              <div className={`${s.logoBar} ${s.logoBar2}`}></div>
              <div className={`${s.logoBar} ${s.logoBar3}`}></div>
              <div className={`${s.logoBar} ${s.logoBar4}`}></div>
            </div>
            SoundInfluencers
          </button>
        </div>
      </header>
      <main className={s.loadingMain}>
        {isActive && (
          <div className={s.audioVisualizer}>
            {trackHeights.map((h, index) => (
              <div
                key={index}
                className={`${s.bar} ${isActive ? s.animate : ""}`}
                style={{
                  height: `${h}px`,
                  ["--delay" as string]: `${index * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
};

export default ShimmerLoader;
