import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { LinkProvider } from './ContextProviders/LinkContext';
import { DataProvider } from './ContextProviders/DataContext';
import { TabProvider } from './ContextProviders/TabContext';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <LinkProvider>
        <TabProvider>
          <App />
        </TabProvider>
      </LinkProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
