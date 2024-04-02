import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Paper } from "@mui/material";
import { WebSocketProvider } from "./websocket";

// Car Telemetry
import Brake from "./components/car_telemetry/brake";
import Clutch from "./components/car_telemetry/clutch";
import DRS from "./components/car_telemetry/drs";
import Gear from "./components/car_telemetry/gear";
import Speed from "./components/car_telemetry/speed";
import Speedometer from "./components/car_telemetry/speedometer";
import Steering from "./components/car_telemetry/steering";
import TempsPressureWear from "./components/car_telemetry/temperature-pressure-wear";
import Throttle from "./components/car_telemetry/throttle";

// Car Setup
import Setup from "./components/car_setup/setup"

// Car Status
import ABS from "./components/vehicle_condition/abs";
import Damage from "./components/vehicle_condition/damage";
import ERS from "./components/vehicle_condition/ers";
import Flags from "./components/vehicle_condition/flags";
import FrontBrakeBias from "./components/vehicle_condition/front_brake_bias";
import Fuel from "./components/vehicle_condition/fuel";
import PitLimiter from "./components/vehicle_condition/pit_limiter";
import TractionControl from "./components/vehicle_condition/traction_control";
import Tyre from "./components/vehicle_condition/tyre";

// Lap
import CurrentPosition from "./components/lap/current_position";
import Distance from "./components/lap/distance";
import DriverStatus from "./components/lap/driver_status";
import Lap from "./components/lap/times";
import Penalties from "./components/lap/penalties";
import PitStatus from "./components/lap/pit_status";
import Sector from "./components/lap/sector";
import StartingPosition from "./components/lap/starting_position";
import Times from "./components/lap/times";

// Session
import SafetyCars from "./components/session/safety_car";
import SessionInfo from "./components/session/session_info";
import Temperature from "./components/session/temperatures";
import Track from "./components/session/track";
import Weather from "./components/session/weather";

function Dashboard() {

  const [selectedForHome, setSelectedForHome] = useState(() => {
    const saved = localStorage.getItem("selectedForHome");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleSelection = (componentName: string) => {
    setSelectedForHome((prev: {[key: string]: boolean}) => {
      const newState = { ...prev, [componentName]: !prev[componentName] };
      localStorage.setItem("selectedForHome", JSON.stringify(newState));
      return newState;
    });
  };

  const homeGridStyle: React.CSSProperties = {
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(700px, 1fr))',
    justifyContent: 'center'
  };

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '20px',
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  };

  const paperStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <WebSocketProvider>
      <div>
        {/* <button onClick={toggleConnection}>
          {isConnected ? 'Stop' : 'Start'}
        </button> */}
        <Routes>
          <Route path="home" element={
            <div style={homeGridStyle}>
              {selectedForHome['Speed'] && (
                <Paper style={paperStyle} onClick={() => toggleSelection('Speed')}>
                  <Speed isSelectedForHome={true} onToggleSelected={() => {}} />
                </Paper>
              )}
            </div>
          } />
          <Route
            path="cartelemetry"
            element={
              <div style={mainContainerStyle}>
                <div style={columnStyle}>
                  <Paper style={paperStyle}>
                    <Speed
                      isSelectedForHome={selectedForHome['Speed']}
                      onToggleSelected={() => toggleSelection('Speed')}
                    />
                  </Paper>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </WebSocketProvider>
  );
}

export default Dashboard;
