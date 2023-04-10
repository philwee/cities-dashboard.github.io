// disable eslint for this file
/* eslint-disable */

import { useState, createContext } from 'react';
import ChartComponent from '../Graphs/ChartComponent';
import { Grid, Typography } from '@mui/material';
import json_data from '../temp_database.json';

export const DataContext = createContext();

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

export const DataProvider = (props) => {
  const [data, setData] = useState([]);

  if (data.length === 0) {
    // loop through temp_database.json
    json_data.map((item) => {
      setData((prev) => [
        ...prev,
        item.charts.length != 0
          ? {
              id: item.id,
              title: item.title,
              owner: item.owner,
              isEmpty: false,
              graph: (
                <ChartComponent
                  chartData={{
                    sheetId: item.sheetId,
                    homePage: true,
                    ...item.charts[0],
                  }}
                  chartWrapperHeight={"100%"}
                />
              ),
            }
          : {
              title: item.title,
              owner: item.owner,
              isEmpty: true,
              graph: <ComingSoonBanner />,
            },
      ]);
    });
  }

  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
