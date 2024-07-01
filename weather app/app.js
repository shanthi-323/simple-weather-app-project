// app.js

/*document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    const apiKey = '11084c178c6cb74a396a337d96ecdcb0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    async function checkWeather(){
        const response = await fetch(apiUrl + '&appid=${apikey}' );
        var data = await response.json();
        
        console.log(data);
    }

fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            if (data.cod === 200) {
                const { main, weather, wind } = data;
                weatherInfo.innerHTML = `
                    <p><strong>Temperature:</strong> ${main.temp}°C</p>
                    <p><strong>Weather:</strong> ${weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                `;
            } else {
                weatherInfo.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });


        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");
    
        async function checkWeather(city){
        const response = await fetch(apiUrl + city + '&appid=${apikey}' );
    
        if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "block";
    
        }else{
            var data = await response.json();
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML= data.wind.speed + " km/h";
    
        if(data.weather[0].main == "Clouds"){
         weatherIcon.src = "C:\Users\Shanthi Saravanan\Documents\portfolio projects\weather app\images\clear.png";
        }
        else if(data.weather[0].main == "Clear"){
         weatherIcon.src = "C:\Users\Shanthi Saravanan\Documents\portfolio projects\weather app\images\clear.png";
        } 
        else if(data.weather[0].main == "Rain"){
         weatherIcon.src = "C:\Users\Shanthi Saravanan\Documents\portfolio projects\weather app\images\rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
         weatherIcon.src = "C:\Users\Shanthi Saravanan\Documents\portfolio projects\weather app\images\drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
         weatherIcon.src = "C:\Users\Shanthi Saravanan\Documents\portfolio projects\weather app\images\mist.png";
        }
    }
}
});
*/

document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    const apiKey = '11084c178c6cb74a396a337d96ecdcb0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeatherData(data);
            updateWeatherIcon(data.weather[0].main);
        } else {
            displayError(data.message);
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
});

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    const { main, weather, wind, name } = data;

    document.querySelector('.temp').textContent = `${Math.round(main.temp)}°c`;
    document.querySelector('.city').textContent = name;

    weatherInfo.innerHTML = `
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
}

function displayError(message) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `<p>${message}</p>`;
    document.querySelector('.temp').textContent = '';
    document.querySelector('.city').textContent = '';
    document.querySelector('.weather-icon').style.display = 'none';
}

function updateWeatherIcon(weatherCondition) {
    const weatherIcon = document.querySelector(".weather-icon");
    let iconPath = '';

    switch (weatherCondition) {
        case 'Clouds':
            iconPath = 'images/clouds.png';
            break;
        case 'Clear':
            iconPath = 'images/clear.png';
            break;
        case 'Rain':
            iconPath = 'images/rain.png';
            break;
        case 'Drizzle':
            iconPath = 'images/drizzle.png';
            break;
        case 'Mist':
            iconPath = 'images/mist.png';
            break;
        default:
            iconPath = '';
            break;
    }

    if (iconPath) {
        weatherIcon.src = iconPath;
        weatherIcon.style.display = 'block';
    } else {
        weatherIcon.style.display = 'none';
    }
}



