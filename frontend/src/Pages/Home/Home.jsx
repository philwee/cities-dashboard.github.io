// disable eslint for this file
/* eslint-disable */

// import libraries
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { LinkContext } from '../../ContextProviders/LinkContext';
import { DataContext } from '../../ContextProviders/DataContext';

import { Box, Grid, Typography, Container, Card, CardContent, CardMedia, CardActionArea, Divider, Div } from '@mui/material';

import UppercaseTitle from '../../Components/UppercaseTitle';

// import AtAGlance from './AtAGlance';
import About from './About';
import GetInTouch from './GetInTouch';

import jsonData from '../../home_data.json';

import * as Tracking from '../../Utils/Tracking';

const Home = ({ themePreference, title }) => {
  // Update the page's title
  useEffect(() => document.title = title, []);

  // useState for home page data
  const [_, setCurrentPage, __, setChartsTitlesList] = useContext(LinkContext);
  const [homeData] = useContext(DataContext);

  // set underline link to home
  useEffect(() => {
    setCurrentPage('home');
    setChartsTitlesList([]);
  }, []);

  return (
    <Box width="100%">
      <Box>
        <Container sx={{ pt: 3, pb: 4 }}>
          <UppercaseTitle text={'all projects'} />

          { // Temporary hide AtAGlance until we have higher analytics
          /* <Box sx={{ pb: 3 }} >
            <AtAGlance
              numberOfActiveDataset={
                (homeData.reduce((count, element) => {
                  return element.isActive ? count + 1 : count;
                }, 0))
              }
            />
          </Box> */}

          <Grid container spacing={3} sx={{ justifyContent: { sm: "center", md: "start" } }} >
            {homeData.map((element, index) => (
              <Grid key={index} item xs={12} sm={9} md={6} lg={4} >
                <Card elevation={2}>
                  <CardActionArea
                    component={Link}
                    to={`/project/${element.id}`}
                    disabled={!element.isActive}
                    onClick={() => {
                      Tracking.sendEventAnalytics(Tracking.Events.internalNavigation,
                        {
                          destination_id: `/project/${element.id}`,
                          destination_label: element.id,
                          origin_id: "home"
                        });
                    }}
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

      <Box id={jsonData.about.id} sx={{ pt: 3, pb: 4 }} >
        <About />
      </Box>

      <Box id={jsonData.getInTouch.id} sx={{ pt: 3, pb: 4 }}>
        <GetInTouch themePreference={themePreference} />
      </Box>
    </Box >
  );
};

export default Home;
