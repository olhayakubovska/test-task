import React, { useRef, useState, useEffect } from "react";
import s from "./SettingsPanel.module.css";
import type { GlassPanelProps } from "../GlassPanel";

const AngleIcon = () => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fill-rule="evenodd"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      transform="translate(5 5)"
    >
      <path d="m5.5 11.5c0-2.76142375-2.23857625-5-5-5" />
      <path d="m.5.5v11h11" />
    </g>
  </svg>
);

const SunIcon = () => <span>&#x2600;</span>;

type GlassSettings = Omit<GlassPanelProps, "children" | "width" | "height">;

type SettingsPanelProps = {
  settings: GlassSettings;
  onSettingsChange: (newSettings: GlassSettings) => void;
};

const DEFAULT_SETTINGS: GlassSettings = {
  refraction: 80,
  depth: 20,
  dispersion: 50,
  frost: 4,
  lightAngle: 45,
};

const SettingsPanel = ({ settings, onSettingsChange }: SettingsPanelProps) => {
  const lampRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState<number | undefined>(settings.lightAngle);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setAngle(settings.lightAngle);
  }, [settings.lightAngle]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!lampRef.current) return;

      const rect = lampRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const angleRad = Math.atan2(deltaY, deltaX);
      let angleDeg = (angleRad * 180) / Math.PI;

      if (angleDeg < 0) angleDeg += 360;
      setAngle(angleDeg);
      onSettingsChange({ ...settings, lightAngle: angleDeg });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging, settings, onSettingsChange]);

  const handleLampClick = () => {
    setIsDragging(!isDragging);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : parseFloat(value);
    onSettingsChange({ ...settings, [name]: numericValue });
  };

  const handleReset = () => onSettingsChange(DEFAULT_SETTINGS);

  const rotationDegrees = angle;

  return (
    <div className={s.settingsPanel}>
      <div className={s.settingsHeader}>
        <div className={s.settingsTitle}>Glass</div>
        <span className={s.settingsBeta}>Beta</span>
        <button className={s.settingsResetBtn} onClick={handleReset}>
          ↺ Сброс
        </button>
      </div>

      <div className={s.settingsGroup}>
        <label className={s.settingsLabel}>Light</label>
        <div
          className={s.lightControlContainer}
          ref={lampRef}
          onClick={handleLampClick}
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
        >
          <div className={s.lightSettingVisual}>
            <div
              className={s.lightBeam}
              style={{ transform: `rotate(${rotationDegrees}deg)` }}
            ></div>
          </div>

          <div className={s.lightControls}>
            <div className={s.lightValueBox}>
              <AngleIcon />
              {Math.round(angle)}°
            </div>
            <div className={s.lightValueBox}>
              <span>
                <SunIcon />
              </span>{" "}
              80%
            </div>
          </div>
        </div>
      </div>

      <div className={s.settingsSeparator}></div>

      {["refraction", "depth", "dispersion", "frost"].map((name) => {
        const value = (settings as any)[name];

        const fillPercentage = `${((value - 0) / 100) * 100}%`;
        return (
          <div className={s.settingsGroup} key={name}>
            <label className={s.settingsLabel}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <div className={s.sliderControl}>
              <input
                type="range"
                name={name}
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={handleChange}
                className={s.customSlider}
                style={{ "--value": fillPercentage } as React.CSSProperties}
              />
              <span className={s.sliderValue}>{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SettingsPanel;
