import React from "react";
import "./lap_details.css";

import Speed from "./components/car_telemetry/speed";

function LapDetails({ lap, lapNum }) {
  const speedData = lap.map((lapRow, index) => ({
    speed: lapRow.speed,
    frame: index
  }));

  const [isSelectedForHome, setIsSelectedForHome] = React.useState(false);

  const handleToggleSelected = () => {
    setIsSelectedForHome(!isSelectedForHome);
  };

  return (
    <div className="lap-details">
      <h3>Details for Lap {lapNum}</h3>
      <Speed
        speedData={speedData}
        isSelectedForHome={isSelectedForHome}
        onToggleSelected={handleToggleSelected}
      />
      {/* Add more charts and details as needed */}
    </div>
  );
}

export default LapDetails;
