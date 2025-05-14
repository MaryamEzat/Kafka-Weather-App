# 🌤️ Kafka Weather App

This project is a real-time weather dashboard built with **Apache Kafka**, **Flask**, and the **OpenWeatherMap API**. It displays live weather data for Cairo with plans to expand to multiple cities. The app features dynamic backgrounds, weather icons, local time display, and a 5-day forecast.

---

## 🚀 Features

- ✅ Real-time weather streaming using **Kafka**
- ✅ Flask web server to deliver the interface
- ✅ Modern responsive UI with dynamic background changes
- ✅ Weather icons and emojis
- ✅ Local time calculation based on city timezone
- ✅ 5-day weather forecast

---

## 🧩 Tech Stack

- **Apache Kafka** – Message broker for real-time data
- **Python (Flask)** – Backend server
- **HTML, CSS, JavaScript** – Frontend
- **OpenWeatherMap API** – Weather data source

---

## 📂 Project Structure

```
kafka-weather-app/
│
├── app.py               # Flask app
├── producer.py          # Kafka Producer fetching API data
├── consumer.py          # Kafka Consumer
│
├── static/
│   ├── style.css        # CSS styles
│   ├── script.js        # JavaScript logic
│   └── weather-logo.png # Weather app icon
│
├── templates/
│   └── index.html       # Main HTML page
│
└── README.md
```

---

## 📡 How It Works

1. **Producer** fetches real-time weather data from OpenWeatherMap and sends it to a Kafka topic.
2. **Consumer** listens to the Kafka topic and updates `latest_weather`.
3. **Flask server** serves the webpage and provides a `/weather` endpoint.
4. **Frontend (JS)** fetches the data and updates the UI every 10 seconds.

---

## 🔧 Setup Instructions

> Make sure you have Python, pip, and Kafka installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaryamEzat/Kafka-Weather-App.git
   cd Kafka-Weather-App
   ```

2. **Install dependencies:**
   ```bash
   pip install flask kafka-python requests
   ```

3. **Start Zookeeper and Kafka:**
   ```bash
   # Start Zookeeper
   bin/zookeeper-server-start.sh config/zookeeper.properties

   # In another terminal, start Kafka
   bin/kafka-server-start.sh config/server.properties
   ```

4. **Start the Kafka Producer:**
   ```bash
   python producer.py
   ```

5. **Run the Flask App:**
   ```bash
   python app.py
   ```

6. **Visit the App:**
   ```
   http://127.0.0.1:5000
   ```

---

## 📌 Notes

- Make sure your Kafka topic is named `weather-data`
- Current city hardcoded: **Cairo**
- To expand cities or optimize streaming, further updates are welcome

---

## 📜 License

MIT License

---

## 💡 Future Enhancements

- [ ] Add dropdown for multiple cities
- [ ] Deploy the app online
- [ ] Add loading animations
- [ ] Optimize data caching and API usage
