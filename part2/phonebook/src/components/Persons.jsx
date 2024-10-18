//Persons component
const Persons = ({persons, newFilter, deletePerson}) => {
    return (
      <div>
        {/* applied filter to only display people that include characters outlined in newFilter state */}
        {persons.filter(person => person.name.toLowerCase().includes(newFilter)).map(person => 
          <p key={person.name}>{person.name} {person.number}<button onClick={() => deletePerson(person.id)}>delete</button></p>
        )}
      </div>
    )
}

export default Persons

