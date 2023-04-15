// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { Box, Typography, Container, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoReturnDownBack } from 'react-icons/io5';

import citiesLogo from '../../cities-logo.png';

import './Header.css';

export default function Header({ themePreference, setThemePreference }) {
  const [underlineLink] = useContext(LinkContext);
  const [themeValue, setThemeValue] = useState(themePreference);

  const handleChange = (event) => {
    localStorage.setItem('theme', event.target.value);
    setThemeValue(event.target.value);
  };

  const themeChangeHandler = ({ matches }) => {
    if (matches) {
      setThemePreference('Dark');
    } else {
      setThemePreference('Light');
    }
  };

  useEffect(() => {
    if (themeValue === 'Dark') {
      setThemePreference('Dark');
    } else if (themeValue === 'Light') {
      setThemePreference('Light');
    } else if (themeValue === 'System') {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkThemeMq.matches) {
        setThemePreference('Dark');
      } else {
        setThemePreference('Light');
      }
      darkThemeMq.addEventListener('change', themeChangeHandler);
      return () => {
        darkThemeMq.removeEventListener('change', themeChangeHandler);
      };
    }
  }, [themeValue]);

  return (
    <Box width="100%" sx={{ m: 0 }} backgroundColor="customAlternateBackground">
      <Box sx={{ backgroundColor: 'NYUpurple', height: '10vh' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControl variant="filled" sx={{ m: 2, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Appearance
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={themeValue}
              onChange={handleChange}
            >
              <MenuItem value={'System'}>System</MenuItem>
              <MenuItem value={'Dark'}>Dark</MenuItem>
              <MenuItem value={'Light'}>Light</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      <Container sx={{ pb: 3 }} backgroundColor="customAlternateBackground">
        <Paper
          elevation={4}
          sx={{
            width: '12vh',
            height: '12vh',
            ml: 0,
            mt: '-6vh',
            mb: 3,
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
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h2"
            color="text.primary"
            sx={{ fontWeight: 'medium' }}
          >
            CITIES DASHBOARD
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Spearheading sustainability and well-being data visualization at NYU
            Abu Dhabi
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
                    size={17}
                    style={{ verticalAlign: 'middle' }}
                  />
                  <span> BACK TO HOME</span>
                </div>
              )}
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'inline-block', mr: 2 }}>
          <Link to="/about">
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
      </Container>
    </Box>
  );
}
