import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { LinkProvider } from './ContextProviders/LinkContext';
import { HomePageProvider } from './ContextProviders/HomePageContext';
import { CommentCountsProvider } from './ContextProviders/CommentCountsContext';
import { TabProvider } from './ContextProviders/TabContext';
import { SheetsDataProvider } from './ContextProviders/SheetsDataContext';

ReactDOM.render(
  <React.StrictMode>
    <HomePageProvider>
      <CommentCountsProvider>
        <SheetsDataProvider>
          <LinkProvider>
            <TabProvider>
              <App />
            </TabProvider>
          </LinkProvider>
        </SheetsDataProvider>
      </CommentCountsProvider>
    </HomePageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
