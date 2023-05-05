// disable eslint for this file
/* eslint-disable */
import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { Tooltip, Button, Menu, MenuItem, Grid, Box, Typography, Container, Paper, AppBar, Toolbar, useScrollTrigger, Fab, Fade, Slide, Stack, Drawer, Divider } from '@mui/material';

import ThemeSelector from './ThemeSelector';
import NavBar from './NavBar';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

import citiesLogo from '../../cities-logo.png';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';

export const showInMobile = { display: { xs: "block", lg: "none" } };
export const showInDesktop = { display: { xs: "none", lg: "block" } };

const innerHeight = window.innerHeight;
const toolBarHeightInRem = 4;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  "& .MuiToolbar-root": {
    padding: 0
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  boxSizing: "border-box",
  maxWidth: "60vw",
  "& .MuiPaper-root": {
    height: "auto",
    borderRadius: "0.5rem",
    margin: theme.spacing(2),
  }
}));

function ScrollTop(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: innerHeight / 2,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'instant'
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}



export default function Header(props) {
  const { setThemePreference } = props;

  const [currentPage, _, chartsTitlesList, __] = useContext(LinkContext);

  // trigger for hiding/showing the AppBar
  const triggerHideAppBar = useScrollTrigger({
    target: window,
    threshold: 100
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
                    height: `${toolBarHeightInRem * 1.25}rem`,
                    mt: `${toolBarHeightInRem * 0.5}rem`,
                    opacity: triggerHideAppBar ? 0 : 1,
                    borderRadius: "0.5rem",
                    transition: '0.2s ease-in-out', '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  <CITIESlogoLinkToHome />
                </Paper>

                <Stack direction="row" alignItems='center' justifyContent="flex-end" height="100%" spacing={2}>

                  {/* Navbar in landscape placed here, will be hidden in mobile  */}
                  <Box sx={showInDesktop}>
                    <NavBar currentPage={currentPage} chartsTitlesList={chartsTitlesList} />
                  </Box>

                  <Tooltip title={"Navigation Menu"}>
                    <IconButton
                      color="inherit"
                      aria-label="open mobile menu drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={showInMobile}
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
                      sx={showInDesktop}
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

      <Box component="nav">
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
            <Box sx={showInMobile}>
              <Container sx={{ py: 2 }}>
                <NavBar currentPage={currentPage} chartsTitlesList={chartsTitlesList} />
              </Container>
              <Divider />
            </Box>

            <Container sx={{ py: 2 }}>
              <Typography variant="body1" color="text.secondary" fontWeight='medium' gutterBottom>
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
      < Toolbar id="back-to-top-anchor" sx={{ backgroundColor: "customAlternateBackground", height: `${toolBarHeightInRem * 1.5}rem` }
      } />

      < Box width="100%" sx={{ pt: 2, pb: 3, backgroundColor: "customAlternateBackground" }}>
        <Container >
          <Box>
            <Typography
              variant="h3"
              color="text.primary"
              fontWeight='medium'
            >
              CITIES DASHBOARD
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {parse(jsonData.siteDescription)}
            </Typography>
          </Box>
        </Container>
      </Box >

      <ScrollTop {...props}>
        <Fab aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

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