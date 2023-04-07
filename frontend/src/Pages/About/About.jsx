// disable eslint for this file
/* eslint-disable */
import { useEffect, useContext } from 'react';
import { LinkContext } from '../../ContextProviders/LinkContext';
import {Facebook, LinkedIn, Instagram, Twitter} from '@mui/icons-material/';
import { Grid, Typography, Container, Paper } from '@mui/material';

import CustomLink from '../../Components/CustomLink';
import UppercasedTitle from '../../Components/UppercasedTitle';

import citiesLogo from '../../cities-logo.png';

export function SocialHandleGrid() {
  return (
    <Container>
      <Grid justifyContent='center' alignItems='center' container>
        <Grid item xs={2}>
          <CustomLink href='https://twitter.com/cities_nyuad/' text={<Twitter sx={{fontSize: '2rem'}}/>} />
        </Grid>
        <Grid item xs={2}>
          <CustomLink href='https://www.linkedin.com/company/center-for-interacting-urban-networks/' text={<LinkedIn sx={{fontSize: '2rem'}}/>} />
        </Grid>
        <Grid item xs={2}>
          <CustomLink href='https://www.facebook.com/nyuad.cities/' text={<Facebook sx={{fontSize: '2rem'}}/>} />
        </Grid>
        <Grid item xs={2}>
          <CustomLink href='https://www.instagram.com/cities.nyuad/' text={<Instagram sx={{fontSize: '2rem'}}/>} />
        </Grid>
        <Grid item xs={6}>
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
    <Container maxWidth="md" sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Container maxWidth="xs" sx={{ pb: 4 }}>
          <Grid justifyContent="center" container>
            <Grid item xs={12} sx={{ textAlign: 'center', pb: 2 }}>
              <img style={{ maxWidth: '100%', borderRadius: '1rem' }} src={citiesLogo} />
            </Grid>
            <SocialHandleGrid />
          </Grid>
        </Container>
        <UppercasedTitle text="the center" />

        <Typography
          variant="body1"
          gutterBottom
          sx={{ mb: 5 }}
          color="text.secondary"
        >
          The NYUAD&apos;s Center for Interacting Urban Networks (CITIES) is an
          interdisciplinary research center dedicated to advance urban science
          and promote cutting-edge research that is translated into practical,
          real-world solutions for the benefit of society. Our ultimate goal is
          to foster sustainable, resilient, and equitable cities.
        </Typography>
        <UppercasedTitle text="the project" />

        <Typography variant="body1" gutterBottom color="text.secondary">
          This dashboard is an ongoing initiative funded by CITIES to provide
          the NYU Abu Dhabi's community with data related to sustainability and
          well-being on campus. As is the case with current environmental and
          lifestyle changes worldwide and within the growing NYU Abu Dhabi
          community, carefully-crafted data visualizations encourage people to
          explore the scopes, nuances, and personal responsibilities within such
          topics, which results in positive awareness and behavior changes.
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom color="text.secondary">
          The CITIES dashboard is currently on its first public-release
          iteration. Any feedback on the existing datasets and visualizations
          and/or suggestions for future datasets is particularly welcomed. Feel
          free to reach out to us through our official channels listed on this
          website.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
