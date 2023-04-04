// disable eslint for this file
/* eslint-disable */

import { React, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from './Components/Header/Header';
// import Home from './Pages/Home/Home';
// import Project from './Pages/Project/Project';
// import About from './Pages/About/About';
import Footer from './Components/Header/Footer';
import FourOhFour from './Pages/404';

const Home = lazy(() => import('./Pages/Home/Home'));
const Project = lazy(() => import('./Pages/Project/Project'));
const About = lazy(() => import('./Pages/About/About'));

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
                customBackground: '#202124',
                customAlternateBackground: '#2C2F33',
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
          {useMemo(
            () => (
              <Header />
            ),
            []
          )}
          <Box flex={1} display="flex" width="100%">
            <Suspense fallback={<div>Loading...</div>}>
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
                <Route path="/404" element={<FourOhFour />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
              </Routes>
            </Suspense>
          </Box>
          {useMemo(
            () => (
              <Footer />
            ),
            []
          )}
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
