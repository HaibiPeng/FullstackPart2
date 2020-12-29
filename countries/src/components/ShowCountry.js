import React, {useState} from 'react'
import DisplayCountry from './DisplayCountry'

const ShowCountry = ({country}) => {
  const [countryToShow, setcountryToShow] = useState(false)
  
  const handleShowCountry = () => {
    setcountryToShow('true')
  }

  if(countryToShow) {
    return (
      <div>
        <DisplayCountry country={country}/>
      </div>
    )
  } else {
    return (
      <div>
        {country.name} <button onClick={handleShowCountry}>show</button>
      </div>
    )
  }
}

export default ShowCountry