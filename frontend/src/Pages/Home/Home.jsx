import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Box, Grid, Stack, Typography, Container, Card, CardContent, CardMedia, CardActionArea, Divider, Tooltip } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import CommentIcon from '@mui/icons-material/Comment';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { DataContext } from '../../ContextProviders/HomePageContext';
import { CommentCountsContext } from '../../ContextProviders/CommentCountsContext';

import UppercaseTitle from '../../Components/UppercaseTitle';
import FullWidthBox from '../../Components/FullWidthBox';

// import AtAGlance from './AtAGlance';
import About from './About';
import GetInTouch from './GetInTouch';

import jsonData from '../../section_data.json';

import * as Tracking from '../../Utils/Tracking';

function Home({ themePreference, title }) {
  // Update the page's title
  useEffect(() => {
    document.title = title;
  }, [title]);

  // useState for home page data
  // eslint-disable-next-line no-unused-vars
  const [_, setCurrentPage, __, setChartsTitlesList] = useContext(LinkContext);
  const [homeData] = useContext(DataContext);
  const [commentCounts] = useContext(CommentCountsContext);

  // set underline link to home
  useEffect(() => {
    setCurrentPage('home');
    setChartsTitlesList([]);
  }, [setCurrentPage, setChartsTitlesList]);

  return (
    <Box width="100%">
      <FullWidthBox>
        <Container sx={{ pt: 3, pb: 4 }}>
          <UppercaseTitle text="all projects" />

          { // Temporary hide AtAGlance until we have higher analytics
          /* <Box sx={{ pb: 3 }} >
            <AtAGlance
              numberOfActiveDataset={
                (homeData.reduce((count, project) => {
                  return project.isActive ? count + 1 : count;
                }, 0))
              }
            />
          </Box> */}

          <Grid container spacing={3} sx={{ justifyContent: { sm: 'center', md: 'start' } }}>
            {Object.entries(homeData).map(([key, project], index) => (
              <Grid key={index} item xs={12} sm={9} md={6} lg={4}>
                <Card elevation={2}>
                  <CardActionArea
                    component={Link}
                    to={`/project/${project.id}`}
                    disabled={!project.isActive}
                    onClick={() => {
                      Tracking.sendEventAnalytics(
                        Tracking.Events.internalNavigation,
                        {
                          destination_id: `/project/${project.id}`,
                          destination_label: project.id,
                          origin_id: 'home'
                        }
                      );
                    }}
                  >
                    <Box className={themePreference ? 'dark-mode' : ''}>
                      <CardMedia
                        className="noPointerEvent"
                        height="auto"
                        sx={{ aspectRatio: '4/3' }}
                      >
                        {project.graph}
                      </CardMedia>
                    </Box>

                    <Divider />
                    <CardContent>
                      <Grid container justifyContent="space-between" alignItems="end">
                        <Grid item>
                          <Typography
                            variant="body1"
                            component="div"
                            color="text.primary"
                            fontWeight="500"
                          >
                            {project.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {project.owner}
                          </Typography>
                        </Grid>
                        {
                          project.isActive
                          && (
                          <Grid item>
                            <Stack direction="row" spacing={1.5}>
                              <Tooltip title="Number of Charts">
                                <Stack direction="row" spacing={0.2} alignItems="center">
                                  <BarChartIcon sx={{ fontSize: '0.75rem', color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {project.chartCounts}
                                  </Typography>
                                </Stack>
                              </Tooltip>
                              {(commentCounts[key] != null) && (
                              <Tooltip title="Number of Comments">
                                <Stack direction="row" spacing={0.2} alignItems="center">
                                  <CommentIcon sx={{ fontSize: '0.75rem', color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {commentCounts[key]}
                                  </Typography>
                                </Stack>
                              </Tooltip>
                              )}
                            </Stack>
                          </Grid>
                          )
                        }
                      </Grid>

                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FullWidthBox>

      <Divider />

      <FullWidthBox id={jsonData.about.id} sx={{ pt: 3, pb: 4 }}>
        <About />
      </FullWidthBox>

      <Divider />

      <FullWidthBox id={jsonData.getInTouch.id} sx={{ pt: 3, pb: 4 }}>
        <GetInTouch />
      </FullWidthBox>
    </Box>
  );
}

export default Home;
