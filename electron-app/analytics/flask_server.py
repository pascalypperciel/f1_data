from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from functions.tyre_strategy import find_best_strategy

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4343"}})

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

def create_connection(credentials):
    try:
        conn = psycopg2.connect(
            dbname=credentials['databaseName'],
            user=credentials['username'],
            password=credentials['password'],
            host=credentials['host'],
            port=credentials['port']
        )
        conn.close()
        return True
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

@app.route('/api/connect', methods=['POST'])
def connect():
    credentials = request.json
    if create_connection(credentials):
        return jsonify({'message': 'Connection successful', 'status': True})
    else:
        return jsonify({'message': 'Connection failed', 'status': False}), 400

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
