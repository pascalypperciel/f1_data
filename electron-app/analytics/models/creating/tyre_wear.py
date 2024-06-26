from ..queries.tyre_wear import numerical_features, categorical_features, target, df
from sklearn.preprocessing import RobustScaler
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from joblib import dump
import numpy as np

#features & target
X = df[numerical_features + categorical_features]
y = df[target]

preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numerical_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)])

model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('regressor', LinearRegression())])

cv_scores = cross_val_score(model, X, y, cv=5, scoring='neg_root_mean_squared_error')
mean_cv_score = -np.mean(cv_scores)
print(f"Tyre Wear Creation - #9: robustscaler: {mean_cv_score}")

model.fit(X,y)
dump(model, 'linear_regression_tyre_wear_predictor10.joblib')

