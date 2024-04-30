from asyncio import Event
import socket
import f1_2019_struct

UDP_IP = "0.0.0.0"
UDP_PORT = 20777
stop_event = Event()


def get_telemetry():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((UDP_IP, UDP_PORT))

    print(f"Listening for UDP packets on {UDP_IP}:{UDP_PORT}")

    try:
        while True:
            data, address = sock.recvfrom(1347)
            header = f1_2019_struct.Header.from_buffer_copy(data[0:23])
            packetId = int(header.m_packetId)

            if packetId == 1:
                packet = f1_2019_struct.PacketSessionData.from_buffer_copy(data[0:149])
            elif packetId == 2:
                packet = f1_2019_struct.PacketLapData.from_buffer_copy(data[0:843])
            elif packetId == 4:
                packet = f1_2019_struct.PacketParticipantsData.from_buffer_copy(data[0:1104])
            elif packetId == 5:
                packet = f1_2019_struct.PacketCarSetupData.from_buffer_copy(data[0:843])
            elif packetId == 6:
                packet = f1_2019_struct.PacketCarTelemetryData.from_buffer_copy(data[0:1347])
            elif packetId == 7:
                packet = f1_2019_struct.PacketCarStatusData.from_buffer_copy(data[0:1143])
            else:
                packet = None
                packetId = -1

            yield packet, packetId, header

    except KeyboardInterrupt:
        print("\nUDP listener is shutting down")
    finally:
        sock.close()

def start_listening_packets():
    stop_event.clear()
    get_telemetry()

def stop_listening_packets():
    stop_event.set()
