from joblib import load
import pandas
from analytics.values import track_info
import os

#loading models
script_dir = os.path.dirname(__file__)

model_tyre_wear_path = os.path.join(script_dir, 'linear_regression_tyre_wear_predictor10.joblib')

model_tyre_wear = load(model_tyre_wear_path)

def simulate_tyre(track, lapAmount, tyreCompound, weather, airTemp, trackTemp):
    tyre_wear_data = {
    'totaldistance': [lapAmount * track_info[track][0]],
    'trackid': [track],
    'actualtyrecompound': [tyreCompound],
    'weather' : [weather],
    'airtemp' : [airTemp],
    'tracktemp' : [trackTemp]
    }

    result = model_tyre_wear.predict(pandas.DataFrame(tyre_wear_data)).item()

    # if (result < 0):
    #     result = 0
    # elif (result > 100):
    #     result = 100

    return result
