// disable eslint for this file
/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import data from '../../temp_database.json';
import ChartComponent from '../../Graphs/ChartComponent';

import { Box, Grid, Typography, Container, Card, CardContent, CardMedia, CardActionArea, Divider} from '@mui/material';

function ComingSoonBanner(){
  return(
    <Grid container height={'100%'} justifyContent="center" alignItems="center" >
      <Grid item>
        <Typography variant="h5" color="text.secondary">
          Coming Soon
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function Home({ LinkChange, setLinkChange, prefersDarkMode }) {
  // useState for home page data
  const [homeData, setHomeData] = useState([]);

  const changeLinkContent = () => {
    setLinkChange(false);
  };

  // fetch data if homePageData is empty
  useEffect(() => {
    if (homeData.length === 0) {
      // loop through temp_database.json
      data.map((item) => {
        setHomeData((prev) => [
          ...prev,
          (item.charts.length != 0) ? {
            name: item.title,
            owner: item.owner,
            isEmpty: false,
            graph: (
              <ChartComponent
                chartData={{
                  sheetId: item.sheetId,
                  ...item.charts[0],
                }}
              />
            )} : {
            name: item.title,
            owner: item.owner,
            isEmpty: true,
            graph: (<ComingSoonBanner/>)
          },
        ]);
      });
    }
  });

  useEffect(() => {
    setLinkChange(true);

    return () => {
      console.log('Returned');
    };
  });

  return (
    <Container sx={{ pt: 4, pb: 4 }}>
      <Grid
        container
        direction="row"
        spacing={4}
      >
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            All Projects
          </Typography>
        </Grid>

        {homeData.map((element, index) => (
          <Grid item xs={12} sm={6} md={4}>
            {/* <Card
              title={element.name}
              key={index}
              graphType={element.graph}
              owner={element.owner}
              LinkChange={LinkChange}
              setLinkChange={setLinkChange}
            /> */}
            <Card key={index} elevation={2}>
              <CardActionArea component={Link} to="/project" onClick={changeLinkContent} disabled={element.isEmpty}>
                <Box className={prefersDarkMode ? 'dark-mode' : ''}>
                  <CardMedia
                    children={element.graph}
                    height={'auto'}
                    sx={{ aspectRatio: '4/3' }}
                  />
                </Box>
                
                <Divider />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {element.name}
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
