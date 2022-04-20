import './Card.css';
import React from 'react';
import graphImg from './graph.png'
import { Link } from "react-router-dom"


function Card({title,imageUrl,body,LinkChange,setLinkChange}){

    const changeLinkContent = () => {
		setLinkChange(false);
	}

    return (
        <div className="cardContainer">
            <div className="cardContents">
            <div className='cardHeader'>
                <div className='cardTitle'>
                    <h3>{title}</h3>
                </div>
                <div className='cardBody'>
                    <p>{body}</p>
                </div>
            </div>

            <div className='imageContainer'>
                <img src={graphImg} alt="" />
            </div>
            <Link to={`/project`} onClick={changeLinkContent}><button className="buttonStyles">Details</button></Link>

            </div>
            
        </div>

       
    );
}

export default Card;
