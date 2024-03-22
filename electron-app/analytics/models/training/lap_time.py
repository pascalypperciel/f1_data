from ..queries.lap_time import *
from catboost import Pool, cv
import numpy as np

#I ended up using LinearRegression anyway but here is what it looked like
#when I was testing using CatBoost
#features & target
X = df[numerical_features + categorical_features]
y = df[target]

cat_features_indices = [X.columns.get_loc(c) for c in categorical_features if c in X]
data_pool = Pool(data=X, label=y, cat_features=cat_features_indices)
params = {
    'loss_function': 'RMSE',
    'iterations': 100,
    'early_stopping_rounds': 10,
    'verbose': 200,
    'eval_metric': 'RMSE',
    'l2_leaf_reg' : 3.0
}
cv_results = cv(pool=data_pool, params=params, fold_count=5, plot=False)
best_cv_score = np.min(cv_results['test-RMSE-mean'])
print(f"Lap Time Testing - Best CV Score (RMSE) NEW: {best_cv_score}")
