// disable eslint for this file
/* eslint-disable */
import { React, useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material/';

import './ChartComponent.css';

function TabPanel(props) {
  const { iframeIndex, value, embedLink, height } = props;

  return (
    <Box
      height="100%"
      role="tabpanel"
      hidden={value !== iframeIndex}
    >
      <iframe
      className="heat-map-iframe"
        style={{ width: '100%', height: "100%", height: height, border: 'none' }}
        src={embedLink}
      ></iframe>

    </Box>
  );
}

export default function HeatMap({ chartData }) {

  const [indexValue, setIndexValue] = useState(chartData.gids.length-1); // start with the last element

  const handleChange = (event, newValue) => {
    setIndexValue(newValue);
  };

  return (
    <Box width="100%" height="100%" maxWidth={450}>
      <Tabs
        value={indexValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{mb: 2}}
      >
          {chartData.gids.map((gid, index) => (
            <Tab
              key={index}
              value={index}
              label={chartData.sheetTitles[index]}
            />
          ))}
      </Tabs>
      <Box height="100%">
        {chartData.gids.map((gid, index) => (
          <TabPanel
            key={index}
            value={indexValue}
            iframeIndex={index}
            height={chartData.height}
            embedLink={`https://docs.google.com/spreadsheets/d/e/${chartData.publishedSheetId}/pubhtml?gid=${gid}&single=true&widget=true&headers=false&chrome=false`}
          />
        ))}
      </Box>
    </Box>

  );
}
