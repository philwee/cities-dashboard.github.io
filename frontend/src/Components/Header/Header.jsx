// disable eslint for this file
/* eslint-disable */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Container, Paper } from '@mui/material';

import citiesLogo from '../../cities-logo.png';

import './Header.css';

export default function Header({ LinkChange, setLinkChange }) {
  // for underlining menu items
  const [underlineItem, setUnderlineItem] = useState(1);

  const underlineFunc = (index) => {
    setUnderlineItem(index);
  };

  // for link change
  const changeLinkContent = () => {
    setLinkChange(true);
  };

  return (
    <Paper elevation={0} square>
      <Box sx={{ backgroundColor: 'primary.main', height: '10vh' }} />
      <Container sx={{ pb: 3 }}>
        <Paper
          elevation={4}
          sx={{ width: '12vh', height: '12vh', ml: 0, mt: '-6vh', mb: 3 }}
        >
          <img style={{ width: '100%' }} src={citiesLogo} />
        </Paper>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: 'medium' }}>
            CITIES DASHBOARD
          </Typography>
          <Typography variant="body1">
            Spearheading sustainability and well-being data visualization at NYU
            Abu Dhabi
          </Typography>
        </Box>

        <Box sx={{ display: 'inline-block', mr: 2 }}>
          {LinkChange ? (
            <Link to="/">
              <Typography
                className={underlineItem === 1 ? 'navLink active' : 'navLink'}
                onClick={() => underlineFunc(1)}
                variant="body1"
                sx={{ fontWeight: 'medium' }}
              >
                HOME
              </Typography>
            </Link>
          ) : (
            <Link to="/" onClick={changeLinkContent}>
              <Typography
                onClick={() => underlineFunc(1)}
                variant="body1"
                sx={{ fontWeight: 'medium' }}
              >
                HOME
              </Typography>
            </Link>
          )}
        </Box>
        <Box sx={{ display: 'inline-block', mr: 2 }}>
          <Link to="/about">
            <Typography
              className={underlineItem === 2 ? 'navLink active' : 'navLink'}
              onClick={() => underlineFunc(2)}
              variant="body1"
              sx={{ fontWeight: 'medium' }}
            >
              ABOUT
            </Typography>
          </Link>
        </Box>
      </Container>
    </Paper>
  );
}
