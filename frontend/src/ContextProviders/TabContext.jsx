// disable eslint for this file
/* eslint-disable */

import { useState, createContext } from 'react';

export const TabContext = createContext();

export const TabProvider = (props) => {
  const [tab, setTab] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  return (
    <TabContext.Provider value={[tab, setTab]}>
      {props.children}
    </TabContext.Provider>
  );
};
