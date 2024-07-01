import express from "express";
import cors from "cors";
import axios from 'axios';
import { Pool } from "pg";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let pool: Pool | null = null;

app.post('/api/connect_database', async (req, res) => {
  try {
    const credentials = req.body;

    pool = new Pool({
      user: credentials.username,
      host: credentials.host,
      database: credentials.databaseName,
      password: credentials.password,
      port: parseInt(credentials.port),
    });

    res.status(200).json({ message: 'Connected to the database (Express) successfully!' });
  } catch (error) {
    console.log('Error connecting to the database:', error);
    res.status(500).json({ message: 'Failed to connect to the database', error: error });
  }
});

app.get('/api/get_lap_rows', async (req, res) => {
  try {
    if (pool === null) {
      console.error ("pool is null");
    } else {
      const queryResult = await pool.query(
        `SELECT DISTINCT ct.*,
          ct.frameidentifier,
          ct.speed,
          ct.throttle,
          ct.steering,
          ct.brake,
          ct.clutch,
          ct.gear,
          ct.enginerpm,
          ct.drsenabled,
          ct.frtyresurfacetemp,
          ct.fltyresurfacetemp,
          ct.rrtyresurfacetemp,
          ct.rltyresurfacetemp,
          cse.frontwing,
          cse.rearwing,
          cse.onthrottle,
          cse.offthrottle,
          cse.frontcamber,
          cse.rearcamber,
          cse.fronttoe,
          cse.reartoe,
          cse.frontsuspension,
          cse.rearsuspension,
          cse.frontantirollbar,
          cse.rearantirollbar,
          cse.frontsuspensionheight,
          cse.rearsuspensionheight,
          cse.brakepressure,
          cse.brakebias,
          cse.fronttyrepressure,
          cse.reartyrepressure,
          cse.ballast,
          cse.fuelload,
          cst.fuelmix,
          cst.frontbrakebias,
          cst.pitlimiter,
          cst.maxrpm,
          cst.idlerpm,
          cst.maxgears,
          cst.maxgears,
          cst.frtyrewear,
          cst.fltyrewear,
          cst.rrtyrewear,
          cst.rltyrewear,
          cst.actualtyrecompound,
          l.currentlaptime,
          l.currentlapnum
        FROM cartelemetry ct
        JOIN carsetup cse ON abs(cse.frameidentifier - ct.frameidentifier) < 3
        JOIN carstatus cst ON abs(cst.frameidentifier - ct.frameidentifier) < 3
        JOIN lap l ON abs(l.frameidentifier - ct.frameidentifier) < 3
        WHERE ct.thisindex = ct.playercarindex
          AND cse.thisindex = cse.playercarindex
          AND cst.thisindex = cst.playercarindex
          AND l.thisindex = l.playercarindex
          AND ct.sessionuid = 6
          AND cse.sessionuid = 6
          AND cst.sessionuid = 6
          AND l.sessionuid = 6
        ORDER BY ct.frameidentifier`
      );
      res.json(queryResult.rows);
      console.log("success");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching data');
  }
});
