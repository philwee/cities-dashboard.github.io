
import React from 'react';
import Card from '../../Components/Card/Card'
import "./Home.css"
import { useEffect } from 'react'

export default function Home({LinkChange,setLinkChange}) {

  const cards =["Project 1", "Project 2", "Project 3", "Project 4","Project 5","Project 6"];

  useEffect(() => {
    setLinkChange(true);
  
    return () => {
      console.log("Returned");
    }
  })
  
  return (
    <div className='home'>
      <div className="projects">
        {cards.map((element ,index)=>{
          return(
            <Card 
            title={element}
            imageUrl= "../../Components/Card/graph.png"
            body='Researcher Name'
            LinkChange={LinkChange}
            setLinkChange={setLinkChange}
          />

          )
         
    

        })}
      </div>
        
    </div>
  )
}
