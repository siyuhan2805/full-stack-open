import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import services from './services/persons'
import Notification from './components/Notification'

const App = () => {
  // state containing array of new people
  const [persons, setPersons] = useState([]) 
  // state for managing names of new people in the input field
  const [newName, setNewName] = useState('')
  // state for managing numbers of new people in the input field
  const [newNumber, setNewNumber] = useState('')
  // state for managing filter value 
  const [newFilter, setNewFilter] = useState('')
  // state for managing notification messages 
  const [newNotification, setNewNotification] = useState({})
  

  // useEffect hook for handling the fetching of data from json-server where the persons array containing objects are stored
  useEffect(() => {
    services.getAll()
    .then(initialPersons => {
      console.log(initialPersons)
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log(`error retrieving list of people from JSON server, refer to the following error msg: ${error}`)
    })
  }, [])

  // function for deleting users from the db 
  const deletePerson = id => {
    // find the person object with the id 
    const removePerson = persons.find(person => person.id === id)
    // confirm if user wants to delete person
    if (window.confirm(`Delete ${removePerson.name} ?`)) {
      services.remove(id)
      .then(deletedUser => {
        console.log(deletedUser)
        console.log(`Deleted user with name ${deletedUser.name} and id ${deletedUser.id}`)
        // once the promise to remove user from JSON server is fulfilled, return the list of updated persons with a GET request
        return services.getAll()
      })
      // the return value is now captured by the new callback function below
      .then(updatedPersons => {
        setPersons(updatedPersons)
      })
      .catch(error => 
        {console.log(
        `Error removing user from JSON server db. Refer to the error messsage for more info: ${error}`)
        setNewNotification(
          {message: `Information of ${removePerson.name} has already been removed from server`, 
          isError: true}
        )
        setTimeout(() => {
          setNewNotification({})
        }, "5000");
      })      
    }
  }


  // function for handling checks of dupe users by name field when attempting to submit duplicate persons with same name
  const dupePersonCheck = () => {
    //iterate across the persons state array to find user
    const dupePresent = persons.find(person => person.name === newName)
    return dupePresent
  }


  // function for adding a new person object to the persons state and to the json-server backend
  const addName = (event) => {
    // prevent the default behaviour of submitting a form that would cause unexpected page reload
    event.preventDefault()
    // call dupePersonCheck function 
    if (dupePersonCheck() == undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      // POST request to db.json to add the newPerson object to the backend
      services.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setNewNotification(
          {message: `Added ${returnedPerson.name}`, 
          isError: false}
        )
        setTimeout(() => {
          setNewNotification({})
        }, "5000");
        
      })
      .catch(error => {
        console.log(`error posting new person to JSON server. Refer to the error message for more details: ${error}`)
      })
  
    }
    else {
      // confirm user wants to update phone number of existing person
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        const updatedInfo = {
          ...existingPerson,
          number: newNumber
        }
        // PUT request to update the object in the JSON server
        services.update(existingPerson.id, updatedInfo)
        .then(updatedPerson => {
          console.log(`${updatedPerson.name} has had their old number replaced with ${updatedInfo.number}`)
          setNewNotification(
            {message: `Updated ${updatedPerson.name}'s number`, 
            isError: false}
          )
          setTimeout(() => {
            setNewNotification({})
          }, "5000");
        
          // once the promise to remove user from JSON server is fulfilled, return the list of updated persons with a GET request
          return services.getAll()
        })
        .then(allPersons => {
          setPersons(allPersons)
        })
        .catch(error => {
          `Error occured while updating number. Refer to error msg for more info: ${error}`
        })
      }
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
      <Notification message={newNotification}/>
      <Filter text={"filter shown with"} value={newFilter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm name={{value: newName, onChange: handleNameChange}} number={{value: newNumber, onChange: handleNumberChange}} onSubmit={addName}/>
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}


export default App
