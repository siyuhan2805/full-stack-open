const WeatherInfo = ({capitalCity, temperature, weatherIcon, windSpeed}) => {
    return (
        <>
            <h1>Weather in {capitalCity}</h1>
            <p>temperature {temperature} Celsius</p>
            <img src={weatherIcon} alt="icon of the current weather status"/>
            <p>wind {windSpeed} m/s</p>
        </>
    )
}

export default WeatherInfo