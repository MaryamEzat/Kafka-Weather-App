# producer.py
import requests
import json
from kafka import KafkaProducer
import time

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Cairo,eg&APPID=e5231f88f8bd1fc78bda5f81572180db"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?q=Cairo,eg&APPID=e5231f88f8bd1fc78bda5f81572180db"

while True:
    current = requests.get(API_URL).json()
    forecast = requests.get(FORECAST_URL).json()

    combined_data = {
        "current": current,
        "forecast": forecast
    }

    producer.send('weather-data', combined_data)
    print("Sent:", current['weather'][0])
    time.sleep(30)