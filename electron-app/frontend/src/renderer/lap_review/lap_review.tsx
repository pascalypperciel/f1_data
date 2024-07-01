import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LapList from "./lap_list";
import LapDetails from "./lap_details";
import "./lap_review.css";

function LapReview() {
  const [laps, setLaps] = useState([]);
  const [selectedLaps, setSelectedLaps] = useState<string[]>([]);
  const [sessionUid, setSessionUid] = useState<string>("");

  const handleImport = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/get_lap_rows?sessionuid=${sessionUid}`);
      const data = await response.json();

      const groupedLaps = data.reduce((acc, row) => {
        const lapNum = row.currentlapnum;
        if (!acc[lapNum]) {
          acc[lapNum] = [];
        }
        acc[lapNum].push(row);
        return acc;
      }, {});

      setLaps(groupedLaps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClear = () => {
    setSelectedLaps([]);
  };

  const getFinalLapTime = (lapRows) => {
    return lapRows[lapRows.length - 1]?.currentlaptime || 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const millis = Math.floor((seconds - Math.floor(seconds)) * 1000);

    const pad = (num, size) => ('000' + num).slice(size * -1);

    return `${pad(minutes, 2)}:${pad(secs, 2)}:${pad(millis, 3)}`;
  };

  const handleLapChange = (lapNum) => {
    setSelectedLaps((prevSelectedLaps) =>
      prevSelectedLaps.includes(lapNum)
        ? prevSelectedLaps.filter((num) => num !== lapNum)
        : [...prevSelectedLaps, lapNum]
    );
  };

  const selectedLapData = selectedLaps.map((lapNum) => laps[lapNum]);

  return (
    <div className="lap-review-container">
      <div className="header-section">
        <div className="import-section">
          <TextField
            label="Session UID"
            variant="outlined"
            value={sessionUid}
            onChange={(e) => setSessionUid(e.target.value)}
            className="import-textfield"
          />
          <Button
            variant="contained"
            className="import-button"
            onClick={handleImport}
          >
            Import
          </Button>
        </div>
        <Button
          variant="outlined"
          className="clear-button"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
      <LapList
        laps={laps}
        selectedLaps={selectedLaps}
        onLapChange={handleLapChange}
        formatTime={formatTime}
        getFinalLapTime={getFinalLapTime}
      />
      {selectedLaps.length > 0 && (
        <LapDetails lap={selectedLapData} lapNums={selectedLaps} />
      )}
    </div>
  );
}

export default LapReview;
