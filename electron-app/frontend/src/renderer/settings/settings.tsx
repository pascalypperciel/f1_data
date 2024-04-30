import { Routes, Route } from "react-router-dom";

import General from "./general";
import Database from "./database";

interface SettingsProps {
  onToggleDarkMode: () => void;
  darkMode: boolean;
}

function Setting({ onToggleDarkMode, darkMode }: SettingsProps) {
  return (
    <div>
      <Routes>
        <Route
          path="general"
          element={<General onToggleDarkMode={onToggleDarkMode} darkMode={darkMode} />}
        />
        <Route
          path="database"
          element={<Database/>}
        />
      </Routes>
    </div>
  );
}

export default Setting;

