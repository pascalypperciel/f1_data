import ctypes

# Header
class Header(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_packetFormat', ctypes.c_uint16),
        ('m_gameMajorVersion', ctypes.c_uint8),
        ('m_gameMinorVersion', ctypes.c_uint8),
        ('m_packetVersion', ctypes.c_uint8),
        ('m_packetId', ctypes.c_uint8),
        ('m_sessionUID', ctypes.c_uint64),
        ('m_sessionTime', ctypes.c_float),
        ('m_frameIdentifier', ctypes.c_uint),
        ('m_playerCarIndex', ctypes.c_uint8)
    ]

# Car Setup
class CarSetupData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_frontWing', ctypes.c_uint8),
        ('m_rearWing', ctypes.c_uint8),
        ('m_onThrottle', ctypes.c_uint8),
        ('m_offThrottle', ctypes.c_uint8),
        ('m_frontCamber', ctypes.c_float),
        ('m_rearCamber', ctypes.c_float),
        ('m_frontToe', ctypes.c_float),
        ('m_rearToe', ctypes.c_float),
        ('m_frontSuspension', ctypes.c_uint8),
        ('m_rearSuspension', ctypes.c_uint8),
        ('m_frontAntiRollBar', ctypes.c_uint8),
        ('m_rearAntiRollBar', ctypes.c_uint8),
        ('m_frontSuspensionHeight', ctypes.c_uint8),
        ('m_rearSuspensionHeight', ctypes.c_uint8),
        ('m_brakePressure', ctypes.c_uint8),
        ('m_brakeBias', ctypes.c_uint8),
        ('m_frontTyrePressure', ctypes.c_float),
        ('m_rearTyrePressure', ctypes.c_float),
        ('m_ballast', ctypes.c_uint8),
        ('m_fuelLoad', ctypes.c_float),
    ]

class PacketCarSetupData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_header', Header),
        ('m_carSetups', CarSetupData * 20),
    ]

# Car Status
class CarStatusData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_tractionControl', ctypes.c_uint8),
        ('m_antiLockBrakes', ctypes.c_uint8),
        ('m_fuelMix', ctypes.c_uint8),
        ('m_frontBrakeBias', ctypes.c_uint8),
        ('m_pitLimiterStatus', ctypes.c_uint8),
        ('m_fuelInTank', ctypes.c_float),
        ('m_fuelCapacity', ctypes.c_float),
        ('m_fuelRemainingLaps', ctypes.c_float),
        ('m_maxRPM', ctypes.c_uint16),
        ('m_idleRPM', ctypes.c_uint16),
        ('m_maxGears', ctypes.c_uint8),
        ('m_drsAllowed', ctypes.c_uint8),
        ('m_tyresWear', ctypes.c_uint8 * 4),
        ('m_actualTyreCompound', ctypes.c_uint8),
        ('m_tyreVisualCompound', ctypes.c_uint8),
        ('m_tyresDamage', ctypes.c_uint8 * 4),
        ('m_frontLeftWingDamage', ctypes.c_uint8),
        ('m_frontRightWingDamage', ctypes.c_uint8),
        ('m_rearWingDamage', ctypes.c_uint8),
        ('m_engineDamage', ctypes.c_uint8),
        ('m_gearBoxDamage', ctypes.c_uint8),
        ('m_vehicleFiaFlags', ctypes.c_int8),
        ('m_ersStoreEnergy', ctypes.c_float),
        ('m_ersDeployMode', ctypes.c_uint8),
        ('m_ersHarvestedThisLapMGUK', ctypes.c_float),
        ('m_ersHarvestedThisLapMGUH', ctypes.c_float),
        ('m_ersDeployedThisLap', ctypes.c_float),
    ]

class PacketCarStatusData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_header', Header),
        ('m_carStatusData', CarStatusData * 20),
    ]

# Car Telemetry
class CarTelemetryData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_speed', ctypes.c_uint16),
        ('m_throttle', ctypes.c_float),
        ('m_steer', ctypes.c_float),
        ('m_brake', ctypes.c_float),
        ('m_clutch', ctypes.c_uint8),
        ('m_gear', ctypes.c_int8),
        ('m_engineRPM', ctypes.c_uint16),
        ('m_drs', ctypes.c_uint8),
        ('m_revLightsPercent', ctypes.c_uint8),
        ('m_brakesTemperature', ctypes.c_uint16 * 4),
        ('m_tyresSurfaceTemperature', ctypes.c_uint16 * 4),
        ('m_tyresInnerTemperature', ctypes.c_uint16 * 4),
        ('m_engineTemperature', ctypes.c_uint16),
        ('m_tyresPressure', ctypes.c_float * 4),
        ('m_surfaceType', ctypes.c_uint8 * 4),
    ]

class PacketCarTelemetryData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_header', Header),
        ('m_carTelemetryData', CarTelemetryData * 20),
        ('m_buttonStatus', ctypes.c_uint32),
    ]

# Lap
class LapData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_lastLapTime', ctypes.c_float),
        ('m_currentLapTime', ctypes.c_float),
        ('m_bestLapTime', ctypes.c_float),
        ('m_sector1Time', ctypes.c_float),
        ('m_sector2Time', ctypes.c_float),
        ('m_lapDistance', ctypes.c_float),
        ('m_totalDistance', ctypes.c_float),
        ('m_safetyCarDelta', ctypes.c_float),
        ('m_carPosition', ctypes.c_uint8),
        ('m_currentLapNum', ctypes.c_uint8),
        ('m_pitStatus', ctypes.c_uint8),
        ('m_sector', ctypes.c_uint8),
        ('m_currentLapInvalid', ctypes.c_uint8),
        ('m_penalties', ctypes.c_uint8),
        ('m_gridPosition', ctypes.c_uint8),
        ('m_driverStatus', ctypes.c_uint8),
        ('m_resultStatus', ctypes.c_uint8),
    ]

class PacketLapData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_header', Header),
        ('m_lapData', LapData * 20),
    ]

# Session
class PacketSessionData(ctypes.LittleEndianStructure):
    _pack_ = 1
    _fields_ = [
        ('m_header', Header),
        ('m_weather', ctypes.c_float),
        ('m_trackTemperature', ctypes.c_float),
        ('m_airTemperature', ctypes.c_float),
        ('m_totalLaps', ctypes.c_float),
        ('m_trackLength', ctypes.c_float),
        ('m_sessionType', ctypes.c_float),
        ('m_trackId', ctypes.c_float),
        ('m_formula', ctypes.c_uint8),
        ('m_sessionTimeLeft', ctypes.c_uint8),
        ('m_sessionDuration', ctypes.c_uint8),
        ('m_pitSpeedLimit', ctypes.c_uint8),
        ('m_gamePaused', ctypes.c_uint8),
        ('m_isSpectating', ctypes.c_uint8),
        ('m_spectatorCarIndex', ctypes.c_uint8),
        ('m_sliProNativeSupport', ctypes.c_uint8),
        ('m_safetyCarStatus', ctypes.c_uint8),
        ('m_networkGame', ctypes.c_uint8),
    ]
