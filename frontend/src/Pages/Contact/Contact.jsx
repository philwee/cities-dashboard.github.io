import { Link } from 'react-router-dom';
import { BsFacebook } from 'react-icons/bs';
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from 'react-icons/ai';
import './Contact.css';
import citiesLogo from './cities.png';

export default function Contact() {
  return (
    <div className="contactPage">
      <div className="contactPageContent">
        <div className="contentBox">
          <div className="contentForm">
            <p>GET IN TOUCH</p>
            <form className="formContent" action="">
              <input
                className="nameEmail"
                type="text"
                placeholder="Name"
                id="name"
              />
              <input
                className="nameEmail"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <textarea
                className="textMessage"
                name="message"
                id="message"
                cols="30"
                rows="8"
                placeholder="Message"
              />
              <div>
                <input className="submitButton" type="button" value="Submit" />
              </div>
            </form>
          </div>
          <div className="contentLogoSocial">
            <div className="contentLogo">
              <img className="contactLogo" src={citiesLogo} alt="" />
            </div>
            <div className="contentIcons">
              <Link className="iconLink" to="/contact">
                <AiFillTwitterCircle size={40} />
              </Link>
              <Link className="iconLink" to="/contact">
                <AiFillLinkedin size={40} />
              </Link>
              <Link className="iconLink" to="/contact">
                <BsFacebook size={35} />
              </Link>
              <Link className="iconLink" to="/contact">
                <AiFillInstagram size={40} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
