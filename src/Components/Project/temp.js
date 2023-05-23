
import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCard from './weathercard'

function Temp() {

    const [searchValue, setSearchValue] = useState('Kanpur')
    const [tempInfo, setTempInfo] = useState({})

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=886705b4c1182eb1c69f28eb8c520e20`

            let res = await fetch(url)
            let data = await res.json()
            // console.log(data)

            const { temp, pressure, humidity } = data.main
            const { main: weathermood } = data.weather[0]
            const { name } = data
            const { country, sunset, sunrise } = data.sys
            const { speed } = data.wind

            const myNewWeatherInfo = {
                temp,
                pressure,
                humidity,
                weathermood,
                name,
                country, sunset,
                sunrise, speed
            };
            setTempInfo(myNewWeatherInfo)

            // console.log(temp)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [])

    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input
                        type="search"
                        autoFocus
                        id='search'
                        className='searchTerm'
                        placeholder='Search...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button type='button' className='searchButton' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>

            <WeatherCard tempInfo={tempInfo} />

        </>
    )
}

export default Temp
