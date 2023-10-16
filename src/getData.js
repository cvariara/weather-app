async function getWeather(url) {
  const response = await fetch(url, { mode: 'cors' });
  const weatherData = await response.json();
  return weatherData;
}

// current day info
function getCurrentInfo(url, locationVal) {
  getWeather(url)
    .then((current) => {
      const location = current.location.name;
      const { country } = current.location;
      const currentTime = current.location.localtime;
      const conditionIcon = current.current.condition.icon;
      const condition = current.current.condition.text;
      const tempC = current.current.temp_c;
      const tempF = current.current.temp_f;
      const windSpeedMPH = current.current.wind_mph;
      const windSpeedKPH = current.current.wind_kph;
      const isDay = current.current.is_day;
      displayBackground(isDay);
      displayCurrentInfo(
        location,
        country,
        currentTime,
        condition,
        conditionIcon,
        tempC,
        tempF,
        windSpeedKPH,
        windSpeedMPH,
      );
    })
    .catch(() => {
      alert(`Can't find ${locationVal}. Please try again.`);
    });
}

// forecast info
function getForecastInfo(url, locationVal) {
  const forecasts = document.querySelector('.forecasts');
  forecasts.innerHTML = '';
  getWeather(url)
    .then((forecast) => {
      for (let i = 0; i < 3; i++) {
        const { sunrise } = forecast.forecast.forecastday[i].astro;
        const { sunset } = forecast.forecast.forecastday[i].astro;
        const { date } = forecast.forecast.forecastday[i];
        const lowTempC = forecast.forecast.forecastday[i].day.mintemp_c;
        const highTempC = forecast.forecast.forecastday[i].day.maxtemp_c;
        const lowTempF = forecast.forecast.forecastday[i].day.mintemp_f;
        const highTempF = forecast.forecast.forecastday[i].day.maxtemp_f;
        const condition = forecast.forecast.forecastday[i].day.condition.text;
        const conditionIcon = forecast.forecast.forecastday[i].day.condition.icon;
        const rainChance = forecast.forecast.forecastday[i].day.daily_chance_of_rain;
        if (i === 0) {
          displayForecastToday(
            sunrise,
            sunset,
            lowTempC,
            highTempC,
            lowTempF,
            highTempF,
            rainChance,
          );
        } else {
          displayForecastDay(
            sunrise,
            sunset,
            date,
            lowTempC,
            highTempC,
            lowTempF,
            highTempF,
            condition,
            conditionIcon,
          );
        }
      }
    })
    .catch(() => {
      alert(`Can't find ${locationVal}. Please try again.`);
    });
}

function displayBackground(isDay) {
  const backgroundImage = document.querySelector('body');
  if (isDay === 1) {
    document.body.style.color = 'black';
    document.body.style.textShadow = 'none';
    backgroundImage.style.backgroundImage = "url('./images/day.webp')";
  } else {
    document.body.style.color = 'white';
    document.body.style.textShadow = '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000';
    backgroundImage.style.backgroundImage = "url('./images/night.jpg')";
  }
}

function displayCurrentInfo(
  location,
  country,
  currentTime,
  condition,
  conditionIcon,
  tempC,
  tempF,
  windSpeedKPH,
  windSpeedMPH,
) {
  const currentDay = document.querySelector('.current-day');
  currentDay.style.visibility = 'visible';
  const header = document.querySelector('.header');

  header.innerHTML = `
    <div class="location">
        <div class="location-name">${location},</div>
        <div class="location-country">${country}</div>
    </div>
    <div class="time">${currentTime}</div>
  `;

  currentDay.innerHTML = `
  <div class="condition">
  <img src="${conditionIcon}" alt="weather condition" class="condition-icon">
    <p class="condition-text">${condition}</p>
  </div>
  <div class="temperature">
    <div class="current-temp">${tempF}°F / ${tempC}°C</div>
  </div>
  <div class="weather-elements">
    <div class="element">
    <i class="fa-solid fa-wind wind-speed-icon icon"></i>
      <p class="wind-speed-text">${windSpeedMPH} MPH</p>
      <p class="wind-speed-text">${windSpeedKPH} KPH</p>
    </div>
  </div>
  `;
}

function displayForecastToday(
  sunrise,
  sunset,
  lowTempC,
  highTempC,
  lowTempF,
  highTempF,
  rainChance,
) {
  const temp = document.querySelector('.temperature');
  const elements = document.querySelector('.weather-elements');

  const tempLowHigh = document.createElement('div');
  tempLowHigh.classList.add('temp-low-high');
  tempLowHigh.innerHTML = `
    <div class="temp-low">${lowTempF}°F / ${lowTempC}°C</div>
    <div class="temp-high">${highTempF}°F / ${highTempC}°C</div>
  `;
  temp.appendChild(tempLowHigh);

  const currentSunrise = document.createElement('div');
  currentSunrise.classList.add('element');
  currentSunrise.innerHTML = `
  <i class="fa-solid fa-sunrise sunrise-icon icon"></i>
  <p class="sunrise-text">${sunrise}</p>
  `;
  const currentSunset = document.createElement('div');
  currentSunset.classList.add('element');
  currentSunset.innerHTML = `
  <i class="fa-solid fa-sunset sunset-icon icon"></i>
  <p class="sunset-text">${sunset}</p>
  `;
  const currentRain = document.createElement('div');
  currentRain.classList.add('element');
  currentRain.innerHTML = `
  <i class="fa-solid fa-droplet rain-chance-icon icon"></i>
  <p class="rain-chance-text">${rainChance} %</p>
  `;
  elements.appendChild(currentSunrise);
  elements.appendChild(currentSunset);
  elements.appendChild(currentRain);
}

function displayForecastDay(
  sunrise,
  sunset,
  date,
  lowTempC,
  highTempC,
  lowTempF,
  highTempF,
  condition,
  conditionIcon,
) {
  const forecast = document.querySelector('.forecasts');
  const forecastDay = document.createElement('div');
  forecastDay.classList.add('forecast-day');
  forecastDay.innerHTML = `
  <div class="forecast-day-row">
    <div class="forecast-date">${date}</div>
    <div class="forecast-low-temp">L: ${lowTempF}°F / ${lowTempC}°C</div>
    <div class="forecast-high-temp">H: ${highTempF}°F / ${highTempC}°C</div>
  </div>
  <div class="forecast-day-row">
    <div class="forecast-condition">
      <img 
        src="${conditionIcon}" 
        alt="forecast weather condition" 
        class="forecast-condition-icon"
      >
      <p class="forecast-condition-text">${condition}</p>
    </div>
    <div class="forecast-sunrise">
      <i class="fa-solid fa-sunrise forecast-sunrise-icon"></i>
      <p class="forecast-sunrise-text">${sunrise}</p>
    </div>
    <div class="forecast-sunset">
    <i class="fa-solid fa-sunset forecast-sunset-icon"></i>
    <p class="forecast-sunset-text">${sunset}</p>
    </div>
  </div>
  `;
  forecast.appendChild(forecastDay);
}

export { getCurrentInfo, getForecastInfo };
