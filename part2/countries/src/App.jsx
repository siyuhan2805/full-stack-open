import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import services from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'

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
