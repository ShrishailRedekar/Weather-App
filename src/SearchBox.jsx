import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false)

    const API_URL = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "822035d905c00da01f09b94a25e371ee"

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse)
    
            let result = {
                city: city,
                temp:jsonResponse.main.temp,
                temp_max:jsonResponse.main.temp_max,
                temp_min:jsonResponse.main.temp_min,
                humidity: jsonResponse.main.humidity,
                feels_like: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                wind_speed: jsonResponse.wind.speed
            }
            console.log(result)
            return result;
            
        } catch (error) {
           throw error
        }
    }

    let handleChange = (event) => {
        setCity(event.target.value)
    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(city);
            setCity("");
            setError(false)
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo)

        } catch (error) {
            setError(true)
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Search place"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                    required />
                  &nbsp;  
                <button type='submit'>Search</button>
                {error && <p style={{color: "red"}}>No such place exist</p>}
            </form>

        </>
    )
}