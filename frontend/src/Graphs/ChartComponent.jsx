// disable eslint for this file
/* eslint-disable */
import { useState, useMemo, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Tabs, Tab } from '@mui/material/';
import { TabContext } from '../ContextProviders/TabContext';

import SubChart from './SubChart';

const ChartStyleWrapper = styled(Box)(({ theme }) => ({
  filter: theme.palette.mode == "dark" && "saturate(0.85)",
  /* CSS for Google Charts' HTML tooltip (can't be formatted using options parameter) */
  '& .google-visualization-tooltip text, .google-visualization-tooltip span': {
    fontSize: '0.85rem',
  },
  '& .google-visualization-tooltip': {
    width: 'unset',
    height: 'unset',
    borderRadius: '0.25rem',
  },
  '& .Calendar .google-visualization-tooltip': {
    padding: '0.5rem',
  },

  /* Invert iframe */
  '&.dark .heat-map-iframe': {
    filter: 'invert(0.848) hue-rotate(180deg)',
  },
  '&.dark .google-visualization-table-tr-head': {
    backgroundColor: '#000',
  },
  '&.dark .google-visualization-table-tr-even': {
    backgroundColor: '#181819',
  },
  '&.dark .google-visualization-table-tr-odd': {
    backgroundColor: '#232323',
  },

  /* Modify the appearance of the Google chart's filter (by selecting all divs with id containing the keyword below */
  '& [id^=googlechart-control]': {
    opacity: 0.75,
    filter: 'saturate(0.25)',
  },

  // These are the paths showing on top of the line chart 
  // and the stroke around the bar/column chart
  // when the user hovers on the legend to make the serie stand out
  // by Google Chart's default doesn't change color based on light/dark theme, but we modify here:
  '& path[stroke-opacity="0.3"], path[stroke-opacity="0.1"], path[stroke-opacity="0.05"], rect[stroke-opacity]': {
    stroke: theme.palette.text.primary,
    strokeWidth: 3
  }
}));


export default function ChartComponent({ chartData, chartWrapperHeight, chartWrapperMaxHeight, isHomepage, windowSize }) {
  // Get the device orientation to make the google chart responsive
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  console.log("Chart component rerendering");

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
      <ChartStyleWrapper height="100%">
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
                [windowSize]
              )}
            </Box>
          ))}
        </Box>
      </ChartStyleWrapper>
    );
  }
  // If there is only one single chart
  else
    return (
      <ChartStyleWrapper
        position="relative"
        height={chartData.height ? chartData.height : chartWrapperHeight}
        maxHeight={
          chartData.chartType == 'HeatMap' ? '' : chartWrapperMaxHeight
        }
      >
        <SubChart chartData={chartData} isPortrait={isPortrait} isHomepage={isHomepage} />
      </ChartStyleWrapper>
    );
}
