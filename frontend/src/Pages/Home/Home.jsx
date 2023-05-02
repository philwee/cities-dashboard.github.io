// disable eslint for this file
/* eslint-disable */
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { DataContext } from '../../ContextProviders/DataContext';

import { Box, Grid, Typography, Container, Card, CardContent, CardMedia, CardActionArea, Divider, Paper } from '@mui/material';

import UppercaseTitle from '../../Components/UppercaseTitle';

import AtAGlance from './AtAGlance';
import About from './About';
import JoinUs from './JoinUs';

const Home = ({ themePreference }) => {
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
          <UppercaseTitle text={'all projects'} />
          <Grid container spacing={4} >
            {homeData.map((element, index) => (
              <Grid key={index} item xs={12} sm={4}>
                <Card elevation={2}>
                  <CardActionArea
                    component={Link}
                    to={`/project/${element.id}`}
                    disabled={element.isActive}
                  >
                    <Box className={themePreference ? 'dark-mode' : ''}>
                      <CardMedia
                        className="noPointerEvent"
                        children={element.graph}
                        height={'auto'}
                        sx={{ aspectRatio: '4/3' }}
                      />
                    </Box>

                    <Divider />
                    <CardContent>
                      <Typography
                        variant="body1"
                        component="div"
                        color="text.primary"
                        fontWeight="500"
                      >
                        {element.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
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

      <Box id="at-a-glance" sx={{ pt: 4, pb: 4 }} backgroundColor="customAlternateBackground">
        <AtAGlance
          numberOfActiveDataset={
            (homeData.reduce((count, element) => {
              return element.isActive ? count + 1 : count;
            }, 0))
          }
        />
      </Box>

      <Box id="about" sx={{ pt: 4 }}>
        <About />
      </Box>

      <Box id="join-us" sx={{ pt: 4, pb: 4 }}>
        <JoinUs />
      </Box>
    </Box>
  );
};

export default Home;
