import axios from 'axios';
import React, { act, useEffect, useReducer } from 'react'
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

        case "get":
          return {
            ...state,
            personnes : action.playload // reuperation des datas dans le playpload 
          }

        
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

    if( nom && age )
    {
      // *************requette envoyer au server 
      const add = async()=>{
        try{
          await axios.post("http://localhost:4000/personne",{nom,age})
        }catch(error){
          console.log(error)
        }
      }

      add();

      // *****************juste on l'a besoin pour l'affichage 
      dispatch ({
        type: "add", //********on choisi le add 
        playload: {nom,age} //on recupere les nom et age et onles met dans playload
      })
    }

    // ********nettoyage 
    setNom('');
    setAge(15);
  }

  // **********delete 
  const handleDelete = (id) =>{
    
    const personDelete = async()=>{
      try{
        await axios.delete(`http://localhost:4000/personne/${id}`)
      }catch(error){
        console.log(error)
      }
    }

    personDelete();
    dispatch(
      {
        type:"delete",
        playload: id
      }
    )
  }

  // *************** get 
  const getPersonnes= async()=>{
    try{
      const personnesServer= await axios.get("http://localhost:4000/personne")
      // ************on appelle de dispatch 
      dispatch(
        {
          type:"get", //on choisi le get 
          playload: personnesServer.data //mettre dans le playload le data 
        }
      )
    }catch(error)
    {
      console.log("une errer lors de la recuperation des personnes ",error)
    }
  }

  // *** un peu de useEffect 
  useEffect(()=>{
    getPersonnes();
  },[])

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
