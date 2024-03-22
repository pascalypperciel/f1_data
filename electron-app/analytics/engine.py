from sqlalchemy import create_engine

database = 'postgres'
user = 'postgres'
password = '123'
host = 'localhost'
port = '5432'

connection_string = f'postgresql://{user}:{password}@{host}:{port}/{database}'

engine = create_engine(connection_string)
