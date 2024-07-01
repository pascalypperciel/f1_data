import React from "react";
import "./lap_list.css";

function LapList({ laps, onLapClick, selectedLap, formatTime, getFinalLapTime }) {
  return (
    <div className="laps-list">
      {Object.keys(laps).map((lapNum) => (
        <div
          key={lapNum}
          className={`lap-row ${lapNum === selectedLap ? 'selected' : ''}`}
          onClick={() => onLapClick(lapNum)}
        >
          <span>Lap {lapNum}</span>
          <span>Final Lap Time: {formatTime(getFinalLapTime(laps[lapNum]))}</span>
        </div>
      ))}
    </div>
  );
}

export default LapList;
