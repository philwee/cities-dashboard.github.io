import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ LinkChange, setLinkChange }) {
  // for underlining menu items
  const [underlineItem, setUnderlineItem] = useState(1);

  const underlineFunc = (index) => {
    setUnderlineItem(index);
  };

  // for link change
  const changeLinkContent = () => {
    setLinkChange(true);
  };

  return (
    <div className="pageHeader">
      <div className="purpleBanner" />
      <div className="titleMenuBar">
        <div className="centerLogoMenuBar">
          <div className="citiesLogo" />
          <div className="projectTitle">CITIES DASHBOARD</div>
          <div className="menuBar">
            <ul>
              {LinkChange ? (
                <Link className="navLink" to="/">
                  <li
                    className={underlineItem === 1 ? 'active' : ''}
                    onClick={() => underlineFunc(1)}
                  >
                    HOME
                  </li>
                </Link>
              ) : (
                <Link className="navLink" to="/" onClick={changeLinkContent}>
                  <li onClick={() => underlineFunc(1)}>HOME</li>
                </Link>
              )}
              <Link className="navLink" to="/about">
                <li
                  className={underlineItem === 2 ? 'active' : ''}
                  onClick={() => underlineFunc(2)}
                >
                  ABOUT
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
