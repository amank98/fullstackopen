import { useState } from 'react';
import './App.css';

const Button = (props: {text:string, value:number, onClick:() => void}) => <button onClick={props.onClick}>{props.text}</button>

const StatisticsLine = (props: {text:string, value:number}) => {
  return (
    <tr>
      <td> <p>{props.text}</p> </td> 
      <td> <p>{props.value}</p> </td>
    </tr>
  )
}

const Statistics = (props: {good:number, neutral:number, bad:number}) => {
  const total = props.good + props.neutral + props.bad
  if (!props.good && !props.neutral && !props.bad) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good}/>
          <StatisticsLine text="neutral" value={props.neutral}/>
          <StatisticsLine text="bad" value={props.bad}/>
          <StatisticsLine text="all" value={total}/>
          <StatisticsLine text="average" value={(props.good-props.bad)/total}/>
          <StatisticsLine text="positive" value={props.good/total}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" value={good} onClick={() => setGood(good+1)}/>
      <Button text="neutral" value={neutral} onClick={() => setNeutral(neutral+1)}/>
      <Button text="bad" value={bad} onClick={() => setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App;
