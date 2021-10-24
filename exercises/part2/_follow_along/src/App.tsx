import { NotesInterface } from './components/Note'
import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'

const Notification = (props: { message: string | null}) => {
  const {message} = props
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([] as NotesInterface[])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null as string | null)

  const hook = () => {
    noteService
      .getAll()
      .then( (initialNotes: any) => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])
  
  const addNote = (event: any) => {
    event.preventDefault()
    const addedNote = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toString(),
      important: Math.random() < .5
    }

    noteService
      .create(addedNote)
      .then((createdNote:any) => {
        setNotes(notes.concat(createdNote))
        setNewNote('')
      })
    
  }

  const toggleImportanceOf = (id: number) => {
    const note = notes.find(n => n.id === id) as NotesInterface
    const changedNote = {...note, important: note ? !note.important : false} as NotesInterface

    noteService
      .update(id, changedNote)
      .then((updatedNote:any) => {
        setNotes(notes.map(note => note.id === id ? updatedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' is not on the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  
  const handleNoteChange = (event: any) => setNewNote(event.target.value)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App