import { React, useState, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';
import About from './Pages/About/About';


function App() {
  const [LinkChange, setLinkChange] = useState(true);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            light: '#57068c', // NYU purple color
            main: '#893ebd',
            dark: '#24005e',
            contrastText: '#fff',
          },
          background: {
            gray: '#f6f6f6'
          },
          mode: prefersDarkMode ? 'dark' : 'light'
        },
        typography: {
          fontFamily: '"IBM Plex Sans", sans-serif !important'
        }
      }),
    [prefersDarkMode],
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100vw', minHeight: '100vh', backgroundColor: 'background.gray' }}>
          <Header LinkChange={LinkChange} setLinkChange={setLinkChange} />
          <Routes>
            <Route
              path="/"
              element={
                <Home LinkChange={LinkChange} setLinkChange={setLinkChange} />
              }
            />
            <Route
              path="/project"
              element={<Project setLinkChange={setLinkChange} />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </ThemeProvider>  
    </BrowserRouter>
  );
}

export default App;
