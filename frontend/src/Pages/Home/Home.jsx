// disable eslint for this file
/* eslint-disable */
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Card from '../../Components/Card/Card';
import data from '../../temp_database.json';
import ChartComponent from '../../Graphs/ChartComponent';
import './Home.css';

export default function Home({ LinkChange, setLinkChange }) {
  // useState for home page data
  const [homeData, setHomeData] = useState([]);
  // fetch data if homePageData is empty
  useEffect(() => {
    if (homeData.length === 0) {
      // loop through temp_database.json
      data.map((item) => {
        setHomeData((prev) => [
          ...prev,
          {
            name: item.title,
            owner: item.owner,
            graph: (
              <ChartComponent
                chartData={{
                  homePage: true,
                  sheetId: item.sheetId,
                  ...item.charts[1],
                }}
              />
            ),
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
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            All Projects
          </Typography>
        </Grid>

        {homeData.map((element, index) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              title={element.name}
              key={index}
              graphType={element.graph}
              owner={element.owner}
              LinkChange={LinkChange}
              setLinkChange={setLinkChange}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
