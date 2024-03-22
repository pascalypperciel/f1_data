from analytics.engine import *

import pandas

query = """
SELECT DISTINCT ON (
		lap.sessionuid,
		lap.frameidentifier,
		lap.thisindex,
    lap.currentlapnum	)
	lap.time,
	lap.sessionuid,
	lap.frameidentifier,
	lap.thisindex,
  lap.currentlapnum,
  lap.lastlaptime,
  lap.lapdistance,
  lap.totaldistance,
  carstatus.fuelintank,
  carstatus.ersdeployedthislap,
  carstatus.fltyrewear,
  carstatus.frtyrewear,
  carstatus.tyrevisualcompound,
  carstatus.rrtyrewear,
  carstatus.actualtyrecompound,
  carstatus.pitlimiter,
  carstatus.vehiclefiaflages,
  session.trackid
FROM lap
JOIN session ON lap.sessionuid = session.sessionuid AND abs(lap.frameidentifier - session.frameidentifier) < 150
JOIN carstatus ON lap.sessionuid = carstatus.sessionuid AND lap.thisindex = carstatus.thisindex AND abs(lap.frameidentifier - carstatus.frameidentifier) < 3
ORDER BY lap.sessionuid,
	lap.thisindex,
	lap.frameidentifier;
"""

# Load the query result into a DataFrame
dataframe = pandas.read_sql_query(query, engine)

df = dataframe.groupby(['sessionuid', 'thisindex', 'currentlapnum']).agg({
    'totaldistance': 'last',
    'fuelintank': 'last',
    'trackid' : 'last',
    'actualtyrecompound' : 'first',
    'fltyrewear' : 'last',
    'frtyrewear' : 'first',
    'pitlimiter' : 'max',
    'vehiclefiaflages' : 'mean',
    'tyrevisualcompound' : 'first',
    'ersdeployedthislap' : 'max'
}).reset_index()

target = ['fltyrewear']

categorical_features = [
    'trackid',
    'actualtyrecompound',
    'pitlimiter'
]

numerical_features = [
    'totaldistance',
    'fuelintank',
    'frtyrewear',
    'vehiclefiaflages'
]

