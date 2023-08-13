/* eslint-disable */

import { GoogleContext } from '../ContextProviders/GoogleContext';

import { fetchDataFromSheet, generateRandomID, returnCalendarChartOptions } from './GoogleChartHelper';

import SubChartStyleWrapper from './Subchart/SubChartStyleWrapper';
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Box, CircularProgress, styled } from '@mui/material/';
import { useTheme } from '@mui/material/styles';

const calculateCalendarDimensions = ({ cellSizeMin, cellSizeMax }) => {
  const cellSize = Math.min(Math.max((window.innerWidth * 0.9) / 58, cellSizeMin), cellSizeMax);
  return {
    chartWidth: cellSize * 56, // fixed ratio
    cellSize,
    yearLabelFontSize: cellSize * 2
  };
};

function ResponsiveCalendarChart(props) {
  const { chartData, subchartIndex, windowSize } = props;
  const showControl = false;
  const [chartTotalHeight, setChartTotalHeight] = useState(200);
  const chartHeight = useRef(0);
  const controlHeight = useRef(0);

  const [chartWrapper, setChartWrapper] = useState(null);
  const [google, _] = useContext(GoogleContext);

  // Get the current theme
  const theme = useTheme();

  // Property to determine if this is the first time the chart is rendered
  // to show/hide the loading CircularProgress
  const [isFirstRender, setIsFirstRender] = useState(true);

  const calendarDimensions = calculateCalendarDimensions({ cellSizeMin: 14, cellSizeMax: 18 });

  const options = returnCalendarChartOptions({ ...props, calendarDimensions, theme });

  // const updateControlHeight = useEffect((controlWrapper) => {
  //   const controlContainer = controlWrapper.getControl().container;
  //   const renderedHeight = controlContainer.getBoundingClientRect().height;

  //   controlHeight.current = renderedHeight;

  //   calculateChartTotalHeight, chartWrapper();
  // }, [calculateChartTotalHeight]);


  // const controlEvents = [
  //   {
  //     eventName: 'ready',
  //     callback: useCallback(({ controlWrapper }) => {
  //       updateControlHeight(controlWrapper);
  //     }, [updateControlHeight])
  //   },
  //   {
  //     eventName: 'statechange',
  //     callback: useCallback(({ controlWrapper }) => {
  //       updateControlHeight(controlWrapper);
  //     }, [updateControlHeight]),
  //   },
  // ];

  // // additional props if there is a controlFilter present
  // if (showControl) {
  //   calendarChartProps.controls = [{
  //     ...calendarChartProps.controls[0],
  //     controlEvents,
  //   }];
  // }

  // Define the DOM container's ID for drawing the google chart inside
  const [randomID, setRandomID] = useState(generateRandomID());

  // Call this function to fetch the data and draw the initial chart
  useEffect(() => {
    if (google && !chartWrapper) {
      fetchDataFromSheet({ chartData: chartData, subchartIndex: subchartIndex })
        .then(response => {
          const dataTable = response.getDataTable();
          const wrapper = new google.visualization.ChartWrapper({
            chartType: chartData.chartType,
            dataTable: dataTable,
            options: options,
            view: {
              columns:
                chartData.columns
                || (chartData.subcharts
                  && chartData.subcharts[subchartIndex].columns)
                || null
                || null,
            },
            containerId: randomID
          });
          setChartWrapper(wrapper);
          google.visualization.events.addListener(wrapper, 'ready', onChartReady);

          wrapper.draw();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [google]);

  const onChartReady = () => {
    // querySelector is used to select the first 'g' element in the svg
    // this is to get the height of the non-responsive element
    // to set the CalendarChart's height to make it resonsive
    const chartDOMContainer = document.getElementById(randomID).querySelector('svg > g:nth-of-type(1)');
    const renderedHeight = chartDOMContainer.getBBox().height;
    setChartTotalHeight(renderedHeight);

    if (!isFirstRender) return;
    // Hide the circleProgress when chart finishes rendering the first time
    setIsFirstRender(false);
  }

  // Set new options prop and re-render the chart if theme or isPortrait changes
  // This is also enough to make the CalendarChart's responsive: width and height wise
  useEffect(() => {
    if (!chartWrapper || !chartTotalHeight) return;
    chartWrapper?.setOptions({ ...options, height: chartTotalHeight });
    chartWrapper?.draw();
  }, [theme, windowSize, chartTotalHeight]);

  return (
    <SubChartStyleWrapper
      className={chartData.chartType}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}>

      {isFirstRender && (
        <CircularProgress disableShrink size="1.5rem"
          sx={{
            display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',
          }}
        />
      )}
      <Box id={randomID} />
    </SubChartStyleWrapper>
  );
}

export default ResponsiveCalendarChart;
