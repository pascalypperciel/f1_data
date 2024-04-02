interface Header {
  packetFormat: number;
  gameMajorVersion: number;
  gameMinorVersion: number;
  packetVersion: number;
  packetId: number;
  sessionUID: bigint;
  sessionTime: number;
  frameIdentifier: number;
  playerCarIndex: number;
}

interface CarSetupData {
  frame: number,
  frontWing: number;
  rearWing: number;
  onThrottle: number;
  offThrottle: number;
  frontCamber: number;
  rearCamber: number;
  frontToe: number;
  rearToe: number;
  frontSuspension: number;
  rearSuspension: number;
  frontAntiRollBar: number;
  rearAntiRollBar: number;
  frontSuspensionHeight: number;
  rearSuspensionHeight: number;
  brakePressure: number;
  brakeBias: number;
  frontTyrePressure: number;
  rearTyrePressure: number;
  ballast: number;
  fuelLoad: number;
}

interface CarTelemetryData {
  frame: number,
  speed: number;
  throttle: number;
  steer: number;
  brake: number;
  clutch: number;
  gear: number;
  engineRPM: number;
  drs: number;
  revLightsPercent: number;
  brakesTemperature: number[];
  tyresSurfaceTemperature: number[];
  tyresInnerTemperature: number[];
  engineTemperature: number;
  tyresPressure: number[];
  surfaceType: number[];
}

interface LapData {
  frame: number,
  lastLapTime: number;
  currentLapTime: number;
  bestLapTime: number;
  sector1Time: number;
  sector2Time: number;
  lapDistance: number;
  totalDistance: number;
  safetyCarDelta: number;
  carPosition: number;
  currentLapNum: number;
  pitStatus: number;
  sector: number;
  currentLapInvalid: number;
  penalties: number;
  gridPosition: number;
  driverStatus: number;
  resultStatus: number;
}

interface CarStatusData {
  frame: number,
  tractionControl: number;
  antiLockBrakes: number;
  fuelMix: number;
  frontBrakeBias: number;
  pitLimiterStatus: number;
  fuelInTank: number;
  fuelCapacity: number;
  fuelRemainingLaps: number;
  maxRPM: number;
  idleRPM: number;
  maxGears: number;
  drsAllowed: number;
  tyresWear: number[];
  actualTyreCompound: number;
  tyreVisualCompound: number;
  tyresDamage: number[];
  frontLeftWingDamage: number;
  frontRightWingDamage: number;
  rearWingDamage: number;
  engineDamage: number;
  gearBoxDamage: number;
  vehicleFiaFlags: number;
  ersStoreEnergy: number;
  ersDeployMode: number;
  ersHarvestedThisLapMGUK: number;
  ersHarvestedThisLapMGUH: number;
  ersDeployedThisLap: number;
}

interface SessionData {
  weather: number;
  trackTemperature: number;
  airTemperature: number;
  totalLaps: number;
  trackLength: number;
  sessionType: number;
  trackId: number;
  formula: number;
  sessionTimeLeft: number;
  sessionDuration: number;
  pitSpeedLimit: number;
  gamePaused: number;
  isSpectating: number;
  spectatorCarIndex: number;
  sliProNativeSupport: number;
  safetyCarStatus: number;
  networkGame: number;
}

interface ParsedData {
  type: "session" | "lap" | "carSetups" | "carTelemetry" | "carStatus";
  content: SessionData | LapData | CarSetupData | CarTelemetryData | CarStatusData;
}
