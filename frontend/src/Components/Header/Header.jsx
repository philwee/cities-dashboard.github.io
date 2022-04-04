import React from 'react'
import './Header.css'

export default function Header() {

  return (
    <div className='pageHeader'>
        <div className='purpleBanner'></div>
        <div className='titleMenuBar'>
            <div className="projectTitle">
                CITIES RESEARCH CENTER DASHBOARD
            </div>
            <nav className="menuBar">
                <ul>
                    <li className='active'>HOME</li>
                    <li>ABOUT</li>
                    <li>CONTACT</li>
                </ul>
            </nav>
        </div>
        <div className="citiesLogo"></div>
    </div>
  )
}
