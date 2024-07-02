![Banner](images/banner.jpg)
## Introduction
This project was made with two goals in mind:
1. I wanted to offer an easy to use interface to display, store, and use telemetry data from the F1 franchise video games.
2. To serve as a learning opportunity, enhancing my skills in full-stack development (backend, frontend, database, REST API, etc) and also start learning something new: data science and analysis.

Make sure to check the [UPDATES.md](UPDATES.md) file for screenshots, short demos, and the updates I posted through the development of this project.
## Languages
- Python: Scripts for data collection and processing from the F1 game. Also all model training and creating were done on Python as well.
- TypeScript: Superset of JavaScript for enhanced code quality. This was paired with React to make an appealing, modern, and convenient UI. 

## Technologies
#### Application Framework
- Electron: Framework for building cross-platform desktop applications.
#### Backend
- Express.js: It sets up an HTTP server to handle various endpoints that fetch data from a PostgreSQL database.
- Flask: Used to make a REST API for my models and to handle database connection with . Flask also supports cross-origin requests for easy data transfer and real-time analysis.
#### Frontend
- @mui: Material Design React components for consistent and customizable UI.
- React: JavaScript library for building the user interface.
- recharts: Charting library for responsive and interactive data visualization.
#### Data Science and Models
- CatBoost: Gradient boosting library for advanced modeling.
- RandomForestRegressor: Ensemble learning method for regression.
- scikit-learn: Machine learning library for building models.
#### Database and Data Handling
- Docker: Platform for running applications in containers, used for TimeScaleDB.
- TimeScaleDB: PostgreSQL extension for handling time-series data, running on Docker.
- UDP Protocol: For real-time telemetry data reception from the F1 game.
- WebSocket: Used for real-time communication protocol for data transfer.
#### Version Control
- Git: Version control system.
- GitHub: Source code management and collaboration.

## Features
- Real-time data visualization using interactive line charts, diagrams, and various other representation formats.
    - Car Telemetry: Provides detailed telemetry data, including speed, throttle application, steering, brake usage, clutch, gear, engine RPM, DRS status, brake and tyre temperatures, tyre wear, engine temperature, tyre pressure.
    - Car Setup: Provides information about the setup of the car such as differential adjustment, camber, toe, break pressure, tyre pressure, suspension, etc.
    - Car Status: Provides detailed status information, including traction control, anti-lock brakes, fuel mix, brake bias, pit limiter status, fuel levels, DRS status, wing, engine, and gearbox damage, FIA flags, and ERS energy details.
    - Lap Data: Provides detailed timing and positional information, including lap times, sector times, distances, car position, lap number, pit status, sector, penalties, grid position, driver status, and result status.
    - Session Data: Provides details about the current session in progress, including weather, temperatures, total laps, track length, track, session time left, session duration safety car status.
- Users have access to various models to generate the optimal tyre strategy based on their selected inputs. Additionally, there are models available for predicting lap times and tyre wear.
- The Lap Review tab lets the user import lap data from their selected session and view their lap data and even compare different laps.
- Allow users to customize their homepage by selecting their preferred telemetry information, ensuring a personalized and engaging experience.
- The UI offers customizability, allowing users to adjust the display size of different components on the homepage. Additionally, a dark mode option is available to enhance the user experience.
- There is also database compatibility, where the user is able to store data on their own database if needed, and even view the data from the database.
