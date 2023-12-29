from listener import get_telemetry
from db_handler import *

def process_packet(packet, packetId, header):
    if packetId == -1:
        pass
    elif packetId == 1:
        insert_session_data(packet, header)
    elif packetId == 2:
        insert_lap_data(packet, header)
    elif packetId == 4:
        insert_participant_data(packet, header)
    elif packetId == 5:
        insert_car_setup_data(packet, header)
    elif packetId == 6:
        insert_car_telemetry_data(packet, header)
    elif packetId == 7:
        insert_car_status_data(packet, header)


def main():
    db_conn.connect()
    try:
        for packet, packetId, header in get_telemetry():
            process_packet(packet, packetId, header)
    finally:
        db_conn.close()


if __name__ == "__main__":
    main()
