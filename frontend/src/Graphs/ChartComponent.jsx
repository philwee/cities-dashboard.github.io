// disable eslint for this file
/* eslint-disable */
import { useState, useMemo, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Tabs, Tab } from '@mui/material/';
import { TabContext } from '../ContextProviders/TabContext';

import SubChart from './SubChart';

const ChartStyleWrapper = styled(Box)(({ theme }) => ({
  // CSS for dark theme only
  ...(theme.palette.mode == "dark" && {
    // De-saturate a bit
    filter: "saturate(0.85)",
    // Invert iframe
    '& .heat-map-iframe': {
      filter: 'invert(0.848) hue-rotate(180deg)',
    }
  }),
  // CSS for Google Charts' HTML tooltip (can't be formatted using options parameter)
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
  },

  // Cursor of series in legends
  '& [column-id]:not(:empty)': {
    cursor: 'pointer',
    ':hover': {
      fontWeight: 600
    }
  }
}));


export default function ChartComponent({ chartData, chartWrapperHeight, chartWrapperMaxHeight, isHomepage }) {
  // Get the device orientation to make the google chart responsive
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  // redraw "Calendar" charts and charts with a time filter upon window resize.
  // Filter & Calendar charts are not automatically respnsive, so we have to redraw them.
  useEffect(() => {
    let timeoutID = null;

    const handleWindowResize = () => {
      clearTimeout(timeoutID);

      // debounce before triggering re-render. as user is resizing window, the state could
      // change multiple times causing many expensive rerenders. we try to rerender at the
      // end of the resize.
      timeoutID = setTimeout(() => {
        setWindowSize(window.innerWidth, window.innerHeight);
      }, 400);
    };

    // only for "Calendar" type charts and charts with a filter
    if (chartData.chartType === "Calendar"
      || (chartData.subcharts?.some((subchart) => subchart.filter != null))) {

      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // console.log("Redrawing", chartData)

  if (chartData.chartType != 'Table' && chartData.chartType != 'Calendar' && !chartWrapperHeight) {
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
          height={chartWrapperHeight}
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
