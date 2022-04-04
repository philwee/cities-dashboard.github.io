
import React from 'react';
import Card from '../../Components/Card/Card'
import "./Home.css"

export default function Home({LinkChange,setLinkChange}) {
  return (
    <div className='home'>
      <div className="projects">
          <Card 
              title='Project 1'
              imageUrl= "../../Components/Card/graph.png"
              body='Researcher Name'
              LinkChange={LinkChange}
              setLinkChange={setLinkChange}
            />
          <Card 
            title='Project 2'
            imageUrl= "../../Components/Card/graph.png"
            body='Researcher Name'
            LinkChange={LinkChange}
            setLinkChange={setLinkChange}
          />
          <Card 
            title='Project 3'
            imageUrl= "../../Components/Card/graph.png"
            body='Researcher Name'
            LinkChange={LinkChange}
            setLinkChange={setLinkChange}
          />
      </div>
        
    </div>
  )
}
