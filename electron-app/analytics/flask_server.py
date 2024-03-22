from flask import Flask, request, jsonify
from flask_cors import CORS
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

if __name__ == '__main__':
    app.run(debug=True)
