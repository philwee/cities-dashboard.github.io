import { useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
      <Box sx={{ backgroundColor: 'primary.light', height: '10vh' }} />
      <Container>
        <Paper elevation={4} sx={{ width: '12vh', height: '12vh', ml: 0, mt: '-6vh', mb: 3 }}>
          <img style={{ width: '100%' }} src={citiesLogo} />
        </Paper>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'medium' }}>CITIES DASHBOARD</Typography>
          <Typography variant="body1" gutterBottom >Spearheading sustainability and well-being data visualization at NYU Abu Dhabi</Typography>
        </Box>
        <Container>
          <Grid container>
            {LinkChange ? (
              <Link to="/">
                <Typography className={underlineItem === 1 ? 'navLink active' : 'navLink'}
                  onClick={() => underlineFunc(1)} variant="body1" sx={{ fontWeight: 'medium' }}>HOME</Typography>
              </Link>
            ) : (
              <Link to="/" onClick={changeLinkContent}>
                <Typography onClick={() => underlineFunc(1)} variant="body1" sx={{ fontWeight: 'medium' }}>HOME</Typography>
              </Link>
            )}
            <Link to="/about">
              <Typography className={underlineItem === 2 ? 'navLink active' : 'navLink'}
                onClick={() => underlineFunc(2)} variant="body1" sx={{ fontWeight: 'medium' }}>ABOUT</Typography>
            </Link>
          </Grid>
        </Container>
      </Container>
    </Paper>
  );
}
