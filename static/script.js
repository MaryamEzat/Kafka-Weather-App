function getWeatherEmoji(condition) {
    const weatherIcons = {
        Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️", Thunderstorm: "⛈️",
        Snow: "❄️", Mist: "🌫️", Smoke: "🚬", Haze: "🌫️", Dust: "🌪️",
        Fog: "🌫️", Sand: "🏜️", Ash: "🌋", Squall: "🌬️", Tornado: "🌪️"
    };
    return weatherIcons[condition] || "🌈";
}

async function fetchWeather() {
    const res = await fetch('/weather');
    const data = await res.json();
    const box = document.getElementById('weather');

    if (!data || data.status || !data.weather || !data.main) {
        box.innerHTML = `<p>${data.status || "Weather data not available."}</p>`;
        return;
    }

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const hour = new Date().getHours();
    const weatherMain = data.weather[0].main;
    const emoji = getWeatherEmoji(weatherMain);

    // Local time logic
    const localTime = new Date(
        new Date().getTime() +
        new Date().getTimezoneOffset() * 60000 +
        data.timezone * 1000
    ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Background change
    const body = document.body;
    body.className = '';
    if (weatherMain.toLowerCase().includes('rain')) {
        body.classList.add('rainy');
    } else if (hour >= 6 && hour < 18) {
        body.classList.add('morning');
    } else {
        body.classList.add('evening');
    }

    box.innerHTML = `
        <img src="/static/weather-logo.png" alt="Weather App Logo" class="app-logo">
        <p class="weather-info"><span class="label">City:</span> ${data.name}, ${data.sys.country}</p>
        <p class="weather-info"><span class="label">Local Time:</span> ${localTime}</p>
        <p class="weather-info"><span class="label">Temperature:</span> ${(data.main.temp - 273.15).toFixed(1)} °C</p>
        <p class="weather-info"><span class="label">Feels Like:</span> ${(data.main.feels_like - 273.15).toFixed(1)} °C</p>
        <p class="weather-info"><span class="label">Humidity:</span> ${data.main.humidity}%</p>
        <p class="weather-info"><span class="label">Weather:</span> ${weatherMain} (${data.weather[0].description}) ${emoji}</p>
        <p class="weather-info"><span class="label">Wind Speed:</span> ${data.wind.speed} m/s</p>
        <p class="weather-info"><span class="label">Cloudiness:</span> ${data.clouds.all}%</p>
        <p class="weather-info"><span class="label">Pressure:</span> ${data.main.pressure} hPa</p>
    `;

    // Update footer separately
    const updatedFooter = document.getElementById('updated');
    if (updatedFooter) {
        updatedFooter.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }

    // Fetch forecast
    fetchForecast(data.name);
}

async function fetchForecast(city) {
    const API_KEY = 'e5231f88f8bd1fc78bda5f81572180db';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Cairo,eg&appid=e5231f88f8bd1fc78bda5f81572180db`;
    const forecastBox = document.getElementById('forecast');

    try {
        const res = await fetch(url);
        const forecastData = await res.json();

        const daily = {};
        forecastData.list.forEach(entry => {
            const date = entry.dt_txt.split(" ")[0];
            if (!daily[date]) daily[date] = [];
            daily[date].push(entry);
        });

        const html = Object.entries(daily).slice(1, 6).map(([date, entries]) => {
            const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
            const avgTemp = entries.reduce((sum, e) => sum + e.main.temp, 0) / entries.length;
            const condition = entries[0].weather[0].main;
            const icon = getWeatherEmoji(condition);

            return `
                <div class="forecast-day">
                    <strong>${day}</strong><br>
                    ${icon}<br>
                    ${(avgTemp - 273.15).toFixed(1)} °C
                </div>
            `;
        }).join("");

        forecastBox.innerHTML = `
            <h3>5-Day Forecast</h3>
            <div class="forecast-grid">${html}</div>
        `;
    } catch (err) {
        console.error("Forecast fetch error:", err);
        forecastBox.innerHTML = `<p class="error">Could not load forecast.</p>`;
    }
}

setInterval(fetchWeather, 10000);
window.onload = fetchWeather;