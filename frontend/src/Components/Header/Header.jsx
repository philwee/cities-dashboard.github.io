// disable eslint for this file
/* eslint-disable */
import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { Tooltip, Box, Typography, Container, Paper, AppBar, Toolbar, useScrollTrigger, Fab, Fade, Slide, Stack, Drawer, Divider } from '@mui/material';

import ThemeSelector from './ThemeSelector';
import NavBar from './NavBar';
import SpeedDialButton from './SpeedDialButton';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

// import images
import citiesLogo from '../../cities-logo.png';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';
import { replacePlainHTMLWithMuiComponents } from '../../Utils';

export const showInMobile = (defaultDisplay) => {
  return { display: { xs: (defaultDisplay || "block"), lg: "none" } };
}
export const showInDesktop = (defaultDisplay) => {
  return { display: { xs: "none", lg: (defaultDisplay || "block") } };
}

const toolBarHeightInRem = 3;
const topAnchorID = "top-anchor-ID";

const StyledAppBar = styled(AppBar)(() => ({
  boxShadow: 'none',
  "& .MuiToolbar-root": {
    padding: 0
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    height: "auto",
    borderRadius: "0.5rem",
    margin: theme.spacing(2)
  }
}));

export default function Header(props) {
  const { setThemePreference } = props;

  const [currentPage, _, chartsTitlesList, __] = useContext(LinkContext);

  // trigger for hiding/showing the AppBar
  const triggerHideAppBar = useScrollTrigger({
    target: window,
    threshold: 70
  });

  // hamburger menu on mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Hidable navbar */}
      <Slide appear={false} direction="down" in={!triggerHideAppBar}>
        <StyledAppBar enableColorOnDark component="nav">
          <Toolbar sx={{ backgroundColor: 'primary', height: `${toolBarHeightInRem}rem` }}>
            <Container sx={{ height: "100%" }} >
              {/* CITIES logo and navbar */}
              <Stack direction="row" justifyContent='space-between' alignItems='center' height="100%">
                <Paper elevation={4}
                  sx={{
                    height: `${toolBarHeightInRem * 4 / 3}rem`,
                    mt: `${toolBarHeightInRem}rem`,
                    opacity: triggerHideAppBar ? 0 : 1,
                    borderRadius: "0.5rem",
                    transition: '0.2s ease-in-out', '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  <CITIESlogoLinkToHome />
                </Paper>

                <Stack direction="row" alignItems='center' justifyContent="flex-end" height="100%" spacing={2}>

                  {/* Navbar in landscape placed here, will be hidden in mobile  */}
                  <Box sx={{ ...showInDesktop("block"), height: "100%" }}>
                    <NavBar currentPage={currentPage} />
                  </Box>

                  <Tooltip title={"Navigation Menu"}>
                    <IconButton
                      color="inherit"
                      aria-label="open mobile menu drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={showInMobile("flex")}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>


                  <Tooltip title={"Settings"}>
                    <IconButton
                      color="inherit"
                      aria-label="open setting drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={showInDesktop("flex")}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>

              </Stack>
            </Container>
          </Toolbar>
        </StyledAppBar>
      </Slide >

      <Box>
        <StyledDrawer
          anchor="right" //from which side the drawer slides in
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Stack onClick={handleDrawerToggle}>
            {/* // Only show the NavBar here in mobile  */}
            <Box sx={showInMobile("block")}>
              <Container sx={{ py: 2 }}>
                <Typography variant="h6" color="text.secondary" fontWeight='medium' gutterBottom>
                  CITIES Dashboard
                </Typography>
                <NavBar currentPage={currentPage} />
              </Container>
              <Divider />
            </Box>

            <Container sx={{ pt: 2, pb: 3 }}>
              <Typography variant="h6" color="text.secondary" fontWeight='medium' gutterBottom>
                Dashboard Settings
              </Typography>
              <ThemeSelector isFullWidth={true} setThemePreference={setThemePreference} />
            </Container>

          </Stack>
        </StyledDrawer>
      </Box >

      {/* From MUI's documentation: 
      When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here is how to fix:
      You can render a second <Toolbar /> component: */}
      <Toolbar id={topAnchorID} sx={{ backgroundColor: "customAlternateBackground", height: `${toolBarHeightInRem * 1.5}rem` }
      } />

      <Box width="100%" sx={{ pt: 4, pb: 3, backgroundColor: "customAlternateBackground" }}>
        <Container >
          <Typography
            variant="h3"
            color="text.primary"
            fontWeight='medium'
          >
            CITIES DASHBOARD
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {parse(jsonData.siteDescription, {
              replace: replacePlainHTMLWithMuiComponents,
            })}
          </Typography>
        </Container>
      </Box >

      <SpeedDialButton chartsTitlesList={chartsTitlesList} topAnchorID={topAnchorID} />

    </>
  );
}

const CITIESlogoLinkToHome = () => {
  return (<Link to="/">
    <img style={{
      height: "100%", width: "auto", borderRadius: "0.5rem"
    }} src={citiesLogo} title="CITIES Dashboard Logo" alt="CITIES Dashboard Logo" />
  </Link>);
}