import { Routes, Route } from "react-router-dom";

import TyreStrategy from "./tyre_strategy";

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
      </Routes>
    </div>
  );
}

export default Analysis;
