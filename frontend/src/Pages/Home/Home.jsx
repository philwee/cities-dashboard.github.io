// disable eslint for this file
/* eslint-disable */

// import libraries
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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
import parse from 'html-react-parser';

// import components
import { LinkContext } from '../../ContextProviders/LinkContext';
import { DataContext } from '../../ContextProviders/DataContext';
import UppercaseTitle from '../../Components/UppercaseTitle';

// statistics data for home page
import jsonData from '../../home_data.json';

const Home = ({ themePreference }) => {
  // state to set underline link in header
  const [_, setUnderlineLink] = useContext(LinkContext);

  // state to get data from context
  const [homeData] = useContext(DataContext);

  // set underline link to home
  useEffect(() => {
    setUnderlineLink('home');
  }, []);

  return (
    <Box width="100%">
      <Box>
        <Container sx={{ pt: 4, pb: 4 }}>
          <UppercaseTitle text={'join us!'} />
          <Grid container spacing={4}>
            {jsonData.banners.map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
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

      <Box backgroundColor="customAlternateBackground">
        <Container sx={{ pt: 4, pb: 4 }}>
          <UppercaseTitle text={'at a glance'} />

          <Grid
            container
            direction="row"
            spacing={4}
            sx={{
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
          <UppercaseTitle text={'all projects'} />
          <Grid container spacing={4} justifyContent="center">
            {homeData.map((element, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Card elevation={2}>
                  <CardActionArea
                    component={Link}
                    to={`/project/${element.id}`}
                    disabled={element.isEmpty}
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
                        variant="h6"
                        component="div"
                        color="text.primary"
                      >
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
