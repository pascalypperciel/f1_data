import asyncio
import socket
import json
import websockets
from packet_struct import *

def parse_packet(packet_data):
    header = Header.from_buffer_copy(packet_data)
    packet_id = header.m_packetId
    player_car_index = header.m_playerCarIndex

    parsed_data = {"type": None, "content": {}}

    if packet_id == 1:  # Session Data
        parsed_data["type"] = "session"
        session = PacketSessionData.from_buffer_copy(packet_data)
        parsed_data["content"] = {
            "weather": session.m_weather,
            "trackTemperature": session.m_trackTemperature,
            "airTemperature": session.m_airTemperature,
            "totalLaps": session.m_totalLaps,
            "trackLength": session.m_trackLength,
            "sessionType": session.m_sessionType,
            "trackId": session.m_trackId,
            "formula": session.m_formula,
            "sessionTimeLeft": session.m_sessionTimeLeft,
            "sessionDuration": session.m_sessionDuration,
            "pitSpeedLimit": session.m_pitSpeedLimit,
            "gamePaused": session.m_gamePaused,
            "isSpectating": session.m_isSpectating,
            "spectatorCarIndex": session.m_spectatorCarIndex,
            "sliProNativeSupport": session.m_sliProNativeSupport,
            "safetyCarStatus": session.m_safetyCarStatus,
        }

    elif packet_id == 2:  # Lap Data
        parsed_data["type"] = "lap"
        packet = PacketLapData.from_buffer_copy(packet_data)
        lap = packet.m_lapData[player_car_index]
        parsed_data["content"] = {
            "frame" : header.m_frameIdentifier,
            "lastLapTime": lap.m_lastLapTime,
            "currentLapTime": lap.m_currentLapTime,
            "bestLapTime": lap.m_bestLapTime,
            "sector1Time": lap.m_sector1Time,
            "sector2Time": lap.m_sector2Time,
            "lapDistance": lap.m_lapDistance,
            "totalDistance": lap.m_totalDistance,
            "safetyCarDelta": lap.m_safetyCarDelta,
            "carPosition": lap.m_carPosition,
            "currentLapNum": lap.m_currentLapNum,
            "pitStatus": lap.m_pitStatus,
            "sector": lap.m_sector,
            "currentLapInvalid": lap.m_currentLapInvalid,
            "penalties": lap.m_penalties,
            "gridPosition": lap.m_gridPosition,
            "driverStatus": lap.m_driverStatus,
            "resultStatus": lap.m_resultStatus,
        }

    elif packet_id == 5:  # Car Setup
        parsed_data["type"] = "carSetups"
        packet = PacketCarSetupData.from_buffer_copy(packet_data)
        setup = packet.m_carSetups[player_car_index]
        parsed_data["content"] = {
            "frame" : header.m_frameIdentifier,
            "frontWing": setup.m_frontWing,
            "rearWing": setup.m_rearWing,
            "onThrottle": setup.m_onThrottle,
            "offThrottle": setup.m_offThrottle,
            "frontCamber": setup.m_frontCamber,
            "rearCamber": setup.m_rearCamber,
            "frontToe": setup.m_frontToe,
            "rearToe": setup.m_rearToe,
            "frontSuspension": setup.m_frontSuspension,
            "rearSuspension": setup.m_rearSuspension,
            "frontAntiRollBar": setup.m_frontAntiRollBar,
            "rearAntiRollBar": setup.m_rearAntiRollBar,
            "frontSuspensionHeight": setup.m_frontSuspensionHeight,
            "rearSuspensionHeight": setup.m_rearSuspensionHeight,
            "brakePressure": setup.m_brakePressure,
            "brakeBias": setup.m_brakeBias,
            "frontTyrePressure": setup.m_frontTyrePressure,
            "rearTyrePressure": setup.m_rearTyrePressure,
            "ballast": setup.m_ballast,
            "fuelLoad": setup.m_fuelLoad,
        }

    elif packet_id == 6:  # Car Telemetry
        parsed_data["type"] = "carTelemetry"
        packet = PacketCarTelemetryData.from_buffer_copy(packet_data)
        telemetry = packet.m_carTelemetryData[player_car_index]
        parsed_data["content"] = {
            "frame" : header.m_frameIdentifier,
            "speed": telemetry.m_speed,
            "throttle": telemetry.m_throttle,
            "steer": telemetry.m_steer,
            "brake": telemetry.m_brake,
            "clutch": telemetry.m_clutch,
            "gear": telemetry.m_gear,
            "engineRPM": telemetry.m_engineRPM,
            "drs": telemetry.m_drs,
            "revLightsPercent": telemetry.m_revLightsPercent,
            "brakesTemperature": list(telemetry.m_brakesTemperature),
            "tyresSurfaceTemperature": list(telemetry.m_tyresSurfaceTemperature),
            "tyresInnerTemperature": list(telemetry.m_tyresInnerTemperature),
            "engineTemperature": telemetry.m_engineTemperature,
            "tyresPressure": list(telemetry.m_tyresPressure),
            "surfaceType": list(telemetry.m_surfaceType),
        }

    elif packet_id == 7:  # Car Status
        parsed_data["type"] = "carStatus"
        packet = PacketCarStatusData.from_buffer_copy(packet_data)
        status = packet.m_carStatusData[player_car_index]
        parsed_data["content"] = {
            "frame" : header.m_frameIdentifier,
            "tractionControl": status.m_tractionControl,
            "antiLockBrakes": status.m_antiLockBrakes,
            "fuelMix": status.m_fuelMix,
            "frontBrakeBias": status.m_frontBrakeBias,
            "pitLimiterStatus": status.m_pitLimiterStatus,
            "fuelInTank": status.m_fuelInTank,
            "fuelCapacity": status.m_fuelCapacity,
            "fuelRemainingLaps": status.m_fuelRemainingLaps,
            "maxRPM": status.m_maxRPM,
            "idleRPM": status.m_idleRPM,
            "maxGears": status.m_maxGears,
            "drsAllowed": status.m_drsAllowed,
            "tyresWear": list(status.m_tyresWear),
            "actualTyreCompound": status.m_actualTyreCompound,
            "tyreVisualCompound": status.m_tyreVisualCompound,
            "tyresDamage": list(status.m_tyresDamage),
            "frontLeftWingDamage": status.m_frontLeftWingDamage,
            "frontRightWingDamage": status.m_frontRightWingDamage,
            "rearWingDamage": status.m_rearWingDamage,
            "engineDamage": status.m_engineDamage,
            "gearBoxDamage": status.m_gearBoxDamage,
            "vehicleFiaFlags": status.m_vehicleFiaFlags,
            "ersStoreEnergy": status.m_ersStoreEnergy,
            "ersDeployMode": status.m_ersDeployMode,
            "ersHarvestedThisLapMGUK": status.m_ersHarvestedThisLapMGUK,
            "ersHarvestedThisLapMGUH": status.m_ersHarvestedThisLapMGUH,
            "ersDeployedThisLap": status.m_ersDeployedThisLap,
        }

    return parsed_data

async def udp_server(host, port, websocket):
    counter = 0
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as udp_socket:
        udp_socket.bind((host, port))
        udp_socket.setblocking(False)
        while True:
            try:
              data, addr = udp_socket.recvfrom(2048)  # Adjust buffer size as needed
              parsed_data = parse_packet(data)
              if (parsed_data and parsed_data["type"] == "carTelemetry"):
                  # if (parsed_data["type"] == "carTelemetry") :
                  #     print("TESTING: carTelemetry ", counter)
                  #     counter += 1
                  await websocket.send(json.dumps(parsed_data))
                  print("TESTING: carTelemetry ", counter)
                  counter += 1
            except asyncio.CancelledError:
                break
            except Exception as e:
                print(f"Error: {e}")
                await asyncio.sleep(0.01)

async def websocket_handler(websocket, path):
    host, port = '0.0.0.0', 20777  # UDP server host and port
    await udp_server(host, port, websocket)

start_server = websockets.serve(websocket_handler, "localhost", 6789, ping_interval=None)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
