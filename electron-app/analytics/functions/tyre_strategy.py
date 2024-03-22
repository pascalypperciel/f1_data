from itertools import combinations, product
from joblib import load
from catboost import CatBoostRegressor
from concurrent.futures import ProcessPoolExecutor
import pandas
from values import *

#loading models
model_fuel_left = load('linear_regression_fuel_left_predictor.joblib')
model_lap_time = load('linear_regression_lap_time_predictor3.joblib')
model_tyre_wear = load('linear_regression_tyre_wear_predictor6.joblib')

def generate_multi_stop_strategies(tyre_compounds, max_stops, pit_window_start, pit_window_end):
    strategies = []
    pit_stop_laps = range(pit_window_start, pit_window_end + 1, 3)  # Adjustable pit stop window
    min_lap_difference = 12

    for initial_tyre_compound in tyre_compounds:
      for num_stops in range(1, max_stops + 1):
          for stops in combinations(pit_stop_laps, num_stops):
              if all(stops[i+1] - stops[i] >= min_lap_difference for i in range(len(stops) - 1)):
                  for compounds in product(tyre_compounds, repeat=num_stops):
                      if len(set([initial_tyre_compound] + list(compounds))) >= 2:
                        strategy = [('0', initial_tyre_compound)]
                        strategy.extend(zip(stops, compounds))
                        strategies.append(strategy)

    return strategies

def simulate_race(strategy, track_info, track, weather, airtemp, tracktemp):
    tyre_type = strategy[0][1]
    tyre_compound = track_info[track][tyre_type]
    last_lap_time = 0
    total_distance_fuel = 0
    total_distance_tyre = 0
    pit_limiter = 0
    tyre_wear = 0
    total_time = 0
    lap_times = []
    tyre_wears = []
    temp_tyre = []

    for lap in range(1, track_info[track][2] + 1):
        if lap in [int(s[0]) for s in strategy[1:]]:
            tyre_wear_data = {
            'totaldistance': [total_distance_tyre],
            'fuelintank': [fuelintank],
            'frtyrewear' : [tyre_wear],
            'vehiclefiaflages' : '0',
            'trackid': [track],
            'actualtyrecompound': [tyre_compound],
            'pitlimiter' : [pit_limiter]
            }
            tyre_wear = model_tyre_wear.predict(pandas.DataFrame(tyre_wear_data)).item()
            temp_tyre.append({
                "lap": lap,
                "tyre_wear": 100 - tyre_wear,
                "tyre_type": tyre_type,
            })
            tyre_wears.append(temp_tyre)
            temp_tyre = []
            _, tyre_type = next(s for s in strategy[1:] if int(s[0]) == lap)
            tyre_compound = track_info[track][tyre_type]
            total_distance_tyre = 0
            pit_limiter = 1
            last_lap_time = 0
            tyre_wear = 0

        fuel_left_data = {
        'totaldistance': [total_distance_fuel],
        'ersdeploymode': [track_info[track][4]],
        'ersdeployedthislap': [track_info[track][1]],
        'trackid': [track]
        }

        fuelintank = model_fuel_left.predict(pandas.DataFrame(fuel_left_data)).item()

        tyre_wear_data = {
        'totaldistance': [total_distance_tyre],
        'fuelintank': [fuelintank],
        'frtyrewear' : [tyre_wear],
        'vehiclefiaflages' : '0',
        'trackid': [track],
        'actualtyrecompound': [tyre_compound],
        'pitlimiter' : [pit_limiter]
        }

        tyre_wear = model_tyre_wear.predict(pandas.DataFrame(tyre_wear_data)).item()

        if (tyre_wear > 80):
            return float('inf'), None, None
        elif (tyre_wear < 0):
            tyre_wear = 0

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
        'pitlimiter': [pit_limiter]
        }

        last_lap_time = model_lap_time.predict(pandas.DataFrame(lap_time_data)).item()

        total_time += last_lap_time
        total_distance_tyre += track_info[track][0]
        total_distance_fuel += track_info[track][0]
        pit_limiter = 0
        lap_times.append({
            "lap": lap,
            "lap_time":last_lap_time,
        })
        temp_tyre.append({
            "lap": lap,
            "tyre_wear": 100 - tyre_wear,
            "tyre_type": tyre_type,
        })
    tyre_wears.append(temp_tyre)
    return total_time, lap_times, tyre_wears

def simulate_race_wrapper(args):
    return simulate_race(*args)

def find_best_strategy(track_number, max_stops, weather, airtemp, tracktemp):
    total_laps = track_info[track_number][2]
    tyre_compounds = [5, 6, 7]
    pit_window_start, pit_window_end = 15, total_laps - 15  # pit window

    strategies = generate_multi_stop_strategies(tyre_compounds, max_stops, pit_window_start, pit_window_end)

    args_list = [(strategy, track_info, track_number, weather, airtemp, tracktemp) for strategy in strategies]

    best_time = float('inf')
    best_laps = 0
    best_tyres = []

    with ProcessPoolExecutor() as executor:
        results = executor.map(simulate_race_wrapper, args_list)
        for strategy, (total_race_time, laps, tyres) in zip(strategies, results):
            if total_race_time < best_time:
                best_time = total_race_time
                best_laps = laps
                best_tyres = tyres

    return best_time, best_laps, best_tyres
