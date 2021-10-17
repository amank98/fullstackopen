import { NotesInterface } from './index'
import Note from './components/Note'
import { useState } from 'react'

const App = (props: {notes: NotesInterface[]}) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event: any) => {
    event.preventDefault()
    const addedNote = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toString(),
      important: Math.random() < .5
    }

    setNotes(notes.concat(addedNote))
    setNewNote('')
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  
  const handleNoteChange = (event: any) => setNewNote(event.target.value)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => <Note key={note.id} content={note.content}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App