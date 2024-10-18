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

const Countries = ({filteredCountries, filter}) => {
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
        {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
      </div>
    )  
  }
  else if (countries.length === 1) {
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
      </div>
    )
  }
  
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    services.getAllCountries()
    .then(allCountries => {
      setCountries(allCountries)
    })
  }, [])

  // method for applying filter to countries state and returning only filtered countries
  const filteredCountries = () => {
    // filter through each object in countries state arr and return a filtered arr
    const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )
    console.log(filteredCountries)
    return filteredCountries
  }
  
  // method for handling filter changes and assigning newFilter state
  const handleFilterChange = (event) => {
    console.log(`Filter value is now ${event.target.value}`)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <Countries filteredCountries={filteredCountries} filter={newFilter}/>

    </div>
  )
}

export default App
