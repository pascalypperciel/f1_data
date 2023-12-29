import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = 3001; // or any other port you prefer

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Car Telemetry
app.get('/api/car-telemetry/brake', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT brake, time FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time desc limit 200'); //200 last entries. ~10 seconds
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching brake data');
  }
});

app.get('/api/car-telemetry/clutch', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT clutch, time FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time desc limit 200'); //200 last entries. ~10 seconds
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching clutch data');
  }
});

app.get('/api/car-telemetry/latest-drs-enabled', async (req, res) => {
  try {
    const result = await pool.query('SELECT DRSEnabled , time FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching DRS enabled data');
  }
});

app.get('/api/car-telemetry/latest-drs-allowed', async (req, res) => {
  try {
    const result = await pool.query('SELECT drsallowed , time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching DRS allowed data');
  }
});


app.get('/api/car-telemetry/gear', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT gear, time FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time desc limit 200'); //200 last entries. ~10 seconds
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching gear data');
  }
});

app.get('/api/car-telemetry/speed', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT speed, time FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time desc limit 200'); //200 last entries. ~10 seconds
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching speed data');
  }
});

app.get('/api/car-telemetry/speedometer', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT speed, enginerpm, revlights FROM cartelemetry WHERE playercarindex = thisindex ORDER BY frameidentifier desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching speedometer data');
  }
});

app.get('/api/car-telemetry/steering', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT steering, time FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time desc limit 200'); //200 last entries. ~10 seconds
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching steering data');
  }
});

app.get('/api/car-telemetry/throttle', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT throttle, time FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time desc limit 200'); //200 last entries. ~10 seconds
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while throttle brake data');
  }
});

app.get('/api/car-telemetry/temperature-pressure-wear', async (req, res) => {
  try {
    const queryResult = await pool.query(
      `SELECT
      t.FLBrakeTemp, t.FRBrakeTemp, t.RLBrakeTemp, t.RRBrakeTemp,
      t.FLTyreSurfaceTemp, t.FRTyreSurfaceTemp, t.RLTyreSurfaceTemp, t.RRTyreSurfaceTemp,
      t.FLTyreInnerTemp, t.FRTyreInnerTemp, t.RLTyreInnerTemp, t.RRTyreInnerTemp,
      t.FLTyrePressure, t.FRTyrePressure, t.RLTyrePressure, t.RRTyrePressure,
      t.EngineTemp, t.time,
      s.FLTyreWear, s.FRTyreWear, s.RLTyreWear, s.RRTyreWear
      FROM
          (SELECT * FROM cartelemetry WHERE playercarindex = thisindex ORDER BY time DESC LIMIT 1) t
      JOIN
          (SELECT * FROM carstatus WHERE playercarindex = thisindex ORDER BY time DESC LIMIT 1) s
      ON
          t.time = s.time;`);
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching temperature-pressure-wear data');
  }
});

// Vehicle Conidtion (Car Status)
app.get('/api/car-status/abs', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT abs, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 200'); //200 last entries. ~10 seconds
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching brake data');
  }
});

app.get('/api/car-status/damage', async (req, res) => {
  try {
    const queryResult = await pool.query(
      `SELECT
      FLTyreDamage, FRTyreDamage, RLTyreDamage, RRTyreDamage,
	    FLWingDamage, FRWingDamage, RearWingDamage,
	    EngineDamage,
	    GearBoxDamage,
      time
      FROM
          carstatus
      WHERE playercarindex = thisindex
      LIMIT 1;`);
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching damage data');
  }
});

app.get('/api/car-status/ers-deploy-mode', async (req, res) => {
  try {
    const result = await pool.query('SELECT ersdeploymode, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching ERS deploy mode data');
  }
});

app.get('/api/car-status/ers-energy-store', async (req, res) => {
  try {
    const result = await pool.query('SELECT ERSStoreEnergy, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 200');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching ERS energy store data');
  }
});

app.get('/api/car-status/flags', async (req, res) => {
  try {
    const result = await pool.query('SELECT VehicleFIAFlages, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching flags data');
  }
});

app.get('/api/car-status/front-brake-bias', async (req, res) => {
  try {
    const result = await pool.query('SELECT FrontBrakeBias, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching front brake bias data');
  }
});

app.get('/api/car-status/fuel', async (req, res) => {
  try {
    const result = await pool.query('SELECT FuelInTank, FuelCapacity,FuelRemainingLaps, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching fuel data');
  }
});

app.get('/api/car-status/pitlimiter', async (req, res) => {
  try {
    const result = await pool.query('SELECT PitLimiter, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching pit limiter data');
  }
});

app.get('/api/car-status/tractioncontrol', async (req, res) => {
  try {
    const result = await pool.query('SELECT tractioncontrol, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching traction control data');
  }
});

app.get('/api/car-status/tyre', async (req, res) => {
  try {
    const result = await pool.query('SELECT ActualTyreCompound, TyreVisualCompound, time FROM carstatus WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching tyre data');
  }
});

// Lap
app.get('/api/lap/current-position', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT CarPosition FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching current position data');
  }
});

app.get('/api/lap/distance', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT LapDistance, TotalDistance FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching distance data');
  }
});

app.get('/api/lap/driver-status', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT DriverStatus FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching distance data');
  }
});

app.get('/api/lap/lap', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT CurrentLapNum FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching current position data');
  }
});

app.get('/api/lap/penalties', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT TimePenalties FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching penalties data');
  }
});

app.get('/api/lap/pit-status', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT PitStatus FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching pit status data');
  }
});

app.get('/api/lap/sector', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT Sector FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching sector data');
  }
});

app.get('/api/lap/starting-position', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT GridPosition FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching grid position data');
  }
});

app.get('/api/lap/times', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT LastLapTime, CurrentLapTime, BestLapTime, Sector1Time, Sector2Time FROM lap WHERE playercarindex = thisindex ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching times data');
  }
});

// Session
app.get('/api/session/safety-car', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT SafetyCarStatus FROM Session ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching safety car data');
  }
});

app.get('/api/session/session-info', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT SessionType, SessionDuration, SessionTimeLeft FROM Session ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching session info data');
  }
});

app.get('/api/session/temperature', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT TrackTemp, AirTemp FROM Session ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching temperature data');
  }
});

app.get('/api/session/track', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT TotalLaps, TrackId, TrackLength FROM Session ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching track data');
  }
});

app.get('/api/session/weather', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT Weather FROM Session ORDER BY time desc limit 1');
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching weather data');
  }
});

// Car setup
app.get('/api/car-setup/setup', async (req, res) => {
  try {
    const queryResult = await pool.query(
      `SELECT
      frontWing, rearWing, onThrottle, offThrottle, frontCamber,
	    rearCamber, frontToe, rearToe, frontSuspension, rearSuspension,
	    frontAntiRollBar, rearAntiRollBar, frontSuspensionHeight,
	    rearSuspensionHeight, brakePressure, brakeBias, frontTyrePressure,
      rearTyrePressure, ballast, fuelLoad, time
      FROM
      carsetup
      WHERE playercarindex = thisindex
      LIMIT 1;`);
    res.json(queryResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching car setup data');
  }
});
