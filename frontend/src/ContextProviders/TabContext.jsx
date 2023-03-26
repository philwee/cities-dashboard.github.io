// disable eslint for this file
/* eslint-disable */

import { useState, createContext } from 'react';

export const TabContext = createContext();

export const TabProvider = (props) => {
  const [tab, setTab] = useState({});
  return (
    <TabContext.Provider value={[tab, setTab]}>
      {props.children}
    </TabContext.Provider>
  );
};
