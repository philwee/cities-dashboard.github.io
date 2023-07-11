import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Tabs, Tab } from '@mui/material/';
import { TabContext } from '../ContextProviders/TabContext';

import SubChart from './SubChart';

const debounceMilliseconds = 50;

const ChartStyleWrapper = styled(Box)(({ theme }) => ({
  // CSS for dark theme only
  ...(theme.palette.mode === 'dark' && {
    // De-saturate a bit
    filter: 'saturate(0.85)',
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
  /* Modify the appearance of the Google chart's filter
  // (by selecting all divs with id containing the keyword below */
  '& [id^=googlechart-control]': {
    opacity: 0.75,
    filter: 'saturate(0.25)',
  },

  '& .google-visualization-controls-categoryfilter': {
    fontSize: '0.85rem',
    marginTop: '0.75rem',
    marginBottom: '-0.75rem',

    '& .google-visualization-controls-label': {
      color: theme.palette.text.secondary,
      verticalAlign: 'middle',
      marginBottom: '0.5rem'
    },
  },

  // CSS for DateRangeFilter-type filter charts to look consistent with our styling
  '& .google-visualization-controls-rangefilter': {
    width: '100%',
    fontSize: '0.75rem',
    '& .goog-inline-block': {
      width: '100%',
    },
    '& .google-visualization-controls-slider-horizontal': {
      width: '75%',
      margin: '0 12.5%',
    },
    '& .google-visualization-controls-rangefilter-thumblabel:nth-of-type(1)': {
      position: 'absolute',
      top: '1.5em',
      left: '12.5%'
    },
    '& .google-visualization-controls-rangefilter-thumblabel:nth-of-type(2)': {
      position: 'absolute',
      top: '1.5em',
      right: '12.5%'
    },
    '& .google-visualization-controls-slider-handle': {
      background: theme.palette.primary.main
    },
    '& .google-visualization-controls-rangefilter-thumblabel': {
      color: theme.palette.text.secondary,
      padding: 0
    },
    '& .google-visualization-controls-slider-thumb': {
      background: theme.palette.primary.main,
      border: 'unset',
      borderRadius: '4px'
    }
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

// eslint-disable-next-line max-len
function ChartComponent({ chartData: passedChartData, chartWrapperHeight: passedChartWrapperHeight, isHomepage }) {
  const [isPortrait, setIsPortrait] = useState(window.matchMedia('(orientation: portrait)').matches);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  let chartWrapperMaxHeight;
  let chartWrapperHeight = passedChartWrapperHeight;
  let chartData = passedChartData;

  // use tab context
  const [_, setTab] = useContext(TabContext);

  // Props for tab panels (multiple data visualizations in the same chart area,
  // navigate with tab panels)
  const [indexValue, setIndexValue] = useState(0); // start with the first elem

  // eventListener for window resize
  // redraw "Calendar" charts and charts with a time filter upon window resize.
  // Filter & Calendar charts are not automatically respnsive, so we have to redraw them.
  // redraw other charts when device orientation changes
  useEffect(() => {
    let timeoutID = null;

    const handleWindowResize = () => {
      clearTimeout(timeoutID);

      // debounce before triggering re-render. as user is resizing window, the state could
      // change multiple times causing many expensive rerenders. we try to rerender at the
      // end of the resize.
      timeoutID = setTimeout(() => {
        // redraw all charts on device orientation change, as the chartWrapperHeights
        // have changed.
        setIsPortrait(window.matchMedia('(orientation: portrait)').matches);

        // we redraw Calendar/Filter type charts on ANY window resize, even if
        // device orientation does not change.

        if (chartData.chartType === 'Calendar'
          || (chartData.subcharts?.some((subchart) => subchart.filter != null))
          || (chartData.filter != null)) {
          setWindowSize(window.innerWidth, window.innerHeight);
        }
      }, debounceMilliseconds);
    };

    // listen to window resize events
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [chartData]);

  if (chartData.chartType !== 'Table' && chartData.chartType !== 'Calendar' && !chartWrapperHeight) {
    chartWrapperHeight = isPortrait ? '80vw' : '35vw';
    chartWrapperMaxHeight = isPortrait ? '800px' : '500px';
  }

  // Assign the subcharts array for HeatMap based on the device orientation
  if (chartData.chartType === 'HeatMap' || chartData.chartType === 'ComboChart') {
    chartData = {
      ...chartData,
      ...chartData[isPortrait ? 'subchartsPortrait' : 'subchartsLandscape'],
    };
  }

  // Check if there are multiple subcharts
  if (chartData.subcharts) {
    // Handle tab change
    const handleChange = (__, newValue) => {
      // use setTab to copy the tab object and update the subIndex
      setTab((prevState) => ({ ...prevState, [chartData.chartIndex]: newValue }));
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
              position={(index === 0) ? '' : 'absolute'}
              top={(index === 0) ? '' : 0}
              left={(index === 0) ? '' : 0}
              visibility={indexValue === index ? 'visible' : 'hidden'}
            >
              <SubChart
                chartData={chartData}
                chartSubIndex={index}
                isPortrait={isPortrait}
                isHomepage={isHomepage}
                windowSize={windowSize}
              />
            </Box>
          ))}
        </Box>
      </ChartStyleWrapper>
    );
  }
  // If there is only one single chart
  return (
    <ChartStyleWrapper
      position="relative"
      height={chartData.height ? chartData.height : chartWrapperHeight}
      maxHeight={
        chartData.chartType === 'HeatMap' ? '' : chartWrapperMaxHeight
      }
    >
      <SubChart chartData={chartData} isPortrait={isPortrait} isHomepage={isHomepage} />
    </ChartStyleWrapper>
  );
}

export default ChartComponent;

// export default memo(ChartComponent, (prevProps, nextProps) => {
//   if (prevProps.chartWrapperHeight !== nextProps.chartWrapperHeight) return false;
//   if (prevProps.isHomePage !== nextProps.isHomePage) return false;

//   // perform light calculations first before performing
//   // deep comparison for chartData object
//   return isEqual(prevProps.chartData, nextProps.chartData);
// });
