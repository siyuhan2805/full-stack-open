import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import services from './services/countries'

const Filter = ({filter, onChange}) => {
  return (
    <div>
      find countries <input value={filter} onChange={onChange}/>
    </div>
  )
}

const Countries = ({filteredCountries, filter, showCountryInfo, showWeatherInfo, handleCapitalChange}) => {
  const countries = filteredCountries()
  if (filter === '') {
    <div></div>
  }
  else if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country => <div key={country.name.common}>{country.name.common}<button type="button" value={country.name.common} onClick={showCountryInfo}>show</button></div>)}
      </div>
    )  
  }
  else if (countries.length === 1) {
    handleCapitalChange(countries[0].capital[0])
    const weatherIcon = `https://openweathermap.org/img/wn/${showWeatherInfo.list[0].weather[0].icon}@2x.png`
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <div>capital {countries[0].capital[0]}</div>
        <div>area {countries[0].area}</div>
        <h2>languages</h2>
        <ul>
          {Object.keys(countries[0].languages).map(key => <li>{countries[0].languages[key]}</li>)}
        </ul>
        <img src={countries[0].flags.png}/>
        <h1>Weather in {countries[0].capital}</h1>
        <p>temperature {showWeatherInfo.list[0].main.temp} Celsius </p>
        <img src={weatherIcon}/>
        <p>wind {showWeatherInfo.list[0].wind.speed} m/s</p>
      </div>
    )
  }
  
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [capital, setCapital] = useState('Helsinki')
  const [weatherInfo, setWeatherInfo] = useState({})

  useEffect(() => {
    services.getAllCountries()
    .then(allCountries => {
      setCountries(allCountries)
    })
  }, [])

  useEffect(() => {
    services.getCapitalWeather(capital)
    .then(weatherInfo => {
      setWeatherInfo(weatherInfo)
    })
  }, [capital])

  // method for applying filter to countries state and returning only filtered countries
  const filteredCountries = () => {
    // filter through each object in countries state arr and return a filtered arr
    const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )
    console.log(filteredCountries)
    return filteredCountries
  }



  // method for showing the country view when clicked
  const showCountryInfo = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  // method for handling capital change
  const handleCapitalChange = capital => setCapital(capital)
  
  // method for handling filter changes and assigning newFilter state
  const handleFilterChange = (event) => {
    console.log(`Filter value is now ${event.target.value}`)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <Countries filteredCountries={filteredCountries} filter={newFilter} showCountryInfo={showCountryInfo} showWeatherInfo={weatherInfo} handleCapitalChange={handleCapitalChange}/>

    </div>
  )
}

export default App
