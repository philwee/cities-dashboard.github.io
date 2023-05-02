// disable eslint for this file
/* eslint-disable */

// import libraries
import { useState, createContext } from 'react';

// create context
export const LinkContext = createContext();

// context provider
export const LinkProvider = (props) => {
  // state to store underline link
  const [underlineLink, setUnderlineLink] = useState('home');

  // return context provider
  return (
    <LinkContext.Provider value={[underlineLink, setUnderlineLink]}>
      {props.children}
    </LinkContext.Provider>
  );
};
