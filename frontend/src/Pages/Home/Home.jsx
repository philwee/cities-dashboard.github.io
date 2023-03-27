// disable eslint for this file
/* eslint-disable */
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { DataContext } from '../../ContextProviders/DataContext';

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

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';

const Home = ({ prefersDarkMode }) => {
  // useState for home page data
  const [_, setUnderlineLink] = useContext(LinkContext);
  const [homeData] = useContext(DataContext);

  // set underline link to home
  useEffect(() => {
    setUnderlineLink('home');
  }, []);

  return (
    <Container sx={{ pt: 4, pb: 4 }}>
      <Grid container direction="row" spacing={4} sx={{ pt: 4, pb: 4 }}>
        <Grid item xs={12}>
          <UnderlinedTitle text={'join us!'} />
        </Grid>

        <Grid item md={3} xs={12} margin="auto">
          <Container>
            <Grid
              container
              direction="row"
              spacing={4}
              sx={{
                pt: 2,
                pb: 2,
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {jsonData.statistics.map((item, index) => (
                <Grid key={index} item md={12}>
                  <Typography
                    variant="h2"
                    color="primary.main"
                    sx={{ marginBottom: '-0.5rem', fontWeight: 'medium' }}
                  >
                    {item.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    textTransform="uppercase"
                  >
                    {item.text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>

        <Grid item md={9}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              {parse(jsonData.banner)}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <UnderlinedTitle text={'all projects'} />
        </Grid>

        {homeData.map((element, index) => (
          <Grid key={index} item xs={12} sm={12} md={6}>
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
};

export default Home;
