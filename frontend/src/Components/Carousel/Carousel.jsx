import React from 'react';
import './Carousel.css';
import {BiChevronLeft,BiChevronRight} from 'react-icons/bi';
import CarouselCard from '../CarouselCard/CarouselCard';

const Carousel = (props)=>{
    const slides = [1,2,3,4,5,6,7,8,9];

    const slideLeft=()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight=()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    };
    return(
        <div className="carousel-container">
            <div className='carousel-title'>
                <p>OTHER AVAILABLE DATA</p>
            </div>
            <div className='main-slider-container'>
                <BiChevronLeft size={40} className='slider-icon left' onClick={slideLeft}/>
                <div id='slider'>
                {
                    slides.map((slide,index)=>{
                        return(
                                  <CarouselCard
                                    title='Project'
                                    date='Updated:Apr 5,2022' />
                        )
                    })
                }
                </div>
                <BiChevronRight size={40} className='slider-icon right' onClick={slideRight}/>
               

            </div>
          
        </div>
    );
}

export default Carousel;