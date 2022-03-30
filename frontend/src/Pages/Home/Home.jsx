import React from 'react'
import Card from '../../Components/Card/Card'
import "./Home.css"

export default function Home() {
  return (
    <div className='home'>
        <div className="purple-banner"></div>
        <div className="white-banner"></div>
        <div className="cities-logo"></div>
        <div className="title">CITIES Research Center Dashboard</div>
        <div className = "header"> 
            <div className="head-logo"></div>
            <div className="head-name"></div>
            <div className="interactions"></div>
        </div>
        <Card 
        title='Project 1'
        imageUrl= "/graph.png"
        body='Researcher Name'
        />
    </div>
  )
}
