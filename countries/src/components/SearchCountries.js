import React, {useState} from 'react'
import MatchedCountries from './MatchedCountries'

const SearchCountries = ({countries}) => {
  const [newCountry, setNewCountry] = useState('')
  const [filter, setFilter] = useState([])

  const handleSearchChange = (event) => {
    setNewCountry(event.target.value)
    setFilter(countries.filter(country => country.name.toLowerCase().includes(newCountry.toLowerCase())))
  }

  return (
    <div>
      Search countries <input value={newCountry} onChange={handleSearchChange}/>
      <MatchedCountries MatchedCountries={filter}/>
    </div>
  )
}

export default SearchCountries