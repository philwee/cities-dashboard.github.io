// disable eslint for this file
/* eslint-disable */
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';

import { Box, Typography, Container, Paper } from '@mui/material';

import citiesLogo from '../../cities-logo.png';

import './Header.css';

export default function Header() {
  const [underlineLink] = useContext(LinkContext);

  return (
    <Paper elevation={0} square sx={{m: 0}}>
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
              HOME
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
    </Paper>
  );
}
