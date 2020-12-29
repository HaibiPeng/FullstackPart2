import React, { useState, useEffect } from 'react'
import Person from './component/person'
import personService from './services/persons'

const Filter = ({ handleFilter }) => {
    return <div>Filter shown with: <input onChange={handleFilter}/></div>
}

const PersonForm = ({ addInfo, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addInfo}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Persons = ({ personsFilter, setPersons }) => {
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .deletePerson(person.id)
        .then(setPersons(personsFilter.filter(item => item.id !== person.id)))
    }
  }
  return personsFilter.map(person => 
  <div key={person.name}><Person person={person} number={person}/> <button onClick={() => deletePerson(person)}>delete</button></div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('Nothing happened...')
  const [ errorMessage, setErrorMessage ] = useState('Nothing happened...')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  
  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  

  const addInfo = (event) => {
    event.preventDefault()
    let existedName = persons.find(person => person.name === newName);
    if (existedName) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changeNumber = {...existedName,number:newNumber};
        personService
          .put(changeNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === changeNumber.id ? returnedPerson : person))
            setSuccessMessage(`Changed the number of ${returnedPerson.name} to ${returnedPerson.number} in the server.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`The number of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }
    } else {
        const infoObject = {
            name: newName,
            number: newNumber
          }
        
        personService
        .create(infoObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added the number of ${newName} to the server.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(error)
        })
    }
  }

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value.toLowerCase());
  }

  const personsFilter = persons.filter(person => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm addInfo={addInfo} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsFilter={personsFilter} setPersons={setPersons}/> 
    </div>
  )
}

export default App