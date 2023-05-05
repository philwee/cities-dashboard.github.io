// disable eslint for this file
/* eslint-disable */

import { useState, createContext } from 'react';

export const LinkContext = createContext();

export const LinkProvider = (props) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [chartsTitlesList, setChartsTitlesList] = useState([]);

  return (
    <LinkContext.Provider value={[currentPage, setCurrentPage, chartsTitlesList, setChartsTitlesList]}>
      {props.children}
    </LinkContext.Provider>
  );
};
