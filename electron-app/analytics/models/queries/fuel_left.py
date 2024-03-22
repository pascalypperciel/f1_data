from analytics.engine import *

import pandas

query = """
SELECT DISTINCT ON (
		l.sessionuid,
		l.frameidentifier,
		l.thisindex,
    l.currentlapnum )
	l.time,
  l.currentlapnum,
	l.sessionuid,
	l.frameidentifier,
	l.thisindex,
  l.totaldistance,
  cs.ersdeploymode,
  cs.ersdeployedthislap,
  cs.fuelintank,
  s.trackid
FROM lap AS l
JOIN carstatus AS cs ON l.sessionuid = cs.sessionuid AND l.thisindex = cs.thisindex AND abs(l.frameidentifier - cs.frameidentifier) < 3
JOIN session AS s ON l.sessionuid = s.sessionuid AND abs(l.frameidentifier - s.frameidentifier) < 150
ORDER BY l.sessionuid,
	l.thisindex,
	l.frameidentifier;
"""

dataframe = pandas.read_sql_query(query, engine)

df = dataframe.groupby(['sessionuid', 'thisindex', 'currentlapnum']).agg({
    'fuelintank' : 'last',
    'trackid' : 'last',
    'totaldistance' : 'last',
    'ersdeploymode' : 'mean',
    'ersdeployedthislap' : 'max'
}).reset_index()

target = ['fuelintank']

categorical_features = [
   'trackid'
]

numerical_features = [
    'totaldistance',
    'ersdeploymode',
    'ersdeployedthislap'
]
