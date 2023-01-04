// disable eslint for this file
/* eslint-disable */

import { useState, createContext } from 'react';

export const LinkContext = createContext();

export const LinkProvider = (props) => {
  const [underlineLink, setUnderlineLink] = useState('home');
  return (
    <LinkContext.Provider value={[underlineLink, setUnderlineLink]}>
      {props.children}
    </LinkContext.Provider>
  );
};
