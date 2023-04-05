// disable eslint for this file
/* eslint-disable */
import { Grid, Typography, Container, Box } from '@mui/material';


import { SocialHandleGrid } from '../../Pages/About/About';

function getYear() {
  const d = new Date();
  return d.getFullYear();
}

export default function Footer() {
  return (
      <Box width='100%' backgroundColor='customAlternateBackground'>
        <Grid container justify="center" align="center" sx={{ p: 5 }}>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold" color='text.primary' gutterBottom>
              Center for Interacting Urban Networks
              <br />- {getYear()} -
            </Typography>
            <Container maxWidth="xs">
              <SocialHandleGrid />
            </Container>
          </Grid>
        </Grid>
      </Box>
  );
}
