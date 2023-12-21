# Updates and Progress

## Initial Set-Up: Database and UDP Ingestion
##### _December 21, 2023_

First, I needed to find a way to obtain the telemetry from the game. I found some very useful [documentation](https://f1-2019-telemetry.readthedocs.io/en/latest/telemetry-specification.html) on the F1 game telemetry to start off the project. The game delivers a constant stream of telemetry data via UDP, ranging from approximately 20,000 to 150,000 data points per second, depending on the configuration settings you choose. 

I decided to use a **Raspberry Pi** that I had laying around to receive the data, the **Python** scripts that run on the Pi can be found in the *telemetry* folder.
![My Raspberry Pi](images/raspberry_pi.jpg)

| File name | Description |
| ------ | ------ |
| main.py | Orchestrates the overall process, coordinating data collection from listener.py and handling data insertion using db_handler.py |
| db_handler.py | Manages database connectivity and contains functions for inserting data into the database. |
| listener.py | Listens for and captures telemetry data from the F1 game via UDP packets. |
| f1_2019_struct | All of that code was obtained in the aforementioned documentation. |

For the database, I decided to use a **TimeScale** database, which is an extension of PostgreSQL, because it is designed specifically for handling time-series data efficiently. I run it on a **Docker** container on my computer, since I have a lot more storage space than on the Pi. We can find the SQL scripts to create the different tables and some .csv files in the folder *database*.

Here is a diagram of the set-up so far:
![Diagram of the architecture](images/diagram_1.jpg)