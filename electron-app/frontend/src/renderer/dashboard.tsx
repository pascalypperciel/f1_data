import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Paper } from "@mui/material";

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
    <div>
      <Routes>
      <Route path="home" element={
        <div style={homeGridStyle}>
          {/* Car Telemetry */}
          {selectedForHome['Speedometer'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Speedometer')}>
              <Speedometer isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Speed'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Speed')}>
              <Speed isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Throttle'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Throttle')}>
              <Throttle isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Gear'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Gear')}>
              <Gear isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Brake'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Brake')}>
              <Brake isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['TempsPressureWear'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('TempsPressureWear')}>
              <TempsPressureWear isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['DRS'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('DRS')}>
              <DRS isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Clutch'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Clutch')}>
              <Clutch isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Steering'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Steering')}>
              <Steering isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {/* Vehicle Condition */}
          {selectedForHome['ABS'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('ABS')}>
              <ABS isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['ERS'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('ERS')}>
              <ERS isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['FrontBrakeBias'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('FrontBrakeBias')}>
              <FrontBrakeBias isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['PitLimiter'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('PitLimiter')}>
              <PitLimiter isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['TractionControl'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('TractionControl')}>
              <TractionControl isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Tyre'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Tyre')}>
              <Tyre isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Damage'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Damage')}>
              <Damage isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Flags'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Flags')}>
              <Flags isSelectedForHome={true} onToggleSelected={() => {}} />
            </Paper>
          )}
          {selectedForHome['Fuel'] && (
            <Paper style={paperStyle} onClick={() => toggleSelection('Fuel')}>
              <Fuel isSelectedForHome={true} onToggleSelected={() => {}} />
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
                  <Speedometer
                    isSelectedForHome={selectedForHome['Speedometer']}
                    onToggleSelected={() => toggleSelection('Speedometer')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Speed
                    isSelectedForHome={selectedForHome['Speed']}
                    onToggleSelected={() => toggleSelection('Speed')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Throttle
                    isSelectedForHome={selectedForHome['Throttle']}
                    onToggleSelected={() => toggleSelection('Throttle')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Gear
                    isSelectedForHome={selectedForHome['Gear']}
                    onToggleSelected={() => toggleSelection('Gear')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Brake
                    isSelectedForHome={selectedForHome['Brake']}
                    onToggleSelected={() => toggleSelection('Brake')}
                  />
                </Paper>
              </div>
              <div style={columnStyle}>
                <Paper style={paperStyle}>
                  <TempsPressureWear
                    isSelectedForHome={selectedForHome['TempsPressureWear']}
                    onToggleSelected={() => toggleSelection('TempsPressureWear')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <DRS
                    isSelectedForHome={selectedForHome['DRS']}
                    onToggleSelected={() => toggleSelection('DRS')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Clutch
                    isSelectedForHome={selectedForHome['Clutch']}
                    onToggleSelected={() => toggleSelection('Clutch')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Steering
                    isSelectedForHome={selectedForHome['Steering']}
                    onToggleSelected={() => toggleSelection('Steering')}
                  />
                </Paper>

              </div>
            </div>
          }
        />
        <Route
          path="carsetup"
          element={
            <div style={mainContainerStyle}>
              <Paper style={paperStyle}>
                <Setup
                  isSelectedForHome={selectedForHome['Setup']}
                  onToggleSelected={() => toggleSelection('Setup')}
                />
              </Paper>
            </div>
          }
        />
        <Route
          path="vehiclecondition"
          element={
            <div style={mainContainerStyle}>
              <div style={columnStyle}>
                <Paper style={paperStyle}>
                  <ABS
                    isSelectedForHome={selectedForHome['ABS']}
                    onToggleSelected={() => toggleSelection('ABS')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <ERS
                    isSelectedForHome={selectedForHome['ERS']}
                    onToggleSelected={() => toggleSelection('ERS')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <FrontBrakeBias
                    isSelectedForHome={selectedForHome['FrontBrakeBias']}
                    onToggleSelected={() => toggleSelection('FrontBrakeBias')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <PitLimiter
                    isSelectedForHome={selectedForHome['PitLimiter']}
                    onToggleSelected={() => toggleSelection('PitLimiter')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <TractionControl
                    isSelectedForHome={selectedForHome['TractionControl']}
                    onToggleSelected={() => toggleSelection('TractionControl')}
                  />
                </Paper>
              </div>
              <div style={columnStyle}>
                <Paper style={paperStyle}>
                  <Tyre
                    isSelectedForHome={selectedForHome['Tyre']}
                    onToggleSelected={() => toggleSelection('Tyre')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Damage
                    isSelectedForHome={selectedForHome['Damage']}
                    onToggleSelected={() => toggleSelection('Damage')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Flags
                    isSelectedForHome={selectedForHome['Flags']}
                    onToggleSelected={() => toggleSelection('Flags')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Fuel
                    isSelectedForHome={selectedForHome['Fuel']}
                    onToggleSelected={() => toggleSelection('Fuel')}
                  />
                </Paper>
              </div>
            </div>
          }
        />
        <Route
          path="lap"
          element={
            <div style={mainContainerStyle}>
              <div style={columnStyle}>
                <Paper style={paperStyle}>
                  <CurrentPosition
                    isSelectedForHome={selectedForHome['CurrentPosition']}
                    onToggleSelected={() => toggleSelection('CurrentPosition')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Distance
                    isSelectedForHome={selectedForHome['Distance']}
                    onToggleSelected={() => toggleSelection('Distance')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <DriverStatus
                    isSelectedForHome={selectedForHome['DriverStatus']}
                    onToggleSelected={() => toggleSelection('DriverStatus')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Lap
                    isSelectedForHome={selectedForHome['Lap']}
                    onToggleSelected={() => toggleSelection('Lap')}
                  />
                </Paper>
              </div>
              <div style={columnStyle}>
                <Paper style={paperStyle}>
                  <PitStatus
                    isSelectedForHome={selectedForHome['PitStatus']}
                    onToggleSelected={() => toggleSelection('PitStatus')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Sector
                    isSelectedForHome={selectedForHome['Sector']}
                    onToggleSelected={() => toggleSelection('Sector')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <StartingPosition
                    isSelectedForHome={selectedForHome['StartingPosition']}
                    onToggleSelected={() => toggleSelection('StartingPosition')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Times
                    isSelectedForHome={selectedForHome['Times']}
                    onToggleSelected={() => toggleSelection('Times')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Penalties
                    isSelectedForHome={selectedForHome['Penalties']}
                    onToggleSelected={() => toggleSelection('Penalties')}
                  />
                </Paper>
              </div>
            </div>
          }
        />
        <Route
          path="session"
          element={
            <div style={mainContainerStyle}>
              <div style={columnStyle}>
                <Paper style={paperStyle}>
                  <SafetyCars
                    isSelectedForHome={selectedForHome['SafetyCars']}
                    onToggleSelected={() => toggleSelection('SafetyCars')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <SessionInfo
                    isSelectedForHome={selectedForHome['SessionInfo']}
                    onToggleSelected={() => toggleSelection('SessionInfo')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Temperature
                    isSelectedForHome={selectedForHome['Temperature']}
                    onToggleSelected={() => toggleSelection('Temperature')}
                  />
                </Paper>
              </div>
              <div style={columnStyle}>
                <Paper style={paperStyle}>
                  <Track
                    isSelectedForHome={selectedForHome['Track']}
                    onToggleSelected={() => toggleSelection('Track')}
                  />
                </Paper>
                <Paper style={paperStyle}>
                  <Weather
                    isSelectedForHome={selectedForHome['Weather']}
                    onToggleSelected={() => toggleSelection('Weather')}
                  />
                </Paper>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default Dashboard;
