import psycopg2
import datetime

class DatabaseConnection:
    def __init__(self, dbname, user, password, host, port):
        self.db_connection = {
            "dbname": dbname,
            "user": user,
            "password": password,
            "host": host,
            "port": port
        }
        self.conn = None

    def connect(self):
        try:
            self.conn = psycopg2.connect(**self.db_connection)
            print("Database connection established")
            return True
        except Exception as e:
            print("Error connecting to database:", e)
            self.conn = None
            return False

    def close(self):
        if self.conn:
            self.conn.close()

db_conn = DatabaseConnection()

def insert_session_data(packet, header):
    if db_conn.conn is None:
        return

    try:
        with db_conn.conn.cursor() as cursor:
            insert_query = """
            INSERT INTO session
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(
                insert_query,
                (
                    datetime.datetime.fromtimestamp(header.m_sessionTime),
                    header.m_sessionUID,
                    header.m_frameIdentifier,
                    header.m_sessionTime,
                    header.m_playerCarIndex,
                    packet.m_weather,
                    packet.m_trackTemperature,
                    packet.m_airTemperature,
                    packet.m_totalLaps,
                    packet.m_trackId,
                    packet.m_trackLength,
                    packet.m_sessionType,
                    packet.m_sessionDuration,
                    packet.m_sessionTimeLeft,
                    packet.m_safetyCarStatus
                )
            )
            db_conn.conn.commit()
    except Exception as e:
        print("Error inserting session data:", e)


def insert_lap_data(packet, header):
    if db_conn.conn is None:
        return

    try:
        with db_conn.conn.cursor() as cursor:
            for index, lap in enumerate(packet.m_lapsData):
                insert_query = """
                INSERT INTO lap
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(
                    insert_query,
                    (
                        datetime.datetime.fromtimestamp(header.m_sessionTime),
                        header.m_sessionUID,
                        header.m_frameIdentifier,
                        header.m_sessionTime,
                        header.m_playerCarIndex,
                        index,
                        lap.m_lastLapTime,
                        lap.m_currentLapTime,
                        lap.m_bestLapTime,
                        lap.m_sector1Time,
                        lap.m_sector2Time,
                        lap.m_lapDistance,
                        lap.m_totalDistance,
                        lap.m_carPosition,
                        lap.m_currentLapNum,
                        lap.m_pitStatus,
                        lap.m_sector,
                        lap.m_currentLapInvalid,
                        lap.m_penalties,
                        lap.m_gridPosition,
                        lap.m_driverStatus,
                        lap.m_resultStatus
                    )
                )
                db_conn.conn.commit()
    except Exception as e:
        print("Error inserting lap data:", e)


def insert_participant_data(packet, header):
    if db_conn.conn is None:
        return

    try:
        with db_conn.conn.cursor() as cursor:
            for index, participant in enumerate(packet.m_participants):
                insert_query = """
                INSERT INTO participant
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(
                    insert_query,
                    (
                        datetime.datetime.fromtimestamp(header.m_sessionTime),
                        header.m_sessionUID,
                        header.m_frameIdentifier,
                        header.m_sessionTime,
                        header.m_playerCarIndex,
                        index,
                        participant.m_aiControlled,
                        participant.m_driverId,
                        participant.m_teamId,
                        participant.m_raceNumber,
                        participant.m_nationality,
                        participant.m_name.decode("utf-8")
                    )
                )
                db_conn.conn.commit()
    except Exception as e:
        print("Error inserting participant data:", e)


def insert_car_telemetry_data(packet, header):
    if db_conn.conn is None:
        return

    try:
        with db_conn.conn.cursor() as cursor:
            for index, ct in enumerate(packet.m_carTelemetryData):
                insert_query = """
                INSERT INTO cartelemetry
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(
                    insert_query,
                    (
                        datetime.datetime.fromtimestamp(header.m_sessionTime),
                        header.m_sessionUID,
                        header.m_frameIdentifier,
                        header.m_sessionTime,
                        header.m_playerCarIndex,
                        index,
                        ct.m_speed,
                        ct.m_throttle,
                        ct.m_steer,
                        ct.m_brake,
                        ct.m_clutch,
                        ct.m_gear,
                        ct.m_engineRPM,
                        ct.m_drs,
                        ct.m_revLightsPercent,
                        ct.m_brakesTemperature[0],
                        ct.m_brakesTemperature[1],
                        ct.m_brakesTemperature[2],
                        ct.m_brakesTemperature[3],
                        ct.m_tyresSurfaceTemperature[0],
                        ct.m_tyresSurfaceTemperature[1],
                        ct.m_tyresSurfaceTemperature[2],
                        ct.m_tyresSurfaceTemperature[3],
                        ct.m_tyresInnerTemperature[0],
                        ct.m_tyresInnerTemperature[1],
                        ct.m_tyresInnerTemperature[2],
                        ct.m_tyresInnerTemperature[3],
                        ct.m_engineTemperature,
                        ct.m_tyresPressure[0],
                        ct.m_tyresPressure[1],
                        ct.m_tyresPressure[2],
                        ct.m_tyresPressure[3],
                        ct.m_surfaceType[0],
                        ct.m_surfaceType[1],
                        ct.m_surfaceType[2],
                        ct.m_surfaceType[3]
                    )
                )
                db_conn.conn.commit()
    except Exception as e:
        print("Error inserting car telemetry data:", e)


def insert_car_status_data(packet, header):
    if db_conn.conn is None:
        return

    try:
        with db_conn.conn.cursor() as cursor:
            for index, cs in enumerate(packet.m_carStatusData):
                insert_query = """
                INSERT INTO carstatus
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(
                    insert_query,
                    (
                        datetime.datetime.fromtimestamp(header.m_sessionTime),
                        header.m_sessionUID,
                        header.m_frameIdentifier,
                        header.m_sessionTime,
                        header.m_playerCarIndex,
                        index,
                        cs.m_tractionControl,
                        cs.m_antiLockBrakes,
                        cs.m_fuelMix,
                        cs.m_frontBrakeBias,
                        cs.m_pitLimiterStatus,
                        cs.m_fuelInTank,
                        cs.m_fuelCapacity,
                        cs.m_fuelRemainingLaps,
                        cs.m_maxRPM,
                        cs.m_idleRPM,
                        cs.m_maxGears,
                        cs.m_drsAllowed,
                        cs.m_tyresWear[0],
                        cs.m_tyresWear[1],
                        cs.m_tyresWear[2],
                        cs.m_tyresWear[3],
                        cs.m_actualTyreCompound,
                        cs.m_tyreVisualCompound,
                        cs.m_tyresDamage[0],
                        cs.m_tyresDamage[1],
                        cs.m_tyresDamage[2],
                        cs.m_tyresDamage[3],
                        cs.m_frontLeftWingDamage,
                        cs.m_frontRightWingDamage,
                        cs.m_rearWingDamage,
                        cs.m_engineDamage,
                        cs.m_gearBoxDamage,
                        cs.m_vehicleFiaFlags,
                        cs.m_ersStoreEnergy,
                        cs.m_ersDeployMode,
                        cs.m_ersHarvestedThisLapMGUK,
                        cs.m_ersHarvestedThisLapMGUH,
                        cs.m_ersDeployedThisLap
                    )
                )
                db_conn.conn.commit()
    except Exception as e:
        print("Error inserting car status data:", e)

def insert_car_setup_data(packet, header):
    if db_conn.conn is None:
        return

    try:
        with db_conn.conn.cursor() as cursor:
            for index, cs in enumerate(packet.m_carSetups):
                insert_query = """
                INSERT INTO carsetup
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(
                    insert_query,
                    (
                        datetime.datetime.fromtimestamp(header.m_sessionTime),
                        header.m_sessionUID,
                        header.m_frameIdentifier,
                        header.m_sessionTime,
                        header.m_playerCarIndex,
                        index,
                        cs.m_frontWing,
                        cs.m_rearWing,
                        cs.m_onThrottle,
                        cs.m_offThrottle,
                        cs.m_frontCamber,
                        cs.m_rearCamber,
                        cs.m_frontToe,
                        cs.m_rearToe,
                        cs.m_frontSuspension,
                        cs.m_rearSuspension,
                        cs.m_frontAntiRollBar,
                        cs.m_rearAntiRollBar,
                        cs.m_frontSuspensionHeight,
                        cs.m_rearSuspensionHeight,
                        cs.m_brakePressure,
                        cs.m_brakeBias,
                        cs.m_frontTyrePressure,
                        cs.m_rearTyrePressure,
                        cs.m_ballast,
                        cs.m_fuelLoad
                    )
                )
                db_conn.conn.commit()
    except Exception as e:
        print("Error inserting car setup data:", e)
