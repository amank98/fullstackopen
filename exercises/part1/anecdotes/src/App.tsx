import { useState } from 'react';
import './App.css';

const getRandomInt = (max:number) => {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0] as number[])  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const addPointToSelected = (selected: number) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  
  const getAnecdoteWithMostVotes = () => {
    let max = 0
    let max_index = 0
    for (let i=0; i<anecdotes.length; i++) {
      if (points[i] > max) {
        max_index = i
        max = points[i]
      }
    }
    return anecdotes[max_index]
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      {"has " + points[selected] + " votes"}
      <br/>
      <button onClick={() => addPointToSelected(selected)}>vote</button>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {getAnecdoteWithMostVotes()}
    </>
  )
}

export default App;
