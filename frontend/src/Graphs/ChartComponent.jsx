import { useState, useRef, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Tabs, Tab } from '@mui/material/';
import { TabContext } from '../ContextProviders/TabContext';
import { useVisibility } from '../ContextProviders/VisibilityContext';

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
  // Special CSS for historical-snapshot-aqi chart
  '& .historical-snapshot-aqi svg [clip-path*="ABSTRACT_RENDERER"] > g:nth-child(1), .historical-snapshot-aqi [id*="googlechart-control"] svg [clip-path*="ABSTRACT_RENDERER"] > g:nth-child(2)': {
    opacity: 0.6
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

        if (chartData.subcharts?.some((subchart) => subchart.control != null)
          || (chartData.control != null)) {
          setWindowSize([window.innerWidth, window.innerHeight]);
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

  // if (chartData.identifier?.includes('student-categories-by-term')) {
  //   const windowHeight = windowSize[1];
  //   // If not potrait, make sure that height is always >= 40vw
  //   // else, make sure that height is always >= 120vw
  //   chartWrapperHeight = isPortrait ? `${windowHeight * 0.69}px` : `${windowHeight * 0.73}px`;
  //   chartWrapperMaxHeight = isPortrait ? `${windowHeight * 1.5}px` : `${windowHeight * 0.75}px`;
  // }

  // Assign the subcharts array for HeatMap based on the device orientation
  if (chartData.chartType === 'HeatMap' || chartData.chartType === 'ComboChart') {
    chartData = {
      ...chartData,
      ...chartData[isPortrait ? 'subchartsPortrait' : 'subchartsLandscape'],
    };
  }

  const chartRef = useRef(null);
  const { setIsVisible } = useVisibility();
  useEffect(() => {
    let observer;

    if (chartData.callsAQIHelper && chartRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // console.log(`chart is visible: ${chartData.title}`);
          }
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(chartRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [chartData, setIsVisible, chartRef]);

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
          ref={chartRef}
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
