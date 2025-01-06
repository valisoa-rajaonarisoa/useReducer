import React, { useReducer } from 'react'

function App() {


  // 1. Definition de la variable : 
  const monVariable = { count : 0}; 


  // 3. Définir la fonction reduce 
  function reducer (state, action ) {

    switch(action.type){

      case "increment":
        return { count : state.count + 1};
      
      case "decrement":
        return { count : state.count - 1};
      default:
        return { count : false}

    }
  }

  // 2. Definir le useReducer 
  const [state, dispatch]= useReducer(reducer, monVariable);


  return (
    <div>

      <h2>{state.count}</h2>

      <br/>

      {/* ******************** 3  apple  */}
      <button onClick={() => dispatch({ type: "increment"})}>Increment </button>  <br/> <br/>

      <button onClick={() => dispatch({ type: "decrement"})}>Decrement </button>
    </div>
  )
}

export default App