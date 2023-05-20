// disable eslint for this file
/* eslint-disable */

// import libraries
import { React, useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Stack,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import components
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import FourOhFour from './Pages/404';
import DeviceOrientationNotification from './Components/SnackBarNotifications';

import ThemePreferences from './ThemePreferences';
import CustomThemes from './CustomThemes';

// lazy load pages
const Home = lazy(() => import('./Pages/Home/Home'));
const Project = lazy(() => import('./Pages/Project/Project'));

// create theme design tokens based on theme preference
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
  // set theme preference state based on localStorage or system preference
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemePreferences.dark
        : ThemePreferences.light)
  );

  // create theme using getDesignTokens
  const theme = useMemo(
    () => createTheme(getDesignTokens(themePreference)),
    [themePreference]
  );

  return (
    <BrowserRouter basename="/">
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
              <Header setThemePreference={setThemePreference} />
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

// loading text for suspense fallback
function LoadingText() {
  return (
    <Container>
      <Stack
        p={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <CircularProgress />
        <Typography variant="h6" textAlign="center" color="text.primary">
          Loading
        </Typography>
      </Stack>
    </Container>
  );
}

export default App;
