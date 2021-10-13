import { useState } from "react";

const History = (props: {clicks: string[]}) => {
  if (props.clicks.length === 0) {
    return (
      <p> Press any button to start recording history </p>
    )
  }
  return (
    <p>History: {props.clicks.join(' ')}</p>
  )
}

const Button = (props: {handleClick: () => void, text: string}) => {
  return ( 
    <button onClick={props.handleClick}> 
      {props.text} 
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [clicks, setClicks] = useState([] as string[])

  const handleLeftClick = () => {
    setClicks(clicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setClicks(clicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History clicks={clicks}/>
    </>
  )
}

export default App
