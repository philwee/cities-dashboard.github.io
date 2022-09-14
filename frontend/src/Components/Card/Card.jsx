import './Card.css';
import { Link } from 'react-router-dom';
import graphImg from './graph.png';

export default function Card({ title, body, setLinkChange }) {
  const changeLinkContent = () => {
    setLinkChange(false);
  };

  return (
    <div className="cardContainer">
      <div className="cardContents">
        <div className="cardHeader">
          <div className="cardTitle">
            <h3>{title}</h3>
          </div>
          <div className="cardBody">
            <p>{body}</p>
          </div>
        </div>

        <div className="imageContainer">
          <img src={graphImg} alt="" />
        </div>
        <Link to="/project" onClick={changeLinkContent}>
          <button type="button" className="buttonStyles">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
