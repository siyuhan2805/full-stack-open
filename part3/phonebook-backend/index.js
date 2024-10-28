const express = require('express')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
  

// HTTP routes
// GET route for root directory of the application 
app.get('/', (request, response) => {
    response.send('<h1>Backend for phonebook application</h1>')
})
// GET route for the /api/persons path of the application 
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// GET route for the /info path of the application displaying the number of people in the phonebook and the current date of request
app.get('/info', (request, response) => {
    const date = new Date()
    const peopleNum = persons.length
    response.send(`<p>Phonebook has info for ${peopleNum} people </p> <p>${date}</p>`)
})

// GET route for the /api/persons/:id path of the application
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id 
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const newId = persons.length > 0 ? Math.max(...persons.map(person => Number(person.id))) : 0
    return (newId + 1).toString()
}

const checkUniqueNum = (name) => {
    const existingPerson = persons.find(person => person.name === name)
    return existingPerson
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.number || !body.name || checkUniqueNum(body.name) !== undefined) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number.toString()
    }
    persons = persons.concat(person)
    response.json(person)
})



const PORT = 3001
// binds the http server assigned to the app variable to listen to the HTTP requests sent to port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})