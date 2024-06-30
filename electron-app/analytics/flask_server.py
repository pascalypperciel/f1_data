from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from .functions.tyre_strategy import find_best_strategy
from .functions.lap_time import simulate_lap
from .functions.tyre_wear import simulate_tyre
from .db_handler import insert_session_data, insert_car_setup_data, insert_car_telemetry_data, insert_car_status_data, insert_lap_data, insert_participant_data

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4343"}})
connection = None

# API Calls
@app.route('/api/simulate-tyre-strategy', methods=['GET'])
def simulate():
    track = int(request.args.get('track'))
    stops = int(request.args.get('stops'))
    weather = int(request.args.get('weather'))
    trackTemp = int(request.args.get('trackTemp'))
    airTemp = int(request.args.get('airTemp'))

    best_time, best_laps, best_tyres = find_best_strategy(track, stops, weather, airTemp, trackTemp)

    return jsonify({
        "best_time": best_time,
        "best_laps": best_laps,
        "best_tyres": best_tyres
    })

@app.route('/api/simulate-lap-time', methods=['GET'])
def simulate_lap_time():
    track = int(request.args.get('track'))
    fuelInTank = int(request.args.get('fuelInTank'))
    weather = int(request.args.get('weather'))
    trackTemp = int(request.args.get('trackTemp'))
    airTemp = int(request.args.get('airTemp'))
    tyreWear = int(request.args.get('tyreWear'))
    tyreCompound = int(request.args.get('tyreCompound'))

    lap_time = simulate_lap(fuelInTank, track, weather, airTemp, trackTemp, tyreWear, tyreCompound)

    return jsonify({
        "lap_time": lap_time,
    })

@app.route('/api/simulate-tyre-wear', methods=['GET'])
def simulate_tyre_wear():
    track = int(request.args.get('track'))
    lapAmount = int(request.args.get('lapAmount'))
    tyreCompound = int(request.args.get('tyreCompound'))
    weather = int(request.args.get('weather'))
    airTemp = int(request.args.get('airTemp'))
    trackTemp = int(request.args.get('trackTemp'))

    tyre_wear = simulate_tyre(track, lapAmount, tyreCompound, weather, airTemp, trackTemp)

    return jsonify({
        "tyre_wear": tyre_wear,
    })

@app.route('/api/connect', methods=['POST'])
def connect():
    credentials = request.json
    if create_connection(credentials):
        return jsonify({'message': 'Connection successful', 'status': True})
    else:
        return jsonify({'message': 'Connection failed', 'status': False}), 400

@app.route('/api/disconnect', methods=['POST'])
def disconnect():
    global connection
    connection.close()
    connection = None
    return jsonify({'message': 'Connection successful', 'status': True})

# Helpers
def create_connection(credentials):
    try:
        global connection
        connection = psycopg2.connect(
            dbname=credentials['databaseName'],
            user=credentials['username'],
            password=credentials['password'],
            host=credentials['host'],
            port=credentials['port']
        )
        return True
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

def process_packet(packet, packetId, header):
    global connection
    if(connection == None):
        return None
    if packetId == -1:
        pass
    elif packetId == 1:
        insert_session_data(packet, header, connection)
    elif packetId == 2:
        insert_lap_data(packet, header, connection)
    elif packetId == 4:
        insert_participant_data(packet, header, connection)
    elif packetId == 5:
        insert_car_setup_data(packet, header, connection)
    elif packetId == 6:
        insert_car_telemetry_data(packet, header, connection)
    elif packetId == 7:
        insert_car_status_data(packet, header, connection)

if __name__ == '__main__':
    app.run(debug=True)
