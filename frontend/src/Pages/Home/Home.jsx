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

import UppercasedTitle from '../../Components/UppercasedTitle';

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
    <Box width="100%">
      <Box>
        <Container sx={{ pt: 4, pb: 4 }}>
          <UppercasedTitle text={'join us!'} />
          <Grid container spacing={4}>
            {jsonData.banners.map((item, index) => (
              <Grid key={index} item md={6} xs={12}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {parse(item)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box backgroundColor='customAlternateBackground'>
        <Container sx={{ pt: 4, pb: 4 }}>
          <UppercasedTitle text={'at a glance'} />

          <Grid container direction="row" spacing={4} sx={{
            textAlign: 'center',
            justifyContent: 'center',
          }}
          >
            {jsonData.statistics.map((item, index) => (
              <Grid key={index} item md={3} sm={4} xs={12}>
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
      </Box>

      <Box>
        <Container sx={{ pt: 4, pb: 4 }}>
          <UppercasedTitle text={'all projects'} />
          <Grid container spacing={4} justifyContent='center'>
            {homeData.map((element, index) => (
              <Grid key={index} item xs={12} sm={9} md={6}>
                <Card elevation={2}>
                  <CardActionArea
                    component={Link}
                    to={`/project/${element.id}`}
                    disabled={element.isEmpty}
                  >
                    <Box className={prefersDarkMode ? 'dark-mode' : ''}>
                      <CardMedia
                        className='noPointerEvent'
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

      </Box>
    </Box>
  );
};

export default Home;
