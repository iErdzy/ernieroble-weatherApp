const apiKey = "YOUR_API_KEY_HERE"; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

// Function to fetch weather
async function getWeather(city) {
    // Clear previous states
    errorMsg.innerText = "";
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please try again.");
            } else {
                throw new Error("Unable to fetch data. Check your connection.");
            }
        }

        const data = await response.json();
        displayWeather(data);

    } catch (err) {
        weatherInfo.classList.add('hidden');
        errorMsg.innerText = err.message;
    }
}

// Function to update the UI
function displayWeather(data) {
    // Map data to elements
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = Math.round(data.main.temp);
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
    
    // Update Icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Show the hidden info container
    weatherInfo.classList.remove('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// Allow 'Enter' key to trigger search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getWeather(city);
    }

});
