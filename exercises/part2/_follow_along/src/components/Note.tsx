export interface NotesInterface {
  id: number,
  content: string,
  date: string,
  important: boolean
}

const Note = (props: {note: NotesInterface, toggleImportance: () => void}) => {
    const content = props.note.content
  
    return (
      <li> 
        {content}
        <button onClick={props.toggleImportance} >
          set as {props.note.important ? "unimportant" : "important"}
        </button>
      </li>
    )
}

export default Note