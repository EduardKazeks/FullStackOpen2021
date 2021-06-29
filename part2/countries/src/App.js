import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weatherCountry }) => {
  if (!weatherCountry || !weatherCountry.location)
    return null

  return (
    <div>
      <h2>Weather in {weatherCountry.location.name}</h2>
      <b>temperature: {weatherCountry.current.temperature} Celcius</b>
      <br />
      <img src={weatherCountry.current.weather_icons[0]} alt="" />
      <br />
      <b>wind: {weatherCountry.current.wind_speed} mph direction SSW</b>
    </div>
  )
}

const List = ({ countries, filter }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filterCountries, setFilterCountries] = useState([]);
  const [weatherCountry, setWeatherCountry] = useState(null);

  useEffect(() => {
    setSelectedCountry(null)
    console.log(filterCountries)
    const filterFunction = (country) => {
      const countryName = country.name.toUpperCase()
      const filterCountryName = filter.toUpperCase()
      return countryName.indexOf(filterCountryName) != -1
    }
    setFilterCountries(countries.filter(filterFunction))
  }, [filter])

  useEffect(() => {
    if (!selectedCountry)
      return
    axios
      .get(`http://api.weatherstack.com/current?access_key=532b8a7d6f4aa7ad956e0c7b3e1fc864&query=${selectedCountry.capital}`)
      .then(response => {
        console.log(response.data)
        setWeatherCountry(response.data)
      })
  }, [selectedCountry])

  useEffect(() => {
    console.log(filterCountries)
    if (filterCountries.length == 1) {
      setSelectedCountry(filterCountries[0])
    }
  }, [filterCountries])

  if (filterCountries.length > 10) {
    return "Too many matches, specify another filter"
  }
  if (selectedCountry) {
    return (
      <div>
        <h1>{selectedCountry.name}</h1>
        <p>capital {selectedCountry.capital} </p>
        <p>population {selectedCountry.population}</p>
        <h2>Languages</h2>
        <ul>
          {selectedCountry.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={selectedCountry.flag} width="100px" />
        <Weather weatherCountry={weatherCountry} />
      </div>
    )
  }
  return (
    <div>
      {
        filterCountries.map((country, index) => {
          return (
            <div key={index}>
              {country.name}
              <button onClick={() => { setSelectedCountry(country) }}>show</button>
            </div>
          )
        })
      }
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleCountrieFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={filter} onChange={handleCountrieFilter} />
      </form>
      <div>
        <List countries={countries} filter={filter} />
      </div>
    </div>
  )
}

export default App