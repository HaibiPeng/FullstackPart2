import React, {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const DisplayCountry = ({country}) => {
  const [temperature, setTemperature] = useState(0)
  const [icon, setIcon] = useState([])
  const [wind, setWind] = useState([])

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => {
      setTemperature(response.data.current.temperature)
      setIcon(response.data.current.weather_icons)
      setWind([response.data.current.wind_speed, response.data.current.wind_dir])
      })
  }, [country.capital])

  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital {country.capital}</div>
      <div>Population {country.population}</div>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
      </ul>
      <div><img src={country.flag} height='120' alt=''/></div>
        <h3>Weather in {country.capital}</h3>
        <div><strong>temperature: </strong> {Math.round(temperature)} Celsius</div>
        <div><img src={icon[0]} height='120' alt=''/></div>
        <div><strong>wind: </strong> {wind[0]} mph direction {wind[1]}</div>
    </div>
  )
}

export default DisplayCountry