import React from "react";
import "./lap_list.css";

interface LapListProps {
  laps: any;
  selectedLaps: string[];
  onLapChange: (lapNum: string) => void;
  formatTime: (seconds: number) => string;
  getFinalLapTime: (lapRows: any[]) => number;
}

const LapList: React.FC<LapListProps> = ({ laps, selectedLaps, onLapChange, formatTime, getFinalLapTime }) => {
  return (
    <div className="laps-list">
      {Object.keys(laps).map((lapNum) => (
        <div key={lapNum} className="lap-row">
          <input
            type="checkbox"
            checked={selectedLaps.includes(lapNum)}
            onChange={() => onLapChange(lapNum)}
          />
          <span>Lap {lapNum}</span>
          <span>Final Lap Time: {formatTime(getFinalLapTime(laps[lapNum]))}</span>
        </div>
      ))}
    </div>
  );
}

export default LapList;
