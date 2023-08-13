/* eslint-disable */

import { GoogleContext } from '../ContextProviders/GoogleContext';

import { fetchDataFromSheet, generateRandomID, returnCalendarChartOptions, ChartControlType, returnChartControlUI } from './GoogleChartHelper';

import { isMobile } from 'react-device-detect';

import SubChartStyleWrapper from './Subchart/SubChartStyleWrapper';
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Stack, Box, CircularProgress } from '@mui/material/';
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
  const { chartData, subchartIndex, windowSize, isPortrait, isHomepage, height, maxHeight } = props;
  const [chartTotalHeight, setChartTotalHeight] = useState(200);
  const chartHeight = useRef(0);
  const controlHeight = useRef(0);

  const [google, _] = useContext(GoogleContext);

  const [chartWrapper, setChartWrapper] = useState();
  const [dashboardWrapper, setDashboardWrapper] = useState();
  const [controlWrapper, setControlWrapper] = useState();

  const [dataTable, setDataTable] = useState();

  // Get the current theme
  const theme = useTheme();

  // Property to determine if this is the first time the chart is rendered
  // to show/hide the loading CircularProgress
  const [isFirstRender, setIsFirstRender] = useState(true);

  const calendarDimensions = calculateCalendarDimensions({ cellSizeMin: 14, cellSizeMax: 18 });

  const options = returnCalendarChartOptions({ ...props, calendarDimensions, theme });


  // Properties for chart control (if existed)
  let hasChartControl = false;
  let chartControlOptions;
  const deviceType = isMobile ? 'mobile' : 'desktop';
  // Only show the chart control if:
  // It exists in the database (either for all subcharts or just for a particular subchart)
  // And if the chart is currently not shown on homePage
  let chartControl = chartData.control || chartData.subcharts?.[subchartIndex].control;
  if (chartControl && (isHomepage !== true)) {
    hasChartControl = true;
    // Control is different for mobile and desktop if deviceType as a key exists in the database
    if (chartControl[deviceType]) chartControl = chartControl[deviceType];
    // Get the options for chartControl if hasChartControl
    chartControlOptions = {
      ...chartControl.options,
      ui: returnChartControlUI({
        chartControl,
        mainChartData: chartData,
        mainChartOptions: options,
        subchartIndex,
        theme,
        isPortrait
      })
    };
  }

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
          const thisDataTable = response.getDataTable();
          const thisChartWrapper = new google.visualization.ChartWrapper({
            chartType: chartData.chartType,
            dataTable: thisDataTable,
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
          setChartWrapper(thisChartWrapper);

          if (hasChartControl) {
            const thisDashboardWrapper = new google.visualization.Dashboard(
              document.getElementById(`dashboard-${randomID}`));
            setDashboardWrapper(thisDashboardWrapper);

            google.visualization.events.addListener(thisDashboardWrapper, 'ready', onChartReady);

            const thisControlWrapper = new google.visualization.ControlWrapper({
              controlType: chartControl.controlType,
              options: chartControlOptions,
              containerId: `control-${randomID}`
            });
            setControlWrapper(thisControlWrapper);

            // Establish dependencies
            thisDashboardWrapper.bind(thisControlWrapper, thisChartWrapper);

            thisDashboardWrapper.draw(thisDataTable);
          }
          else {
            google.visualization.events.addListener(thisChartWrapper, 'ready', onChartReady);
            thisChartWrapper.draw();
          }
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
    let renderedHeight = chartDOMContainer.getBBox().height;
    if (options.legend.position === 'none') renderedHeight += 50;
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

  const renderChart = () => {
    if (hasChartControl) {
      return (
        <Stack
          id={`dashboard-${randomID}`}
          direction={ChartControlType[chartControl.controlType]?.stackDirection || 'column-reverse'}
          sx={{ height: '100%' }}
        >
          <Box
            id={`control-${randomID}`}
            sx={{
              height: `calc(${height} / 8)`,
              opacity: 0.8,
              filter: 'saturate(0.3)'
            }}
          />
          <Box id={randomID} sx={{ height: height, maxHeight: maxHeight }} />
        </Stack>
      )
    }
    else return <Box id={randomID} sx={{ height: height, maxHeight: maxHeight }} />;
  }

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
      {renderChart()}
    </SubChartStyleWrapper>
  );
}

export default ResponsiveCalendarChart;
