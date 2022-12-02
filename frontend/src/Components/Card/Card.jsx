import './Card.css';
import { Link } from 'react-router-dom';

export default function Card({ title, owner, graphType, setLinkChange }) {
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
            <p>{owner}</p>
          </div>
        </div>
        <div className="graphContainer">{graphType}</div>
        <Link to="/project" onClick={changeLinkContent}>
          <button type="button" className="buttonStyles">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
