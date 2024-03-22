from ..queries.tyre_wear import *
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt


X = df[numerical_features + categorical_features]
y = df[target].values.ravel()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

numerical_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_features),
        ('cat', categorical_transformer, categorical_features)
    ])

pipeline_rf = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('model', RandomForestRegressor(n_estimators=100, random_state=42))
])
pipeline_rf.fit(X_train, y_train)

y_pred = pipeline_rf.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

feature_names_corrected = pipeline_rf.named_steps['preprocessor'].get_feature_names_out()
importances = pipeline_rf.named_steps['model'].feature_importances_

forest_importances = pd.Series(importances, index=feature_names_corrected)

plt.figure(figsize=(10, 8))
forest_importances.sort_values(ascending=False).plot.bar()
plt.title('Feature Importance')
plt.tight_layout()
plt.show()

