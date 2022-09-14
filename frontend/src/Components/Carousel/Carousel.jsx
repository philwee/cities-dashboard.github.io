import './Carousel.css';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export default function Carousel({ carouselData }) {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft += 500;
  };

  return (
    <div className="main-slider-container">
      <BiChevronLeft
        size={40}
        className="slider-icon left"
        onClick={slideLeft}
      />
      <div id="slider">{carouselData.map((data) => data)}</div>
      <BiChevronRight
        size={40}
        className="slider-icon right"
        onClick={slideRight}
      />
    </div>
  );
}
