// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { Box, Typography, Container, Paper, AppBar, Toolbar, useScrollTrigger, Fab, Fade, Slide, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoReturnDownBack } from 'react-icons/io5';

import { LightMode, DarkMode, Contrast } from '@mui/icons-material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ThemePreferences from '../../ThemePreferences';

import citiesLogo from '../../cities-logo.png';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';

import './Header.css';

const innerHeight = window.innerHeight;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  "& .MuiToolbar-root": {
    padding: 0
  }
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  borderRadius: "0.5rem",
  background: theme.palette.background.paper,
  "& .MuiFormLabel-root, .MuiInputBase-root .MuiTypography-root, svg": {
    fontSize: "0.75rem"
  },
  "& svg": {
    marginRight: "0.5rem",
    verticalAlign: "middle"
  },
  "& .MuiInputBase-root": {
    borderRadius: "0.5rem",
    "&:before,:hover,:after": {
      borderBottom: "none !important"
    },
    "&:hover": {
      background: "rgba(0,0,0,0.25)"
    }
  },
  '& .MuiSelect-select': {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
    "&:focus": {
      background: "none"
    }
  }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "& .MuiTypography-root, svg": {
    fontSize: "0.75rem"
  },
  "& svg": {
    marginRight: theme.spacing(0.5),
    verticalAlign: "middle"
  }
}));



function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window,
    threshold: 40
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

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
        behavior: 'smooth'
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
  const { themePreference, setThemePreference } = props;

  const [underlineLink] = useContext(LinkContext);
  const [themeValue, setThemeValue] = useState(themePreference);

  const handleChange = (event) => {
    localStorage.setItem('theme', event.target.value);
    setThemeValue(event.target.value);
  };

  const themeChangeHandler = ({ matches }) => {
    if (matches) {
      setThemePreference(ThemePreferences.dark);
    } else {
      setThemePreference(ThemePreferences.light);
    }
  };

  useEffect(() => {
    if (themeValue === ThemePreferences.dark) {
      setThemePreference(ThemePreferences.dark);
    } else if (themeValue === ThemePreferences.light) {
      setThemePreference(ThemePreferences.light);
    } else if (themeValue === ThemePreferences.system) {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkThemeMq.matches) {
        setThemePreference(ThemePreferences.dark);
      } else {
        setThemePreference(ThemePreferences.light);
      }
      darkThemeMq.addEventListener('change', themeChangeHandler);
      return () => {
        darkThemeMq.removeEventListener('change', themeChangeHandler);
      };
    }
  }, [themeValue]);

  return (
    <>
      <HideOnScroll {...props}>
        <StyledAppBar>
          <Toolbar sx={{ backgroundColor: 'NYUpurple', height: "4rem" }}>
            <Container sx={{ height: "100%" }} >
              <Stack direction="row" justifyContent='space-between' alignItems='center' height="100%">
                <Stack direction="row" alignItems='center' height="100%" spacing={2}>
                  <Paper
                    elevation={4}
                    sx={{
                      height: "66%",
                      transition: '0.2s ease-in-out', '&:hover': { transform: 'scale(1.3)' },
                    }}
                  >
                    <a href="/">
                      <img style={{
                        height: "100%", width: "auto", borderRadius: "0.5rem"
                      }} src={citiesLogo} title="CITIES Dashboard Logo" alt="CITIES Dashboard Logo" />
                    </a>
                  </Paper>
                  <Box sx={{ display: 'inline-block', mr: 2 }}>
                    <Link to="/">
                      <Typography
                        className={
                          underlineLink === 'home' ? 'navLink active' : 'navLink'
                        }
                        variant="body1"
                        sx={{ fontWeight: 'medium' }}
                        color="text.secondary"
                      >
                        {underlineLink === 'home' ? (
                          'HOME'
                        ) : (
                          <div>
                            <IoReturnDownBack
                              style={{ verticalAlign: 'middle' }}
                            />
                            <span> BACK TO HOME</span>
                          </div>
                        )}
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ display: 'inline-block', mr: 2 }}>
                    <Link to="#at-a-glance">
                      <Typography
                        className={
                          underlineLink === 'at-a-glance' ? 'navLink active' : 'navLink'
                        }
                        variant="body1"
                        sx={{ fontWeight: 'medium' }}
                        color="text.secondary"
                      >
                        AT A GLANCE
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ display: 'inline-block', mr: 2 }}>
                    <Link to="#about">
                      <Typography
                        className={
                          underlineLink === 'about' ? 'navLink active' : 'navLink'
                        }
                        variant="body1"
                        sx={{ fontWeight: 'medium' }}
                        color="text.secondary"
                      >
                        ABOUT
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ display: 'inline-block', mr: 2 }}>
                    <Link to="#join-us">
                      <Typography
                        className={
                          underlineLink === 'join-us' ? 'navLink active' : 'navLink'
                        }
                        variant="body1"
                        sx={{ fontWeight: 'medium' }}
                        color="text.secondary"
                      >
                        JOIN US
                      </Typography>
                    </Link>
                  </Box>
                </Stack>

                <StyledFormControl variant="filled" size="small">
                  <InputLabel id="select-filled-label">THEME</InputLabel>
                  <Select
                    labelId="select-filled-label"
                    id="select-filled"
                    value={themeValue}
                    onChange={handleChange}
                  >
                    <StyledMenuItem value={ThemePreferences.system}>
                      <Typography color="text.primary">
                        <Contrast />
                        System
                      </Typography>
                    </StyledMenuItem>

                    <StyledMenuItem value={ThemePreferences.light}>
                      <Typography color="text.primary">
                        <LightMode />
                        Light
                      </Typography>
                    </StyledMenuItem>

                    <StyledMenuItem value={ThemePreferences.dark}>
                      <Typography color="text.primary">
                        <DarkMode />
                        Dark
                      </Typography>
                    </StyledMenuItem>
                  </Select>
                </StyledFormControl>
              </Stack>
            </Container>
          </Toolbar>
        </StyledAppBar>
      </HideOnScroll >

      {/* From MUI's documentation: 
      When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here is how to fix:
      You can render a second <Toolbar /> component: */}
      <Toolbar id="back-to-top-anchor" sx={{ backgroundColor: "customAlternateBackground", height: "4rem" }} />

      <Box width="100%" sx={{ pt: 2, pb: 3, backgroundColor: "customAlternateBackground" }}>
        <Container >
          <Box>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontWeight: 'medium' }}
            >
              CITIES DASHBOARD
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {parse(jsonData.siteDescription)}
            </Typography>
          </Box>
        </Container>
      </Box>

      <ScrollTop {...props}>
        <Fab aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

    </>

  );
}
