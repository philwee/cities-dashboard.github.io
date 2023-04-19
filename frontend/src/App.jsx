// disable eslint for this file
/* eslint-disable */

import { React, useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Components/Header/Header';
import Footer from './Components/Header/Footer';
import FourOhFour from './Pages/404';

import DeviceOrientationNotification from './Components/SnackBarNotifications';

import ThemePreferences from './ThemePreferences';
import CustomThemes from './CustomThemes';

const Home = lazy(() => import('./Pages/Home/Home'));
const Project = lazy(() => import('./Pages/Project/Project'));
const About = lazy(() => import('./Pages/About/About'));

const getDesignTokens = (themePreference) => ({
  palette: {
    mode: themePreference,
    ...(themePreference === ThemePreferences.dark
      ? {
        ...CustomThemes.dark.palette,
        ...CustomThemes.universal.palette,
        typography: CustomThemes.universal.palette,
      }
      : {
        ...CustomThemes.light.palette,
        ...CustomThemes.universal.palette,
        typography: CustomThemes.universal.palette,
      }),
  },
});

function App() {
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemePreferences.dark
        : ThemePreferences.light
  );

  // create theme using getDesignTokens
  const theme = useMemo(
    () => createTheme(getDesignTokens(themePreference)),
    [themePreference]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: 'customBackground',
          }}
        >
          <DeviceOrientationNotification />


          {useMemo(
            () => (
              <Header
                themePreference={themePreference}
                setThemePreference={setThemePreference}
              />
            ),
            []
          )}
          <Box flex={1} display="flex" width="100%">
            <Suspense fallback={<LoadingText />}>
              <Routes>
                <Route
                  path="/"
                  element={<Home themePreference={themePreference} />}
                />
                <Route
                  path="/project/:id"
                  element={<Project themePreference={themePreference} />}
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
  return (
    <Container>
      <Typography textAlign="center" sx={{ p: 4 }} color="text.primary">
        Loading...
      </Typography>
    </Container>
  );
};

export default App;
