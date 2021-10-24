import { useEffect, useState } from 'react'
import phoneService from './service/phoneService'

export interface PersonInterface {
  id: number,
  name: string,
  number: string
}

const AddedComponent = (props: { message: string | null}) => {
  const {message} = props;

  if (!message) {
    return null
  }

  return (
    <div className='added'>
      {message}
    </div>
  )
}

const ErrorComponent = (props: { message: string | null}) => {
  const {message} = props;

  if (!message) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([] as PersonInterface[]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ applyFilter, setApplyFilter] = useState(false)
  const [ reset, resetState ] = useState(true)
  const [ addedMessage, setAddedMessage ] = useState(null as string | null)
  const [ errorMessage, setErrorMessage ] = useState(null as string | null)

  useEffect(() => {
    phoneService
    .getPeople()
    .then((people: PersonInterface[]) => {
      setPersons(people)
    })
  }, [reset, addedMessage])

  const addPerson = (event: any) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    if (!foundPerson) {
      phoneService
      .createPerson({name: newName, number: newNumber, id: persons.length+1})
      .then((createdPerson: PersonInterface) => {
          setPersons(persons.concat(createdPerson))
          setAddedMessage('Added ' + createdPerson.name)
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
      })
    }
    else {
      if (window.confirm(newName + " already exists. Do you want to update the number?")) {
        phoneService
        .updatePerson(foundPerson.id, {...foundPerson, number: newNumber})
        .then((createdPerson: PersonInterface) => {
          setAddedMessage("Updated " + createdPerson.name + "'s phone number to " + createdPerson.number)
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
      }
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

  const setFilterChange = (event: any) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const removePerson = (person: PersonInterface) => {
    if (window.confirm("Do you really want to remove " + person.name + '?')) {
      phoneService
      .deletePerson(person.id)
      .then((response: any) => {
        resetState(!reset)
      })
      .catch((error: any) => {
        setErrorMessage(person.name + ' was already removed from the db.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddedComponent message={addedMessage}/>
      <ErrorComponent message={errorMessage}/>
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
          .map(person => <> <p> {person.name} {person.number} </p> <button onClick={() => removePerson(person)}> delete </button> </>)
      }
    </div>
  )
}

export default App