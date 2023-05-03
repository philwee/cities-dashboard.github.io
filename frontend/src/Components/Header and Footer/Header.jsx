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

const innerHeight = window.innerHeight;

const toolBarHeightInRem = 4;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
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
    marginRight: "0.25rem",
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

const StyledNavLink = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  marginRight: theme.spacing(2),
  cursor: "pointer",
  textDecoration: "none",
  "& :hover, & .active": {
    textDecoration: `underline 2px ${theme.palette.primary.contrastText}`,
    opacity: 1,
    textUnderlineOffset: "4px"
  }
}));

const NavLinkBehavior = {
  toNewPage: "toNewPage",
  scrollTo: "scrollTo"
}

const BackToHome = () => {
  return (
    <>
      <IoReturnDownBack
        style={{ verticalAlign: 'middle' }}
      />
      <span> Back to Home</span>
    </>
  );
}

function NavLink(props) {
  const { behavior, underlineLink, to, scrollToSectionID } = props;

  const scrollToSection = (scrollToSectionID) => {
    const section = document.getElementById(scrollToSectionID);
    if (section) {
      section.scrollIntoView({ behavior: 'instant' });
    }
  }

  const transformHyphenString = (str) => {
    const words = str.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedString = capitalizedWords.join(' ');
    return capitalizedString;
  }

  return (
    <StyledNavLink>
      {behavior === NavLinkBehavior.toNewPage &&
        <Link to={to}>
          <Typography
            className={
              underlineLink === to ? 'navLink active' : 'navLink'
            }
            variant="caption"
            fontWeight='medium'
            color="primary.contrastText"
            sx={{ opacity: 0.7 }}
          >
            {to === "/" ? <BackToHome /> : transformHyphenString(to)}
          </Typography>
        </Link>
      }
      {behavior === NavLinkBehavior.scrollTo &&
        <Box onClick={() => scrollToSectionID && scrollToSection(scrollToSectionID)}>
          <Typography
            variant="caption"
            fontWeight='medium'
            color="primary.contrastText"
            sx={{ opacity: 0.7 }}
          >
            {transformHyphenString(scrollToSectionID)}
          </Typography>
        </Box>
      }
    </StyledNavLink>
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

  // trigger for hiding/showing the AppBar
  const triggerHideAppBar = useScrollTrigger({
    target: window,
    threshold: 100
  });

  return (
    <>
      <Slide appear={false} direction="down" in={!triggerHideAppBar}>
        <StyledAppBar enableColorOnDark>
          <Toolbar sx={{ backgroundColor: 'primary', height: `${toolBarHeightInRem}rem` }}>
            <Container sx={{ height: "100%" }} >
              <Stack direction="row" justifyContent='space-between' alignItems='center' height="100%">
                <Stack direction="row" alignItems='center' height="100%" spacing={2}>
                  <Paper
                    elevation={4}
                    sx={{
                      height: `${toolBarHeightInRem * 1.25}rem`,
                      mt: `${toolBarHeightInRem * 0.7}rem`,
                      opacity: triggerHideAppBar ? 0 : 1,
                      transition: '0.2s ease-in-out', '&:hover': { transform: 'scale(1.1)' },
                    }}
                  >
                    <Link to="/">
                      <img style={{
                        height: "100%", width: "auto", borderRadius: "0.5rem"
                      }} src={citiesLogo} title="CITIES Dashboard Logo" alt="CITIES Dashboard Logo" />
                    </Link>
                  </Paper>
                  <Stack direction="column">
                    <Typography
                      sx={{ fontWeight: 'medium' }}
                      color="primary.contrastText"
                    >
                      {"PLACEHOLDER FOR PAGE NAME"}
                    </Typography>
                    <Stack direction="row">
                      {
                        // If the current page is homepage, then display these links
                        underlineLink === "home" ? <>
                          <NavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="at-a-glance" />
                          <NavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="about" />
                        </> :
                          // For the rest, display link to return to homepage
                          <NavLink behavior={NavLinkBehavior.toNewPage} to="/" />
                      }
                      <NavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="join-us" />

                    </Stack>
                  </Stack>


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
      </Slide >

      {/* From MUI's documentation: 
      When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here is how to fix:
      You can render a second <Toolbar /> component: */}
      <Toolbar id="back-to-top-anchor" sx={{ backgroundColor: "customAlternateBackground", height: `${toolBarHeightInRem * 1.5}rem` }} />

      <Box width="100%" sx={{ pt: 2, pb: 3, backgroundColor: "customAlternateBackground" }}>
        <Container >
          <Box>
            <Typography
              variant="h3"
              color="text.primary"
              fontWeight='medium'
              pb={1}

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
