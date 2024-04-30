from threading import Thread
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from functions.tyre_strategy import find_best_strategy

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

@app.route('/api/connect', methods=['POST'])
def connect():
    credentials = request.json
    if create_connection(credentials):
        return jsonify({'message': 'Connection successful', 'status': True})
    else:
        return jsonify({'message': 'Connection failed', 'status': False}), 400

@app.route('/api/disconnect', methods=['POST'])
def stop_listening():
    # global listener_thread
    global connection
    connection.close()
    # if listener_thread is not None:
    #     stop_listening()
    #     listener_thread.join()
    #     listener_thread = None
    #     return jsonify({'message': 'Listening stopped'}), 200
    # else:
    #     return jsonify({'message': 'Not listening'}), 200
    return jsonify({'message': 'Listening stopped'}), 200

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

def start_listening():
  global listener_thread
  if listener_thread is None or not listener_thread.is_alive():
      listener_thread = Thread(target=start_listening)
      listener_thread.start()
      return jsonify({'message': 'Listening started'}), 200
  else:
      return jsonify({'message': 'Already listening'}), 200

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
