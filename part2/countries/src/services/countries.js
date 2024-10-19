import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherApiBaseURL = `https://api.openweathermap.org/data/2.5/forecast?`
const apiKey = import.meta.env.VITE_API_KEY

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCapitalWeather = (cityName) => {
    const request = axios.get(`${weatherApiBaseURL}q=${cityName}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
}



export default {
    getAllCountries, getCapitalWeather
}