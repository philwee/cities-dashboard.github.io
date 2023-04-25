// disable eslint for this file
/* eslint-disable */
import { useState, useMemo, useContext } from 'react';
import { Box, Tabs, Tab } from '@mui/material/';
import { TabContext } from '../ContextProviders/TabContext';

import SubChart from './SubChart';

import './ChartComponent.css';

export default function ChartComponent({ chartData, chartWrapperHeight, chartWrapperMaxHeight, isHomepage }) {
  // Get the device orientation to make the google chart responsive
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  if (chartData.chartType != 'Table' && !chartWrapperHeight) {
    chartWrapperHeight = isPortrait ? '80vw' : '35vw';
    chartWrapperMaxHeight = isPortrait ? '800px' : '500px';
  }

  // Assign the subcharts array for HeatMap based on the device orientation 
  if (chartData.chartType == 'HeatMap') {
    chartData = {
      ...chartData,
      ...chartData[isPortrait ? 'subchartsPortrait' : 'subchartsLandscape'],
    };
  }

  // Check if there are multiple subcharts
  if (chartData.subcharts) {
    // use tab context
    const [_, setTab] = useContext(TabContext);

    // Props for tab panels (multiple data visualizations in the same chart area, navigate with tab panels)
    const [indexValue, setIndexValue] = useState(0); // start with the first elem

    // Handle tab change
    const handleChange = (event, newValue) => {
      // use setTab to copy the tab object and update the subIndex
      setTab((prevState) => {
        return { ...prevState, [chartData.chartIndex]: newValue };
      });
      setIndexValue(newValue);
    };

    return (
      <Box height="100%">
        {
          // Hide the subcharts Tabs selector if in homepage
          isHomepage ? (
            ''
          ) : (
            <Tabs
              value={indexValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              {chartData.subcharts.map((element, index) => (
                <Tab
                  key={index}
                  value={index}
                  label={chartData.subcharts[index].subchartTitle}
                />
              ))}
            </Tabs>
          )
        }
        <Box
          position="relative"
          height={chartData.height ? chartData.height : chartWrapperHeight}
          maxHeight={
            ['HeatMap', 'Calendar'].includes(chartData.chartType)
              ? ''
              : chartWrapperMaxHeight
          }
        >
          {chartData.subcharts.map((element, index) => (
            <Box
              key={index}
              height="100%"
              width="100%"
              role="tabpanel"
              position={(index === 0) ? "" : "absolute"}
              top={(index === 0) ? "" : 0}
              left={(index === 0) ? "" : 0}
              visibility={indexValue === index ? 'visible' : 'hidden'}
            >
              {useMemo(
                () => (
                  <SubChart
                    chartData={chartData}
                    chartSubIndex={index}
                    isPortrait={isPortrait}
                    isHomepage={isHomepage}
                  />
                ),
                []
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
  // If there is only one single chart
  else
    return (
      <Box
        position="relative"
        height={chartData.height ? chartData.height : chartWrapperHeight}
        maxHeight={
          chartData.chartType == 'HeatMap' ? '' : chartWrapperMaxHeight
        }
      >
        <SubChart chartData={chartData} isPortrait={isPortrait} isHomepage={isHomepage} />
      </Box>
    );
}
