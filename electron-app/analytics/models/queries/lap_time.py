from analytics.engine import *

import pandas

query = """
SELECT DISTINCT ON (
		l.sessionuid,
		l.frameidentifier,
		l.thisindex,
    l.currentlapnum	)
	l.time,
	l.sessionuid,
	l.frameidentifier,
	l.thisindex,
  l.currentlaptime,
  l.currentlapnum,
  l.lastlaptime,
  l.lapdistance,
  cs.fuelintank,
  cs.ersdeployedthislap,
  cs.pitlimiter,
  cs.fltyrewear,
  cs.frtyrewear,
  cs.rltyrewear,
  cs.rrtyrewear,
  cs.actualtyrecompound,
  cs.vehiclefiaflages,
  ct.fltyresurfacetemp,
  ct.frtyresurfacetemp,
  ct.rltyresurfacetemp,
  ct.rrtyresurfacetemp,
  ct.fltyreinnertemp,
  ct.frtyreinnertemp,
  ct.rltyreinnertemp,
  ct.rrtyreinnertemp,
  ct.fltyrepressure,
  ct.frtyrepressure,
  ct.rltyrepressure,
  ct.rrtyrepressure,
	s.weather,
	s.tracktemp,
	s.airtemp,
  s.tracklength,
  s.totallaps,
  s.trackid
FROM lap AS l
JOIN cartelemetry AS ct ON l.sessionuid = ct.sessionuid AND l.thisindex = ct.thisindex AND abs(l.frameidentifier - ct.frameidentifier) < 3
JOIN session AS s ON l.sessionuid = s.sessionuid AND abs(l.frameidentifier - s.frameidentifier) < 150
JOIN carstatus AS cs ON l.sessionuid = cs.sessionuid AND l.thisindex = cs.thisindex AND abs(l.frameidentifier - cs.frameidentifier) < 3
ORDER BY l.sessionuid,
	l.thisindex,
	l.frameidentifier;
"""

# Load the query result into a DataFrame
dataframe = pandas.read_sql_query(query, engine)

df = dataframe.groupby(['sessionuid', 'thisindex', 'currentlapnum']).agg({
    'currentlaptime' : 'last',
    'fuelintank' : 'mean',
    'lapdistance' : 'last',
    'weather' : 'mean',
    'tracktemp' : 'mean',
    'airtemp' : 'mean',
    'pitlimiter' : 'max',
    'trackid' : 'last',
    'fltyrewear' : 'first',
    'frtyrewear' : 'first',
    'rltyrewear' : 'first',
    'rrtyrewear' : 'first',
    'actualtyrecompound' : 'last',
    'vehiclefiaflages' : 'mean'
}).reset_index()

target = ['currentlaptime']

categorical_features = [
    'trackid',
    'weather',
    'actualtyrecompound',
    'pitlimiter'
]

numerical_features = [
    'fuelintank',
    'fltyrewear',
    'frtyrewear',
    'rltyrewear',
    'rrtyrewear'
]
