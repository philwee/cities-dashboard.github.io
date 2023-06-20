import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { LinkProvider } from './ContextProviders/LinkContext';
import { HomePageProvider } from './ContextProviders/HomePageContext';
import { CommentCountsProvider } from './ContextProviders/CommentCountsContext';
import { TabProvider } from './ContextProviders/TabContext';

ReactDOM.render(
  <React.StrictMode>
    <HomePageProvider>
      <CommentCountsProvider>
        <LinkProvider>
          <TabProvider>
            <App />
          </TabProvider>
        </LinkProvider>
      </CommentCountsProvider>
    </HomePageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
