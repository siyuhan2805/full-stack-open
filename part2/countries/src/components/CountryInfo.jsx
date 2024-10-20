import WeatherInfo from "./WeatherInfo"

const CountryInfo = (props) => {
    return (
        <div>
            <h1>{props.countryName}</h1>
            <div>capital {props.capitalCity}</div>
            <div>area {props.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.keys(props.languages).map(key => <li>{props.languages[key]}</li>)}
            </ul>
            <img src={props.flag}/>
            <WeatherInfo capitalCity={props.capitalCity} temperature={props.temperature} weatherIcon={props.weatherIcon} windSpeed={props.windSpeed}/>
        </div>
    )
}

export default CountryInfo 