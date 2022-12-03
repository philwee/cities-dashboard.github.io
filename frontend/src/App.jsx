// disable eslint for this file
/* eslint-disable */

import { React, useState, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';
import About from './Pages/About/About';
import Footer from './Components/Header/Footer';

function App() {
  const [LinkChange, setLinkChange] = useState(true);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme(
        prefersDarkMode
          ? {
              // palette values for dark mode
              palette: {
                primary: {
                  main: '#57068c',
                  contrastText: '#000',
                },
              background: {
                default: "#555555"
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
                  main: '#57068c',
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
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: 'customBackground',
          }}
        >
          <Header LinkChange={LinkChange} setLinkChange={setLinkChange} />
          <Routes>
            <Route
              path="/"
              element={
                <Home LinkChange={LinkChange} setLinkChange={setLinkChange} prefersDarkMode={prefersDarkMode} />
              }
            />
            <Route
              path="/project"
              element={<Project setLinkChange={setLinkChange} prefersDarkMode={prefersDarkMode}/>}
            />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
