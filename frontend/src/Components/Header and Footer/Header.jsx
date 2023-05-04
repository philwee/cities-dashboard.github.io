// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { Grid, Box, Typography, Container, Paper, AppBar, Toolbar, useScrollTrigger, Fab, Fade, Slide, Stack, Drawer, Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoReturnDownBack } from 'react-icons/io5';

import { LightMode, DarkMode, Contrast } from '@mui/icons-material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

import ThemePreferences from '../../ThemePreferences';

import citiesLogo from '../../cities-logo.png';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';

const innerHeight = window.innerHeight;

const toolBarHeightInRem = 4;

const showInMobile = { display: { xs: "block", lg: "none" } };
const showInLandscape = { display: { xs: "none", lg: "block" } };

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
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1)
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
  "& .MuiTypography-root": {
    color: { xs: theme.palette.text.primary, lg: theme.palette.primary.contrastText },
    opacity: 0.75,
    fontWeight: "500"
  },
  "& .underlineOnHover, & a": {
    cursor: "pointer",
    textDecoration: "none"
  },
  "& .underlineOnHover:hover": {
    textDecoration: `underline 2px ${theme.palette.primary.contrastText}`,
    textUnderlineOffset: "4px",
    opacity: 1,
  },
}));

const NavLinkBehavior = {
  doNothingForNow: "doNothingForNow",
  toNewPage: "toNewPage",
  scrollTo: "scrollTo"
}

const BackToHome = () => {
  return (
    <>
      <IoReturnDownBack
        style={{ verticalAlign: 'middle' }}
      />
      Back to Home
    </>
  );
}

const NavLink = (props) => {
  const { behavior, to, scrollToSectionID, text, currentPage } = props;

  const scrollToSection = (scrollToSectionID) => {
    const section = document.getElementById(scrollToSectionID);
    if (section) {
      section.scrollIntoView({ behavior: 'instant' });
    }
  }

  const capitalizePhrase = (str) => {
    const words = str.split(/[\s-]+/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedString = capitalizedWords.join(' ');
    return capitalizedString;
  }

  let placeholderDOM;

  switch (behavior) {
    case NavLinkBehavior.doNothingForNow:
      placeholderDOM = (
        <Typography variant="body1">
          {capitalizePhrase(text)}
        </Typography>
      );
      break;

    case NavLinkBehavior.toNewPage:
      placeholderDOM = (
        <Link to={to}>
          <Typography
            className="underlineOnHover"
            variant="body1"
            color={{ xs: "text.primary", lg: "primary.contrastText" }} // need to use color here or else it won't override <a> color scheme
          >
            {to === "/" ? <BackToHome /> : capitalizePhrase(to)}
          </Typography>
        </Link >
      );
      break;


    case NavLinkBehavior.scrollTo:
      placeholderDOM = (
        <Box onClick={() => scrollToSectionID && scrollToSection(scrollToSectionID)}>
          <Typography
            className="underlineOnHover"
            variant="body1"
          >
            {capitalizePhrase(scrollToSectionID)}
          </Typography>
        </Box>
      );
      break;

    default:
      break;
  }

  return (
    <StyledNavLink>
      {placeholderDOM}
    </StyledNavLink>
  );
}

const NavBar = (props) => {
  const { currentPage } = props;

  console.log(currentPage)

  return (
    <Grid container spacing={1}>
      {
        // If the current page is homepage, then display ABOUT link
        // If not homepage (implies in project page at this point), display Back to Home link and the name of this project
        currentPage === "home" ?
          <Grid item xs={12} lg="auto">
            <NavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="about" />
          </Grid>
          :
          <>
            <Grid item xs={12} lg="auto">
              <NavLink behavior={NavLinkBehavior.toNewPage} to="/" />
            </Grid>

            <Grid item xs={12} lg="auto">
              <NavLink behavior={NavLinkBehavior.doNothingForNow} text={`Charts: ${currentPage}`} />
            </Grid>
          </>
      }
      <Grid item xs={12} lg="auto">
        <NavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="join-us" />
      </Grid>
    </Grid>
  );
}

export default function Header(props) {
  const { setThemePreference } = props;

  const [currentPage] = useContext(LinkContext);

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
                  <Box sx={showInLandscape}>
                    <NavBar currentPage={currentPage} />
                  </Box>

                  <IconButton
                    color="inherit"
                    aria-label="open mobile menu drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={showInMobile}
                  >
                    <MenuIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    aria-label="open setting drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={showInLandscape}
                  >
                    <SettingsIcon />
                  </IconButton>
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
                <NavBar currentPage={currentPage} />
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
      </Box>

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

const ThemeSelector = (props) => {
  const { isFullWidth, setThemePreference } = props;
  const [themeValue, setThemeValue] = useState(localStorage.getItem('theme') || ThemePreferences.system);

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
    switch (themeValue) {
      case ThemePreferences.dark:
        setThemePreference(ThemePreferences.dark);
        break;

      case ThemePreferences.light:
        setThemePreference(ThemePreferences.light);
        break;

      case ThemePreferences.system:
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        darkThemeMq.matches ? setThemePreference(ThemePreferences.dark) : setThemePreference(ThemePreferences.light);
        darkThemeMq.addEventListener('change', themeChangeHandler);

        return () => {
          darkThemeMq.removeEventListener('change', themeChangeHandler);
        };

      default:
        break;
    }
  }, [themeValue]);

  return (
    <StyledFormControl sx={{ display: isFullWidth ? "grid" : "" }} variant="filled" size="small">
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
  );
};

const CITIESlogoLinkToHome = () => {
  return (<Link to="/">
    <img style={{
      height: "100%", width: "auto", borderRadius: "0.5rem"
    }} src={citiesLogo} title="CITIES Dashboard Logo" alt="CITIES Dashboard Logo" />
  </Link>);
}