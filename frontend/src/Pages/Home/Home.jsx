// disable eslint for this file
/* eslint-disable */
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContext, DataContext } from '../../ContextProviders/LinkContext';

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
} from '@mui/material';

import UnderlinedTitle from '../../Components/UnderlinedTitle';

function ComingSoonBanner() {
  return (
    <Grid container height={'100%'} justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h5" color="text.secondary">
          Coming Soon
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function Home({ prefersDarkMode }) {
  // useState for home page data
  const [_, setUnderlineLink] = useContext(LinkContext);
  const [homeData] = useContext(DataContext);

  useEffect(() => {
    setUnderlineLink('home');
  });

  return (
    <Container sx={{ pt: 4, pb: 4 }}>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12}>
          <UnderlinedTitle text={'all projects'} />
        </Grid>

        {homeData.map((element, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card elevation={2}>
              <CardActionArea
                component={Link}
                to={`project/${element.id}`}
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
