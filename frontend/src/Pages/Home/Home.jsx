// disable eslint for this file
/* eslint-disable */
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { DataContext } from '../../ContextProviders/DataContext';
import { SocialHandle } from '../About/About';

import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Divider,
  Paper,
} from '@mui/material';

import UnderlinedTitle from '../../Components/UnderlinedTitle';

import jsonData from '../../home_data.json'

export default function Home({ prefersDarkMode }) {
  // useState for home page data
  const [_, setUnderlineLink] = useContext(LinkContext);
  const [homeData] = useContext(DataContext);

  useEffect(() => {
    setUnderlineLink('home');
  });

  return (
    <Container sx={{ pt: 4, pb: 4 }}>
      <Grid container direction="row" spacing={4} sx={{ pt: 4, pb: 4 }}>
        <Grid item xs={12}>
          <UnderlinedTitle text={'join us!'} />
        </Grid>

        <Grid item md={4} sm={9} xs={12} margin='auto'>
          <Container>
            <Grid container direction="row" spacing={2} sx={{ pt: 2, pb: 2 }}>
              {jsonData.statistics.map((item, index) => (
                <Grid key={index} item xs={6}>
                  <Typography variant='h2' color='primary.main' sx={{ marginBottom: '-0.5rem', fontWeight: 'medium' }}>
                    {item.number}
                  </Typography>
                  <Typography variant='h6' color='text.primary' textTransform='uppercase'>
                    {item.text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>

        <Grid item md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              <b>The CITIES Dashboard</b> serves as a data repository for community-wide actions on sustainability and well-being. This dashboard is created by and for the community of NYU Abu Dhabi, students, researchers, faculty, staff, and NYUAD partners alike. We highly encourage anyone interested to contribute to this <b>open-source</b> project by sharing new datasets, analyzing existing datasets, proposing projects, and promoting the dashboard to a wider audience. Ultimately, we envision the CITIES Dashboard as a handy tool to support research, education, and community outreach within the NYU Abu Dhabi campus and a precious instrument to support NYUAD partners in meeting their KPI (e.g., reducing food waste).
              <br /><br />
              <b>Reach out</b> to us at&nbsp;
              <SocialHandle url="mailto:nyuad.cities@nyu.edu"
                icon={
                  <Typography sx={{ display: "inline", textDecoration: "underline" }}>
                    nyuad.cities@nyu.edu
                  </Typography>
                } />
              &nbsp;to share your ideas and get involved. In the meantime, explore existing datasets with interactive data visualizations designed by CITIES' students, research fellows, and staff in collaboration with CITIES partners. Stay tuned as more datasets will be available soon.
              <br /><br />
              <b>We thank</b> Royal Catering and NYUAD Athletics for supporting this project with their data.
            </Typography>
          </Paper>
        </Grid>

        

        <Grid item xs={12}>
          <UnderlinedTitle text={'all projects'} />
        </Grid>

        {homeData.map((element, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card elevation={2}>
              <CardActionArea
                component={Link}
                to={`/project/${element.id}`}
                disabled={element.isEmpty}
              >
                <Box className={prefersDarkMode ? 'dark-mode' : ''}>
                  <CardMedia
                    children={element.graph}
                    height={'auto'}
                    sx={{ aspectRatio: '4/3' }}
                  />
                </Box>

                <Divider />
                <CardContent>
                  <Typography variant="h6" component="div" color="text.primary">
                    {element.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {element.owner}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
