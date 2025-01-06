
const App = () => {


  // **********************apprendre le Reduce d'abord 

  const tab = [1,2,3,4];


  const a = tab.reduce((accumulateur:number , value : number): number =>{

    // *******voir l'accumulateur 
    console.log("l'accumulateur ", accumulateur);

    // ***********voir le value 
    console.log("le value ", value);

    // ******** fait le calcul 
    return accumulateur + value

  }, 100)

  console.log("le resulat", a);

  return (
    <div></div>
  )
}

export default App