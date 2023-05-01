// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { Box, Typography, Container, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoReturnDownBack } from 'react-icons/io5';

import { LightMode, DarkMode, Contrast } from '@mui/icons-material';

import ThemePreferences from '../../ThemePreferences';

import citiesLogo from '../../cities-logo.png';

import './Header.css';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  background: theme.palette.background.paper,
  "& .MuiFormLabel-root, .MuiInputBase-root .MuiTypography-root, svg": {
    fontSize: "0.75rem"
  },
  "& svg": {
    marginRight: theme.spacing(0.5),
    verticalAlign: "middle"
  },
  "& .MuiInputBase-root": {
    borderRadius: theme.shape.borderRadius * 2,
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


export default function Header({ themePreference, setThemePreference }) {
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
    <Box width="100%" sx={{ m: 0 }} backgroundColor="customAlternateBackground">
      <Box sx={{ backgroundColor: 'NYUpurple', display: 'flex', justifyContent: 'flex-end' }}>
        <StyledFormControl variant="filled" sx={{ m: 1, borderRadius: 2 }} size="small">
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
      </Box>
      <Container sx={{ pb: 3 }} backgroundColor="customAlternateBackground">
        <Paper
          elevation={4}
          sx={{
            width: '5rem',
            height: '5rem',
            ml: 0,
            mt: '-2.5rem',
            mb: 2,
            transition: '0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <a href="/">
            <img
              style={{ width: '100%', borderRadius: '0.5rem' }}
              src={citiesLogo}
              title="CITIES Dashboard"
              alt="CITIES Dashboard"
            />
          </a>
        </Paper>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h3"
            color="text.primary"
            sx={{ fontWeight: 'medium' }}
          >
            CITIES DASHBOARD
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A data repository and visualization on sustainability and well-being at NYU Abu Dhabi
          </Typography>
        </Box>

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
      </Container>
    </Box>
  );
}
