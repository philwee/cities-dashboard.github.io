import './About.css';
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillFacebook,
  AiFillMail
} from 'react-icons/ai';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import citiesLogo from '../../cities-logo.png';

function SocialHandle({ url, icon }) {
  return (
    <a className="iconLink" href={url} target="_blank" rel="noreferrer">
      {icon}
    </a>
  );
}

export default function About() {
  return (
    <Container maxWidth="md" sx={{ p: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Container maxWidth="xs" sx={{ pb: 4 }}>
          <Grid justifyContent="center" container>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <img style={{ maxWidth: '100%' }} src={citiesLogo} />
            </Grid>
            <Grid justifyContent="center" container spacing={{ xs: 3, md: 4 }}>
              <Grid item xs={2}>
                <SocialHandle url="https://twitter.com/cities_nyuad/" icon={<AiFillTwitterCircle size="100%" />} />
              </Grid>
              <Grid item xs={2}>
                <SocialHandle url="https://www.linkedin.com/company/center-for-interacting-urban-networks/" icon={<AiFillLinkedin size="100%" />} />
              </Grid>
              <Grid item xs={2}>
                <SocialHandle url="https://www.facebook.com/nyuad.cities/" icon={<AiFillFacebook size="100%" />} />
              </Grid>
              <Grid item xs={2}>
                <SocialHandle url="https://www.instagram.com/cities.nyuad/" icon={<AiFillInstagram size="100%" />} />
              </Grid>
              <Grid item xs={2}>
                <SocialHandle url="mailto:nyuad.cities@nyu.edu" icon={<AiFillMail size="100%" />} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          THE CENTER
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          The NYUAD&apos;s Center for Ineracting Urban Networks (CITIES) is an interdisciplinary research center dedicated to advance urban science and promote cutting-edge research that is translated into practical, real-world solutions for the benefit of society. Our ultimate goal is to foster sustainable, resilient, and equitable cities.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          THE PROJECT
        </Typography>
        <Typography variant="body1" gutterBottom>
          This dashboard is an ongoing initiative funded by CITIES to provide the NYU Abu Dhabi's community with data related to sustainability and well-being on campus. As is the case with the current environmental and lifestyle changes worldwide and specifically within the growing community at NYU Abu Dhabi, carefully-crafted data visualizations encourage people to explore the scopes,  nuances, and personal responsibilities within such topics, which results in positive awareness and behavior changes.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The CITIES dashboard is currently on its first public-release iteration. Any feedback on the existing datasets and visualizations and/or suggestions for future datasets is particularly welcomed. Feel free to reach out to us through our official channels listed on this website.
        </Typography>
      </Paper>
    </Container>
  );
}
