from analytics.engine import *

import pandas

query = """
WITH FirstReset AS (
    SELECT
        sessionuid,
        thisindex,  -- Assuming thisindex represents the driver
        MIN(frameidentifier) AS reset_frame
    FROM
        carstatus
    WHERE
        rltyrewear = 0 AND frameidentifier > 2000  -- Excludes initial frames with tyre wear at 0
    GROUP BY
        sessionuid, thisindex
),
FilteredLaps AS (
    SELECT
        lap.*
    FROM
        lap
    JOIN
        FirstReset
    ON
        lap.sessionuid = FirstReset.sessionuid AND
        lap.thisindex = FirstReset.thisindex
    WHERE
        lap.frameidentifier < FirstReset.reset_frame
)
SELECT DISTINCT ON (lap.sessionuid, lap.thisindex, lap.frameidentifier)
    lap.time,
    lap.sessionuid,
    lap.frameidentifier,
    lap.thisindex,
    lap.totaldistance,
    lap.currentlapnum,
    lap.pitstatus,
    carstatus.actualtyrecompound,
    carstatus.rltyrewear,
    session.trackid,
    session.weather,
    session.tracktemp,
    session.airtemp
FROM
    FilteredLaps AS lap
JOIN
    session ON lap.sessionuid = session.sessionuid AND abs(lap.frameidentifier - session.frameidentifier) < 150
JOIN
    carstatus ON lap.sessionuid = carstatus.sessionuid AND lap.thisindex = carstatus.thisindex AND abs(lap.frameidentifier - carstatus.frameidentifier) < 3
ORDER BY
    lap.sessionuid, lap.thisindex, lap.frameidentifier;
"""

# Load the query result into a DataFrame
dataframe = pandas.read_sql_query(query, engine)

df = dataframe.groupby(['sessionuid', 'thisindex', 'currentlapnum']).agg({
    'totaldistance': 'last',
    'trackid' : 'last',
    'actualtyrecompound' : 'first',
    'rltyrewear' : 'last',
    'weather' : 'mean',
    'tracktemp' : 'mean',
    'airtemp' : 'mean',
}).reset_index()

target = ['rltyrewear']

categorical_features = [
    'trackid',
    'actualtyrecompound',
    'weather'
]

numerical_features = [
    'totaldistance',
    'airtemp',
    'tracktemp',
]

