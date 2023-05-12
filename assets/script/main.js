const fetchWether = async () => {
  const d = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,showers_sum,snowfall_sum,windspeed_10m_max&current_weather=true&timezone=auto`
  );

  return d.json();
};

const latitudeLongitudeTimezone = async () => {
  const data = await fetchWether();

  const latitude = data.latitude;
  const longitude = data.longitude;
  const timezone = data.timezone;

  const latitudeDom = document.getElementById("latitude");
  const longitudeDom = document.getElementById("longitude");
  const timezoneDom = document.getElementById("cityNameId");
  latitudeDom.textContent = ` ${latitude}`;
  longitudeDom.textContent = ` ${longitude}`;
  timezoneDom.textContent = `${timezone}`;
};

latitudeLongitudeTimezone();

const currentWether = async () => {
  const data = await fetchWether();

  // const temperature = data.current_weather.temperature;
  // const windSpeed = data.current_weather.windspeed;
  const isDay = data.current_weather.is_day;
  const dataTime = data.current_weather.time;

  // const temperatureUnit = data.daily_units.temperature_2m_max;
  // const windSpeedUnit = data.daily_units.windspeed_10m_max;

  // const temperatureDom = document.getElementById("nowTempId");
  // const windSpeedDom = document.getElementById("windSpeed");
  const dataTimeDom = document.getElementById("dataTime");
  const isDayDom = document.getElementById("dayNight");

  // temperatureDom.textContent = `${temperature} ${temperatureUnit}`;
  // windSpeedDom.textContent = `Wind: ${windSpeed} ${windSpeedUnit}`;
  dataTimeDom.textContent = `${dataTime} `;
  if (isDay === 1) {
    isDayDom.textContent = "DAY";
  } else {
    isDayDom.textContent = "NIGHT";
  }
};

currentWether();

const dayMaxMinTemp = async () => {
  const data = await fetchWether();
  const temperature = data.current_weather.temperature;
  const maxTemperatures = data.daily.temperature_2m_max;
  const minTemperatures = data.daily.temperature_2m_min;

  const temperatureUnit = data.daily_units.temperature_2m_max;

  const maxTemp = Math.max(...maxTemperatures);
  const minTemp = Math.min(...minTemperatures);

  const maxTempDom = document.getElementById("maxTemp");
  const minTempDom = document.getElementById("minTemp");
  const temperatureDom = document.getElementById("nowTempId");

  temperatureDom.textContent = `${temperature} ${temperatureUnit}`;
  maxTempDom.innerHTML = `MaxTemp: <br> ${maxTemp}  ${temperatureUnit}`;
  minTempDom.innerHTML = `MinTemp: <br>  ${minTemp} ${temperatureUnit}`;
};

dayMaxMinTemp();

const sunriseSunset = async () => {
  const data = await fetchWether();

  const sunrise = data.daily.sunrise;
  const sunset = data.daily.sunset;

  const sunrisefirstValue = sunrise[0];
  const sunriselastValue = sunrise[sunrise.length - 1];

  const sunsetfirstValue = sunset[0];
  const sunsetlastValue = sunset[sunrise.length - 1];

  const sunriseDom = document.getElementById("sunrise");
  const sunsetDom = document.getElementById("sunset");

  sunriseDom.innerHTML = `Start: ${sunrisefirstValue}<br> End:  ${sunriselastValue}`;
  sunsetDom.innerHTML = `Start: ${sunsetfirstValue}<br> End: ${sunsetlastValue}`;
};

sunriseSunset();

const snowSwimCoeff = async () => {
  const data = await fetchWether();

  const showers = data.daily.showers_sum;
  const snowfall = data.daily.snowfall_sum;

  const maxShowerCoeff = Math.max(...showers);
  const maxSnowfallCoeff = Math.max(...snowfall);

  const maxShowerCoeffUnit = data.daily_units.showers_sum;
  const maxSnowCoeffUnit = data.daily_units.snowfall_sum;

  const maxShowerCoeffDom = document.getElementById("showerChanceId");
  const maxSnowfallCoeffDom = document.getElementById("snowChanceId");

  maxShowerCoeffDom.textContent = `Shower coefficient: ${maxShowerCoeff} ${maxShowerCoeffUnit}`;
  maxSnowfallCoeffDom.textContent = `Snowfall coefficient: ${maxSnowfallCoeff} ${maxSnowCoeffUnit}`;
};

snowSwimCoeff();

const windMinMax = async () => {
  const data = await fetchWether();

  const mainWindSpeed = data.current_weather.windspeed;
  const windSpeed = data.daily.windspeed_10m_max;

  const windSpeedUnit = data.daily_units.windspeed_10m_max;
  const minWindSpeed = Math.min(...windSpeed);
  const maxWindSpeed = Math.max(...windSpeed);

  const windSpeedDom = document.getElementById("windSpeed");
  const minWindSpeedDom = document.getElementById("minWindSpeed");
  const maxWindSpeedDom = document.getElementById("maxWindSpeed");

  windSpeedDom.textContent = `Wind: ${mainWindSpeed} ${windSpeedUnit}`;
  minWindSpeedDom.textContent = `${minWindSpeed} ${windSpeedUnit}`;
  maxWindSpeedDom.textContent = `${maxWindSpeed} ${windSpeedUnit}`;
};

windMinMax();

const renderWeather = async () => {
  const data = await fetchWether();

  const dataTime = data.current_weather.time;

  const temperatureUnit = data.daily_units.temperature_2m_max;

  const hourlyTime = data.hourly.time;
  const hourlyTemp = data.hourly.temperature_2m;

  const startIndex = hourlyTime.indexOf(dataTime);

  const weatherForecastDiv = document.getElementById("weatherForecast");

  for (let i = startIndex + 1; i < startIndex + 7; i++) {
    const forecastDiv = document.createElement("h4");
    forecastDiv.innerHTML = `${hourlyTime[i]} <br><br> ${hourlyTemp[i]}${temperatureUnit}`;
    forecastDiv.classList.add("houarlyInner");
    weatherForecastDiv.appendChild(forecastDiv);
  }
};

renderWeather();

const dailyTimeTemp = async () => {
  const data = await fetchWether();
};

const isDayBackground = async () => {
  data = await fetchWether();

  const isDay = data.current_weather.is_day;

  const isDayBgDom = document.getElementById("isDayNightBg");

  if (isDay === 1) {
    isDayBgDom.style.backgroundImage = "url('./assets/img/day.jpg') ";
    document.body.style.color = "black";
  } else {
    isDayBgDom.style.backgroundImage = "url('./assets/img/nightBg.jpg')";
    document.body.style.color = "white";
  }
};

isDayBackground();
