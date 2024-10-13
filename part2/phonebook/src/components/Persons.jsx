//Persons component
const Persons = ({persons, newFilter}) => {
    return (
      <div>
        {/* applied filter to only display people that include characters outlined in newFilter state */}
        {persons.filter(person => person.name.toLowerCase().includes(newFilter)).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    )
}

export default Persons

