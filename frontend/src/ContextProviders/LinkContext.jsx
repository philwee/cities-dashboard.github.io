// disable eslint for this file
/* eslint-disable */

// import libraries
import { useState, createContext } from 'react';

// create context
export const LinkContext = createContext();

// context provider
export const LinkProvider = (props) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [chartsTitlesList, setChartsTitlesList] = useState([]);

  return (
    <LinkContext.Provider value={[currentPage, setCurrentPage, chartsTitlesList, setChartsTitlesList]}>
      {props.children}
    </LinkContext.Provider>
  );
};
