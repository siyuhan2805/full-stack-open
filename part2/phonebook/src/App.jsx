import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

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
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
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


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}


export default App
