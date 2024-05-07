from joblib import load
import pandas
from analytics.values import *
import os

#loading models
script_dir = os.path.dirname(__file__)

model_lap_time_path = os.path.join(script_dir, 'linear_regression_lap_time_predictor3.joblib')

model_lap_time = load(model_lap_time_path)

def simulate_lap(fuelintank, track, weather, airtemp, tracktemp, tyre_wear, tyre_compound):

    lap_time_data = {
    'fuelintank': [fuelintank],
    'lapdistance': [track_info[track][0]],
    'tracktemp': [tracktemp],
    'airtemp': [airtemp],
    'fltyrewear': [tyre_wear],
    'frtyrewear': [tyre_wear],
    'rltyrewear': [tyre_wear],
    'rrtyrewear': [tyre_wear],
    'vehiclefiaflages' : '0',
    'trackid': [track],
    'weather': [weather],
    'actualtyrecompound': [tyre_compound],
    'pitlimiter': '0'
    }

    return model_lap_time.predict(pandas.DataFrame(lap_time_data)).item()
