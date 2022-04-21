import './Project.css'
import CarouselCard from '../../Components/CarouselCard/CarouselCard';
import {BiChevronLeft,BiChevronRight} from 'react-icons/bi';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import graphImg from './graph.png'


export default function Project({setLinkChange}) {

  //for tabs
  const [toggleTab,setToggleTab]=useState(1);

  const toggleFunc = (index)=> {
    setToggleTab(index);

  }


  //for carousel
  const slides = [1,2,3,4,5];

  const slideLeft=()=>{
      var slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight=()=>{
      var slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft + 500;
  }

  //for link change(home -> back)
  useEffect(() => {
    setLinkChange(false);
  
    return () => {
      console.log("Returned");
    }
  });
  

  return (
    <>
        <div className='graphSection '>
          <div className='centerProjectItems1'>
            <p className='projectName'>
              PROJECT NAME
            </p>
            <div className="tabList">
                <button
                  className={toggleTab === 1 ? "tabs activeTab" : "tabs"}
                  onClick={() => toggleFunc(1)}
                >
                  D2
                </button>
                <button
                  className={toggleTab === 2 ? "tabs activeTab" : "tabs"}
                  onClick={() => toggleFunc(2)}
                >
                  Marketplace
                </button>
            </div>
            <div className='tabContainer'>
              <div className="tabContents">
                  <div className={toggleTab === 1 ? "content  activeContent" : "content"}>
                    <div className='daysSelect'>
                      <p>Last 30 days</p>
                    </div>
                    <div className='graphCanvas'>
                      <div className='midGraph'>
                        <img  src={graphImg} alt="" />
                      </div>
                    </div>
                    <div className='dlButton'>
                        <Link className='linkButton' to={'/project'} >
                          <div className='buttonDl' > Download Raw Data </div>
                        </Link>
                    </div>
                  </div>

                  <div className={toggleTab === 2 ? "content  activeContent" : "content"}>
                    <div className='daysSelect'>
                      <p>Last 60 days</p>
                    </div>
                    <div className='graphCanvas'>
                      <div className='midGraph'>
                        <img  src={graphImg} alt="" />
                      </div>
                    </div>
                    <div className='dlButton'>
                        <Link className='linkButton' to={'/project'} >
                          <div className='buttonDl' > Download Raw Data </div>
                        </Link>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          
        </div> 
        <div className='detailsContainer'>
          <div className='centerProjectItems2'>
            <p className='detailsTitle'>DETAILS</p>
            <div className='detailsContent'>
              There was only one way to do things in the Statton house. That one way was to do exactly what the father, Charlie, demanded. He made the decisions and everyone else followed without question. That was until today.Devon couldn't figure out the color of her eyes. He initially would have guessed that they were green, but the more he looked at them he almost wanted to say they were a golden yellow. Then there were the flashes of red and orange that seemed to be streaked throughout them. It was almost as if her eyes were made of opal with the sun constantly glinting off of them and bringing out more color. They were definitely the most unusual pair of eyes he'd ever seen.It was a good idea. At least, they all thought it was a good idea at the time. Hindsight would reveal that in reality, it was an unbelievably terrible idea, but it would take another week for them to understand that. Right now, at this very moment. they all agreed that it was the perfect course of action for the current situation.

            </div>
          </div>
        </div>
        <div className="carousel-container">
          <div className='centerProjectItems3'>
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
          </div>
    </>
   
  )
}


