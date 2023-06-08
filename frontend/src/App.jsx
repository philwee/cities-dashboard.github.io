// disable eslint for this file
/* eslint-disable */

// React components
import { React, useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// UI components
import { Box, Typography, Container, CircularProgress, Stack } from '@mui/material/';
import ScrollToTop from './Components/ScrollToTop';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import FourOhFour from './Pages/404';
import DeviceOrientationNotification from './Components/SnackBarNotifications';

// Theme
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThemePreferences from './Themes/ThemePreferences';
import CustomThemes from './Themes/CustomThemes';

// ----- Google Analytics with React-GA-4 -----
// import ReactGA from "react-ga4";
// Only run analytics on the official public-facing website citiesdashboard.com
// (to avoid analytics being run on localhost or dev website)
// if (window.location.hostname == 'citiesdashboard.com') {
//   ReactGA.initialize("G-NSSWE0TJP1");
//   ReactGA.send({ hitType: "pageview", page: document.location.pathname + document.location.search, title: document.title });
// }
// -----

// Lazy load pages
const Home = lazy(() => import('./Pages/Home/Home'));
const Project = lazy(() => import('./Pages/Project/Project'));

// Create theme design tokens based on theme preference
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
  // Set theme preference state based on localStorage or system preference
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemePreferences.dark
      : ThemePreferences.light)
  );

  // Create theme using getDesignTokens
  const theme = useMemo(
    () => createTheme(getDesignTokens(themePreference)),
    [themePreference]
  );

  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <ScrollToTop />
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
                  element={<Home themePreference={themePreference} title={"CITIES Dashboard"} />}
                />
                <Route
                  path="/project/:id"
                  element={<Project themePreference={themePreference} />}
                />
                <Route path="/404" element={<FourOhFour title={"Page Not Found | CITIES Dashboard"} />} />
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

// Loading text for suspense fallback
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
