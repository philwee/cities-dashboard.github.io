// disable eslint for this file
/* eslint-disable */

// import libraries
import { useState, createContext } from 'react';
import ChartComponent from '../Graphs/ChartComponent';
import { Grid, Typography } from '@mui/material';

// import data
import json_data from '../temp_database.json';

// create context
export const DataContext = createContext();

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

// context provider
export const DataProvider = (props) => {
  // state to store data
  const [data, setData] = useState([]);

  if (data.length === 0) {
    // loop through temp_database.json
    json_data.map((item) => {
      setData((prev) => [
        ...prev,
        item.isActive
          ? {
              isActive: item.isActive,
              id: item.id,
              title: item.title,
              owner: item.owner,
              graph: (
                <ChartComponent
                  chartData={{
                    sheetId: item.sheetId,
                    ...item.charts[item.homepageChartIndex || 0],
                  }}
                  chartWrapperHeight={'100%'}
                  isHomepage={true}
                />
              ),
            }
          : {
              isActive: item.isActive,
              title: item.title,
              owner: item.owner,
              graph: <ComingSoonBanner />,
            },
      ]);
    });
  }

  // return context provider
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
