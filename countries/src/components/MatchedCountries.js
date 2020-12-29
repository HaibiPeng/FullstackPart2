import React from 'react'
import DisplayCountry from './DisplayCountry'
import ShowCountry from './ShowCountry'


const MatchedCountries = ({MatchedCountries}) => {
  if (MatchedCountries.length > 10) {
    return (
      <div>
        Too many matches, be more specific
      </div>
    )
  } else if (MatchedCountries.length <= 10 && MatchedCountries.length > 1) {
    return (
      <div>
        {MatchedCountries.map((country,i) => <ShowCountry key={i} country={country} />)}
      </div>
    )
  } else if (MatchedCountries.length === 1) {
    return (
      <DisplayCountry country={MatchedCountries[0]}/>
    )
  } else {
    return (
      <div>
        No matched countries
      </div>
    )
  }
}

export default MatchedCountries