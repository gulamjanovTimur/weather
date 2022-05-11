export const getWeatherFromCoords = async (coords) => {
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.VUE_APP_ENV_WEATHER_KEY}`)
    .then(res => {
      return res.json()
    })
    .catch(err => {
      throw err
    })
}
export const getWeatherFromCity = async (city) => {
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.VUE_APP_ENV_WEATHER_KEY}`)
    .then(res => {
      return res.json()
    })
    .catch(err => {
      throw err
    })
}
