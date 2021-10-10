import React from "react";

interface HelloProps {
  name: string
}

function Hello(props: {name:string} ) {
  return (
    <div>
      <p> Hello {props.name}</p>
    </div>
  );
}

function App() {
  return (
    <>
      <h1> Greetings </h1>
      <Hello name="Aman"/>
      <Hello name="Mannet"/>
    </>
  );
}

export default App;
