// disable eslint for this file
/* eslint-disable */

import { React, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LinkProvider, DataProvider } from './ContextProviders/LinkContext';
import { Box } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';
import About from './Pages/About/About';
import Footer from './Components/Header/Footer';
import FourOhFour from './Pages/404';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme(
        prefersDarkMode
          ? {
              // palette values for dark mode
              palette: {
                primary: {
                  main: '#893ebd', // lighter nyu purple
                  contrastText: '#000',
                },
                background: {
                  default: '#555555',
                },
                customBackground: '#121212',
                customAlternateBackground: '#00000',
                mode: 'dark',
              },
              typography: {
                fontFamily: '"IBM Plex Sans", sans-serif !important',
              },
            }
          : {
              palette: {
                // palette values for light mode
                primary: {
                  main: '#57068c', // nyu purple
                  contrastText: '#fff',
                },
                customBackground: '#f6f6f6',
                customAlternateBackground: '#ffffff',
                mode: 'light',
              },
              typography: {
                fontFamily: '"IBM Plex Sans", sans-serif !important',
              },
            }
      ),
    [prefersDarkMode]
  );

  return (
    <BrowserRouter>
      <DataProvider>
        <LinkProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                minHeight: '100vh',
                backgroundColor: 'customBackground',
              }}
            >
              <Header />
              <Box flex={1} display="flex" width="100%">
                <Routes>
                  <Route
                    path="/"
                    element={<Home prefersDarkMode={prefersDarkMode} />}
                  />
                  <Route
                    path="/project/:id"
                    element={<Project prefersDarkMode={prefersDarkMode} />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<FourOhFour />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </LinkProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
