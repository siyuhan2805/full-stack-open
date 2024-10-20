import Country from './Country'
import CountryInfo from './CountryInfo'

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
          {countries.map(country => <Country countryName={country.name.common} showCountryInfo={showCountryInfo}/>)}
        </div>
      )  
    }
    else if (countries.length === 1) {
      handleCapitalChange(countries[0].capital[0])
      const weatherIcon = `https://openweathermap.org/img/wn/${showWeatherInfo.list[0].weather[0].icon}@2x.png`
      return (
        <div>
          <CountryInfo countryName={countries[0].name.common} capitalCity={countries[0].capital[0]} area={countries[0].area} languages={countries[0].languages} flag={countries[0].flags.png} temperature={showWeatherInfo.list[0].main.temp} weatherIcon={weatherIcon} windSpeed={showWeatherInfo.list[0].wind.speed}/>
        </div>
      )
    }
}

export default Countries