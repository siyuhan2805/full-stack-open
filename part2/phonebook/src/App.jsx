import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  // state containing array of new people
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    
  ]) 
  // state for managing names of new people in the input field
  const [newName, setNewName] = useState('')
  // state for managing numbers of new people in the input field
  const [newNumber, setNewNumber] = useState('')
  // state for managing filter value 
  const [newFilter, setNewFilter] = useState('') 



  // function for handling checks of dupe users by name field when attempting to submit duplicate persons with same name
  const dupePersonCheck = () => {
    //iterate across the persons state array to find user
    const dupePresent = persons.find(person => person.name === newName)
    return dupePresent
  }


  // function for adding a new person object to the persons state
  const addName = (event) => {
    // prevent the default behaviour of submitting a form that would cause unexpected page reload
    event.preventDefault()

    // call dupePersonCheck function 
    if (dupePersonCheck() == undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
    else {
      alert(`${newName} is already added to the phonebook`)
    }
  
  }

  // function for handling display of name value in the input element
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // function for handling display of number value in the input element
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // function for handling display of filter value in the input element
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={"filter shown with"} value={newFilter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm name={{value: newName, onChange: handleNameChange}} number={{value: newNumber, onChange: handleNumberChange}} onSubmit={addName}/>
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}


export default App
