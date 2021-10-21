import ReactDOM from 'react-dom'
import App from './App'



export interface NotesInterface {
  id: number,
  content: string,
  date: string,
  important: boolean
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)