// disable eslint for this file
/* eslint-disable */

// import libraries
import { useState, createContext } from 'react';

// create context
export const TabContext = createContext();

// context provider
export const TabProvider = (props) => {
  // state to store tab data
  const [tab, setTab] = useState({});
  // return context provider
  return (
    <TabContext.Provider value={[tab, setTab]}>
      {props.children}
    </TabContext.Provider>
  );
};
