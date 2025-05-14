from flask import Flask, render_template, jsonify
from kafka import KafkaConsumer
import json
import threading

app = Flask(__name__)
latest_weather = {"status": "Waiting for data..."}  # Shared global

# Kafka Consumer setup
consumer = KafkaConsumer(
    'weather-data',  # this must match the producer topic
    bootstrap_servers='localhost:9092',
    auto_offset_reset='latest',
    enable_auto_commit=True,
    group_id='weather-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# Background Kafka listener
def listen_to_kafka():
    global latest_weather
    for message in consumer:
        latest_weather = message.value
        print("Received from Kafka:", latest_weather)  # Add this to debug

threading.Thread(target=listen_to_kafka, daemon=True).start()

@app.route('/')
def index():
    return render_template('index.html')  # Make sure index.html is in /templates

@app.route('/weather')
def get_weather():
    return jsonify(latest_weather)

if __name__ == '__main__':
    app.run(debug=True)