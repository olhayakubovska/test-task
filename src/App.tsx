import { useState } from "react";
import type { GlassPanelProps } from "./shared/ui/GlassPanel/GlassPanel";
import SettingsPanel from "./shared/ui/GlassPanel/SettingsPanel/SettingsPanel";
import GlassPanel from "./shared/ui/GlassPanel/GlassPanel";

import sApp from "./App.module.css";

function App() {
  const [glassSettings, setGlassSettings] = useState<
    Omit<GlassPanelProps, "children" | "width" | "height">
  >({
    refraction: 80,
    depth: 40,
    dispersion: 50,
    frost: 4,
    lightAngle: 45,
  });

  const handleSettingsChange = (
    newSettings: Omit<GlassPanelProps, "children" | "width" | "height">
  ) => {
    setGlassSettings(newSettings);
  };

  return (
    <div className={sApp.container}>
      <SettingsPanel
        settings={glassSettings}
        onSettingsChange={handleSettingsChange}
      />
      <div className={sApp.appContainer}>
        <div className={sApp.backgroundGradient}>
          <div className={sApp.testTextOverlay}>
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
            TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
          </div>
        </div>

        <div className={sApp.uiElementsWrapper}>
          <GlassPanel {...glassSettings} />
        </div>
      </div>
    </div>
  );
}

export default App;
