import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react'

export default function WeatherApp() {
    const [weather, setWeather] = useState({
        city: "Kolhapur",
        humidity: 93,
        temp: 22.98,
        weather: "light rain",
        wind: 4.55
    })

    let  updateInfo = (newInfo) => {
        setWeather(newInfo)
    }

    return (
        <>
            <h3>Weather App</h3>
            <SearchBox  updateInfo={updateInfo}/>
            <hr />
            <InfoBox info={weather} />
        </>
    )
}