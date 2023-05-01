// disable eslint for this file
/* eslint-disable */
import { useEffect, useContext } from 'react';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { Facebook, LinkedIn, Instagram, Twitter } from '@mui/icons-material/';
import { Grid, Typography, Container, Paper } from '@mui/material';

import CustomLink from '../../Components/CustomLink';
import UppercaseTitle from '../../Components/UppercaseTitle';

import citiesLogo from '../../cities-logo.png';

export function SocialHandleGrid() {
  return (
    <Container>
      <Grid justifyContent='center' alignItems='center' container>
        <Grid item xs={2} textAlign={'center'}>
          <CustomLink href='https://twitter.com/cities_nyuad/' text={<Twitter sx={{ fontSize: '2rem' }} />} />
        </Grid>
        <Grid item xs={2} textAlign={'center'}>
          <CustomLink href='https://www.linkedin.com/company/center-for-interacting-urban-networks/' text={<LinkedIn sx={{ fontSize: '2rem' }} />} />
        </Grid>
        <Grid item xs={2} textAlign={'center'}>
          <CustomLink href='https://www.facebook.com/nyuad.cities/' text={<Facebook sx={{ fontSize: '2rem' }} />} />
        </Grid>
        <Grid item xs={2} textAlign={'center'}>
          <CustomLink href='https://www.instagram.com/cities.nyuad/' text={<Instagram sx={{ fontSize: '2rem' }} />} />
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <CustomLink href="mailto:nyuad.cities@nyu.edu" text="nyuad.cities@nyu.edu" />
        </Grid>
      </Grid>
    </Container>
  );
}
const About = () => {
  const [_, setUnderlineLink] = useContext(LinkContext);

  useEffect(() => {
    setUnderlineLink('about');
  });

  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container alignItems={'center'} spacing={4}>
          <Grid item md={4}>
            <img style={{ maxWidth: '100%', borderRadius: '1rem' }} src={citiesLogo} />
            <SocialHandleGrid />
          </Grid>

          <Grid item md={8} >
            <UppercaseTitle text="the center" />
            <Typography
              variant="body1"
              gutterBottom
              sx={{ mt: -2, mb: 5 }}
              color="text.secondary"
            >
              The NYUAD&apos;s Center for Interacting Urban Networks (CITIES) is an
              interdisciplinary research center dedicated to advance urban science
              and promote cutting-edge research that is translated into practical,
              real-world solutions for the benefit of society. Our ultimate goal is
              to foster sustainable, resilient, and equitable cities. To test and showcase cutting-edge applications of its research in real life, CITIES uses the NYUAD campus as a field lab.
            </Typography>
            <UppercaseTitle text="the project" />

            <Typography sx={{ mt: -2 }}
              variant="body1" gutterBottom color="text.secondary">
              CITIES collects different types of data from the NYUAD campus and display them on this dashboard. CITIES dashboard is an ongoing project that acts as a data repository to be used by NYUAD researchers, students, and campus stakeholders as a handy tool for data visualization to inform the NYUAD community and promote more sustainable behaviors, and as a platform to support campus stakeholders to improve their operations and meet their Key Performance Indicators (KPIs).
              <br /><br />
              The CITIES dashboard is currently on its first public-release
              iteration. Any feedback on the existing datasets and visualizations
              and/or suggestions for future datasets is particularly welcomed. Feel
              free to reach out to us through our official channels listed on this
              website.
            </Typography>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
};

export default About;
