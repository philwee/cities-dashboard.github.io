import './CarouselCard.css';
import React from 'react';
import graphImg from './graph.png'


function CarouselCard({title,date}){


    return (
        <div className="carousel-card-container">
            <div className='carousel-card-imgContainer'>
                <img src={graphImg} alt="" />
            </div>
            <div className="carousel-card-contents">
                <div className='carousel-card-title'>
                    <p>{title}</p>
                </div>
                <div className='carousel-card-date'>
                    <p>{date}</p>
                </div>
            </div>
        </div>
       
    );
}

export default CarouselCard;
