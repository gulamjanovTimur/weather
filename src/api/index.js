export const getWeatherFromCoords = async (coords) => {
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=316900de24e7b91bc79bb155d38b139f`)
    .then(res => {
      return res.json()
    })
    .catch(err => {
      throw err
    })
}
export const getWeatherFromCity = async (city) => {
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=316900de24e7b91bc79bb155d38b139f`)
    .then(res => {
      return res.json()
    })
    .catch(err => {
      throw err
    })
}
