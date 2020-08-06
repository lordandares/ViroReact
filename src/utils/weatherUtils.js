import axios from 'axios';
import idx from 'idx';

const OPEN_WEATHER_MAP_APP_ID = 'b0a897096054caa6368e294245990d28';
const RIYADH_CITY_ID = '108410';
const OPEN_WEATHER_MAP_REQ_URL = `https://api.openweathermap.org/data/2.5/weather?id=${RIYADH_CITY_ID}&APPID=${OPEN_WEATHER_MAP_APP_ID}&units=metric`;
// https://openweathermap.org/weather-conditions

export const getCurrentWeather = () =>
  new Promise(async (resolve, reject) => {
    const cWeather = await axios.get(OPEN_WEATHER_MAP_REQ_URL);
    if (!cWeather.data || cWeather.status !== 200) reject();
    else
      resolve({
        icon: idx(cWeather, _ => _.data.weather[0].icon.replace('n', 'd')),
        temp: idx(cWeather, _ => _.data.main.temp),
      });
  });
