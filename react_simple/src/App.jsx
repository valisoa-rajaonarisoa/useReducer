import React, { useReducer } from 'react'
import { useState } from 'react'


export default function App() {

  // ******************** S T A T E *****************

    // ********* 1 definir la variable 
    const initial= {
      personnes : [] //********* on met un tableaux vide dans l'attribut personnes, donc on peut y acceder avec state.personnes
    }

    // ***************** 2 useReducer 
    const [state, dispatch]= useReducer(reducer, initial)

    // **************** 3 la fonction 
    function reducer (state, action){

      switch(action.type)
      {
        case "add":
          return {
            ...state, // on copier le state 
            personnes : 
                [...state.personnes, // on copier le personnes actuelles
                  action.playload  // on enregistre le nouveaux, dans le playload 
                ]
          }
        case "delete": 
          return {
            ...state,
            personnes : [...state.personnes.filter((personne)=> personne.id != action.playload)]
          }

        default :
          return null
      }
    }


    // **********recuperation des datas 
    const [nom, setNom]= useState("");
    const [age, setAge]= useState(15);


  // *****************************C O M P O R T E M E N T *******

  // *************ajouté 
  const handleSubmit = (e)=>{
    e.preventDefault();

    // ********** voir si age et nom existe 
    let id = Date.now();
    if( nom && age )
    {
      dispatch ({
        type: "add", //********on choisi le add 
        playload: {nom,age,id} //on recupere les nom et age et onles met dans playload
      })
    }

    // ********nettoyage 
    setNom('');
    setAge(15);
  }

  // **********delete 
  const handleDelete = (id) =>{
    
    dispatch(
      {
        type:"delete",
        playload: id
      }
    )
  }


  // ****************** ***************** A F F I C H A G E ***********
  return (
    <div>
      <form onSubmit={(event)=>handleSubmit(event)}>
        
        <input 
        type="text" name="" id="" placeholder='nom' 

          value={nom} 
          onChange={(e)=> setNom(e.target.value)}

        />

        <input type="number" name="" id="" placeholder='age' 

          value={age} 
          onChange={(e)=> setAge(e.target.value)}

        />

        <button type="submit">+</button>
      </form>

      <br/>
      <br/>
      <br/>

      <div>
        {
          state.personnes.map((personne)=>(

            <h2 key={personne.id}>
              {personne.nom}  avec  {personne.age} ans 

              <button onClick={()=>handleDelete(personne.id)}>X</button>

            </h2>
          ))
        }
      </div>
    </div>
  )
}
