// disable eslint for this file
/* eslint-disable */

// import libraries
import { useState, useEffect, createContext } from 'react';
import ChartComponent from '../Graphs/ChartComponent';
import { Grid, Typography } from '@mui/material';

// import data
import json_data from '../temp_database.json';

// create context
export const DataContext = createContext();

// context provider
export const HomePageProvider = (props) => {
  // state to store data
  const [data, setData] = useState({});

  useEffect(() => {
    let homeData = {};
    // loop through temp_database.json
    json_data.map((item) => {
      homeData[item.id] =
      {
        isActive: item.isActive,
        id: item.id,
        title: item.title,
        owner: item.owner,
        chartCounts: item.charts?.length,
        graph: (item.isActive ?
          <ChartComponent
            chartData={{
              sheetId: item.sheetId,
              ...item.charts[item.homepageChartIndex || 0],
            }}
            chartWrapperHeight={'100%'}
            isHomepage={true}
          /> : <ComingSoonBanner />
        ),
      };

      setData(homeData);
    });
  }, []);

  // return context provider
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};

// banner for coming soon
function ComingSoonBanner() {
  return (
    <Grid container height={'100%'} justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h4" color="text.secondary">
          Coming Soon
        </Typography>
      </Grid>
    </Grid>
  );
}