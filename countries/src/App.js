import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SearchCountries from './components/SearchCountries'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  return (
    <SearchCountries countries={countries}/>
  )
}


export default App;
