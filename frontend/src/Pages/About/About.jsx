import './About.css';
import { BsFacebook } from 'react-icons/bs';
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from 'react-icons/ai';
import citiesPic from './cities.png';

export default function About() {
  return (
    <div className="aboutPageContent">
      <div className="aboutPage">
        <div className="aboutPageLogo">
          <img className="citiesPic" src={citiesPic} alt="" />
          <div className="contentIcons">
            <a className="iconLink" href="https://twitter.com/cities_nyuad/" target="_blank" rel="noreferrer">
              <AiFillTwitterCircle size={40} />
            </a>
            <a className="iconLink" href="https://www.linkedin.com/company/center-for-interacting-urban-networks/" target="_blank" rel="noreferrer">
              <AiFillLinkedin size={40} />
            </a>
            <a className="iconLink" href="https://www.facebook.com/nyuad.cities/" target="_blank" rel="noreferrer">
              <BsFacebook size={35} />
            </a>
            <a className="iconLink" href="https://www.instagram.com/cities.nyuad/" target="_blank" rel="noreferrer">
              <AiFillInstagram size={40} />
            </a>
          </div>
        </div>
        <div className="aboutPageInfo">
          <div className="infoText">
            <h4 className="aboutHeader">THE CENTER</h4>
            <div className="aboutText">
              The NYUAD&apos;s Center for Ineracting Urban Networks (CITIES) is an interdisciplinary research center dedicated to advance urban science and promote cutting-edge research that is translated into practical, real-world solutions for the benefit of society. Our ultimate goal is to foster sustainable, resilient, and equitable cities.
            </div>
            <h4 className="aboutHeader">THE PROJECT</h4>
            <div className="aboutText">
              The CITIES dashboad is an ongoing initiative...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
