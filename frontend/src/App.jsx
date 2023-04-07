// disable eslint for this file
/* eslint-disable */

import { React, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from './Components/Header/Header';
import Footer from './Components/Header/Footer';
import FourOhFour from './Pages/404';

import themeDatabase from './theme.json';

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
            palette: {...themeDatabase.dark.palette,...themeDatabase.universal.palette},
            typography: themeDatabase.universal.palette
          }
          : {
            // palette values for light mode
            palette: {...themeDatabase.light.palette,...themeDatabase.universal.palette},
            typography: themeDatabase.universal.palette
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
            <Suspense fallback={<LoadingText/>}>
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

const LoadingText = () => {
  return(
    <Container>
      <Typography textAlign='center' sx={{p: 4}}>Loading...</Typography>
    </Container>
  )
};

export default App;
