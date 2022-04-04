import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({LinkChange,setLinkChange}) {

    const changeLinkContent = () => {
		setLinkChange(!LinkChange);
	}

    return (
        <div className='pageHeader'>
            <div className='purpleBanner'></div>
            <div className='titleMenuBar'>
                <div className="projectTitle">
                    CITIES RESEARCH CENTER DASHBOARD
                </div>
                <nav className="menuBar">
                    <ul>
                        {LinkChange ? <Link className="navLink" to={'/'}><li className='active'>HOME</li></Link> :
                        <Link className="navLink" to={'/'} onClick={changeLinkContent}><li>BACK</li></Link> }
                        <Link className="navLink" to={'/about'}><li>ABOUT</li></Link>
                        <Link  className="navLink" to={'/contact'}><li>CONTACT</li></Link>
                    </ul>
                </nav>
            </div>
            <div className="citiesLogo"></div>
        </div>
    )
}
