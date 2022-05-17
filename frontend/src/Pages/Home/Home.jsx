
import React from 'react';
import Card from '../../Components/Card/Card'
import "./Home.css"
import { useEffect } from 'react'

export default function Home({LinkChange,setLinkChange}) {

  const cards =[1,2,3,4,5,6];

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
            title='Project 1'
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
