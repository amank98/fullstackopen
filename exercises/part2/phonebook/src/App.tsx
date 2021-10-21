import { useEffect, useState } from 'react'
import axios from 'axios'

interface PersonInterface {
  id: number,
  name: string,
  number: string
}

const App = () => {
  const [ persons, setPersons ] = useState([] as PersonInterface[]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ applyFilter, setApplyFilter] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response:any) => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event: any) => {
    event.preventDefault()
    if (!persons.find(person => person.name === newName)) {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
      setNewName('')
      setNewNumber('')
    }
    else {
      window.alert('${newName} already exists in phonebook')
    }
  }

  const onNameChange = (event: any) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const onNumberChange = (event: any) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const setFilterChange = (event:any) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with</p>
      <input
        onChange={setFilterChange}
      />
      <br/>
      <button 
        onClick={() => setApplyFilter(!applyFilter)}
      > 
        {applyFilter ? 'turn off filter' : 'turn on filter'} 
      </button>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <input 
          value={newName}
          onChange={onNameChange}
        />
        <br/>
        <input 
          value={newNumber}
          onChange={onNumberChange}
        />
        <br/>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {
        persons
          .filter(person => applyFilter ? person.name.toLowerCase() === filter.toLowerCase() : person)
          .map(person => <p>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App