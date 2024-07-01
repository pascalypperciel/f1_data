import React from "react";
import Speed from './components/car_telemetry/speed';
import Throttle from './components/car_telemetry/throttle';
import Steering from './components/car_telemetry/steering';
import Brake from './components/car_telemetry/brake';
import Clutch from "./components/car_telemetry/clutch";
import Gear from "./components/car_telemetry/gear";
import Setup from "./components/car_setup/setup"
import "./lap_details.css";

interface LapDetailsProps {
  lap: any[][];
  lapNums: string[];
}

const LapDetails: React.FC<LapDetailsProps> = ({ lap, lapNums }) => {
  const speedDataSets = lap.map((lapData) =>
    lapData.map((lapRow) => ({
      speed: lapRow.speed,
      distance: lapRow.lapdistance
    }))
  );

  const throttleDataSets = lap.map((lapData) =>
    lapData.map((lapRow) => ({
      throttle: lapRow.throttle,
      distance: lapRow.lapdistance
    }))
  );

  const steeringDataSets = lap.map((lapData) =>
    lapData.map((lapRow) => ({
      steering: lapRow.steering,
      distance: lapRow.lapdistance
    }))
  );

  const brakeDataSets = lap.map((lapData) =>
    lapData.map((lapRow) => ({
      brake: lapRow.brake,
      distance: lapRow.lapdistance
    }))
  );

  const clutchDataSets = lap.map((lapData) =>
    lapData.map((lapRow) => ({
      clutch: lapRow.clutch,
      distance: lapRow.lapdistance
    }))
  );

  const gearDataSets = lap.map((lapData) =>
    lapData.map((lapRow) => ({
      gear: lapRow.gear,
      distance: lapRow.lapdistance
    }))
  );

  const setupDataSets = lap.map((lapData) => {
    const lastRow = lapData[lapData.length - 1];
    return {
      frontwing: lastRow.frontwing,
      rearwing: lastRow.rearwing,
      onthrottle: lastRow.onthrottle,
      offthrottle: lastRow.offthrottle,
      frontcamber: lastRow.frontcamber,
      rearcamber: lastRow.rearcamber,
      fronttoe: lastRow.fronttoe,
      reartoe: lastRow.reartoe,
      frontsuspension: lastRow.frontsuspension,
      rearsuspension: lastRow.rearsuspension,
      frontantirollbar: lastRow.frontantirollbar,
      rearantirollbar: lastRow.rearantirollbar,
      frontsuspensionheight: lastRow.frontsuspensionheight,
      rearsuspensionheight: lastRow.rearsuspensionheight,
      brakepressure: lastRow.brakepressure,
      brakebias: lastRow.brakebias,
      fronttyrepressure: lastRow.fronttyrepressure,
      reartyrepressure: lastRow.reartyrepressure,
      ballast: lastRow.ballast,
      fuelload: lastRow.fuelload
    };
  });

  return (
    <div className="lap-details">
      <Speed
        speedDataSets={speedDataSets}
      />
      <Throttle
        throttleDataSets={throttleDataSets}
      />
      <Steering
        steeringDataSets={steeringDataSets}
      />
      <Brake
        brakeDataSets={brakeDataSets}
      />
      <Clutch
        clutchDataSets={clutchDataSets}
      />
      <Gear
        gearDataSets={gearDataSets}
      />
      <Setup
        setupDataSets={setupDataSets}
        lapNums={lapNums}
      />
    </div>
  );
}

export default LapDetails;
