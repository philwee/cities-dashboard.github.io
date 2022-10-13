/* eslint-disable no-unused-vars */
import './Project.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../Components/Carousel/Carousel';
import CarouselCard from '../../Components/CarouselCard/CarouselCard';
import BarChart from '../../Graphs/BarChart/BarChart';
import ColumnChart from '../../Graphs/BarChart/ColumnChart';

export default function Project({ setLinkChange }) {
  // for tabs
  const [toggleTab, setToggleTab] = useState(1);
  const [changeChart, setCHangeChart] = useState(true);

  const toggleFunc = (index) => {
    setToggleTab(index);
  };

  const changeFunc = () => {
    setCHangeChart((prevT) => !prevT);
  };

  // for carousel
  const slides = [
    <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
    <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
    <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
    <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
    <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  ];

  // for link change(home -> back)
  useEffect(() => {
    let linkState = false;
    if (!linkState) {
      setLinkChange(false);
    }

    return () => {
      linkState = true;
    };
  });

  return (
    <>
      <div className="graphSection ">
        <div className="centerProjectItems1">
          <p className="projectName">PROJECT NAME</p>
          <div className="tabList">
            <button
              type="button"
              className={toggleTab === 1 ? 'tabs activeTab' : 'tabs'}
              onClick={() => toggleFunc(1)}
            >
              D2
            </button>
            <button
              type="button"
              className={toggleTab === 2 ? 'tabs activeTab' : 'tabs'}
              onClick={() => toggleFunc(2)}
            >
              Marketplace
            </button>
          </div>
          <div className="tabContainer">
            <div className="tabContents">
              <div
                className={
                  toggleTab === 1 ? 'content  activeContent' : 'content'
                }
              >
                <div className="daysSelect">
                  <p>Last 30 days</p>
                </div>
                <div className="graphCanvas">
                  <div className="midGraph">
                    <ColumnChart toggleTab={changeChart} />
                  </div>
                  <div className="stackedButton">
                    <Link className="linkButton" to="/project">
                      <button
                        type="button"
                        className="buttonStacked"
                        onClick={() => changeFunc()}
                      >
                        {changeChart ? 'Unstacked' : 'Stacked'}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleTab === 2 ? 'content  activeContent' : 'content'
                }
              >
                <div className="daysSelect">
                  <p>Last 60 days</p>
                </div>
                <div className="graphCanvas">
                  <div className="midGraph">
                    <BarChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="dlButton">
              <Link className="linkButton" to="/project">
                <button type="button" className="buttonDl">
                  Download Raw Data
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="detailsContainer">
        <div className="centerProjectItems2">
          <p className="detailsTitle">DETAILS</p>
          <div className="detailsContent">
            There was only one way to do things in the Statton house. That one
            way was to do exactly what the father, Charlie, demanded. He made
            the decisions and everyone else followed without question. That was
            until today.Devon could not figure out the color of her eyes. He
            initially would have guessed that they were green, but the more he
            looked at them he almost wanted to say they were a golden yellow.
            Then there were the flashes of red and orange that seemed to be
            streaked throughout them.
            <br />
            <br />
            It was almost as if her eyes were made of opal with the sun
            constantly glinting off of them and bringing out more color. They
            were definitely the most unusual pair of eyes he had ever seen.It
            was a good idea. At least, they all thought it was a good idea at
            the time. Hindsight would reveal that in reality, it was an
            unbelievably terrible idea, but it would take another week for them
            to understand that. Right now, at this very moment. they all agreed
            that it was the perfect course of action for the current situation.
          </div>
        </div>
      </div>
      <div className="carousel-container">
        <div className="centerProjectItems3">
          <div className="carousel-title">
            <p>OTHER AVAILABLE DATA</p>
          </div>
          <Carousel carouselData={slides} />
        </div>
      </div>
    </>
  );
}
