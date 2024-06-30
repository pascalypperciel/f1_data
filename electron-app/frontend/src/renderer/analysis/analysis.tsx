import { Routes, Route } from "react-router-dom";

import TyreStrategy from "./tyre_strategy";
import LapTime from "./lap_time";
import TyreWear from "./tyre_wear";

interface AnalysisProps {
  darkMode: boolean;
}

const Analysis: React.FC<AnalysisProps> = ({ darkMode }) => {
  return (
    <div>
      <Routes>
        <Route
          path="tyrestrategy"
          element={ <TyreStrategy darkMode={darkMode}></TyreStrategy> }
        />
        <Route
          path="laptime"
          element={ <LapTime darkMode={darkMode}></LapTime> }
        />
        <Route
          path="tyrewear"
          element={ <TyreWear darkMode={darkMode}></TyreWear> }
        />
      </Routes>
    </div>
  );
}

export default Analysis;
