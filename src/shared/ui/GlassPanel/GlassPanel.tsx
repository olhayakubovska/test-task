import type { CSSProperties, ReactNode } from "react";
import s from "./GlassPanel.module.css";

export type GlassPanelProps = {
  children?: ReactNode;
  refraction?: number;
  depth?: number;
  dispersion?: number;
  frost?: number;
  lightAngle?: number;
  width?: string;
  height?: string;
};



const GlassPanel = ({
  refraction = 80,
  depth = 20,
  dispersion = 50,
  frost = 4,
  lightAngle = -45,
  width = "186px",
  height = "36px",
  children,
}: GlassPanelProps) => {
  const offsetMagnitude = Math.abs(lightAngle) / 10;
  const shadowPosX = `${(lightAngle > 0 ? -1 : 1) * offsetMagnitude}px`;
  const shadowPosY = `${offsetMagnitude}px`;

  const alpha = 1 - (refraction ?? 80) / 100;
  const blurValue = (depth ?? 20) * 0.5;
  const borderOpacity = Math.min(1, (dispersion ?? 50) / 100);
  const insetBlur = (dispersion ?? 50) * 0.5;
  const shadowSpread = (frost ?? 4) * 2;
  const shadowOpacity = (frost ?? 4) / 100;

  const glassStyles: CSSProperties = {
    "--bg-alpha": alpha,
    "--blur-value": `${blurValue}px`,
    "--border-opacity": borderOpacity,
    "--inset-shadow-blur": `${insetBlur}px`,
    "--frost-shadow-spread": `${shadowSpread}px`,
    "--shadow-opacity": shadowOpacity,
    "--shadow-pos-x": shadowPosX,
    "--shadow-pos-y": shadowPosY,
    "--light-angle": `${lightAngle}deg`,
    width,
    height,
  } as CSSProperties;

  return (
    <div style={glassStyles} className={s.glassPanel}>
      <div className={s.children}>{children}</div>
      <div
        className={s.lightHighlight}
        style={{ transform: `rotate(${lightAngle}deg)` }}
      />
    </div>
  );
};

export default GlassPanel;
