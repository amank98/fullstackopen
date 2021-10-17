import { useState } from 'react'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '010-123-4235' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event: any) => {
    event.preventDefault()
    if (!persons.find(person => person.name === newName)) {
      setPersons(persons.concat({name: newName, phone: newPhone}))
      setNewName('')
      setNewPhone('')
    }
    else {
      window.alert('${newName} already exists in phonebook')
    }
  }

  const onNameChange = (event: any) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const onPhoneChange = (event: any) => {
    event.preventDefault()
    setNewPhone(event.target.value)
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
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <input 
          value={newName}
          onChange={onNameChange}
        />
        <br/>
        <input 
          value={newPhone}
          onChange={onPhoneChange}
        />
        <br/>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {
        persons
          .filter(person => person.name.toLowerCase() === filter.toLowerCase())
          .map(person => <p>{person.name} {person.phone}</p>)
      }
    </div>
  )
}

export default App