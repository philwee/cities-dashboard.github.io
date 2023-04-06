// disable eslint for this file
/* eslint-disable */
import { useState, useMemo, useContext } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress, Tabs, Tab } from '@mui/material/';
import HeatMap from './HeatMap';
import { TabContext } from '../ContextProviders/TabContext';

import './ChartComponent.css';

function InnerChart({ chartData, chartSubIndex }) {
  // Case: HeatMap
  if (chartData.chartType == 'HeatMap') {
    return (
      <Box
        position={'relative'}
        className={chartData.chartType}
        height={chartData.height}
        maxWidth={chartData.maxWidth ? chartData.maxWidth : '100%'}
        width={'100%'}
      >
        <HeatMap
          publishedSheetId={chartData.publishedSheetId}
          gid={chartData.gid || chartData.subcharts[chartSubIndex].gid || null}
          range={chartData.range || chartData.subcharts[chartSubIndex].range || null}
          height={chartData.height}
        />
      </Box>
    );
  }

  // Show CircleProgress or not
  let [circleProgress, displayCircleProgress] = useState(true);

  // ---- Formulate the options for this specific chart:
  // 1. Populate first with subchart's options (if any)
  let options = chartData.subcharts?.[chartSubIndex].options
    ? { ...chartData.subcharts[chartSubIndex].options }
    : {};
  // 2. Append own chart's options and then populate with universal options for all charts
  options = {
    ...options,
    ...chartData.options,
    theme: 'material',
    chartArea: { width: '80%', height: '65%' },
    width: '100%',
    height: '100%',
    backgroundColor: {
      fill: 'transparent',
    },
    calendar: {
      cellSize: scaleCalendar(5, 20), // calculate cell size for calendar chart
    },
    noDataPattern: {
      backgroundColor: 'none',
      color: 'none',
    },
    tooltip: {
      isHtml: true,
    },
    curveType: 'function',
    legend: chartData.options?.legend ?? 'bottom',
  };
  // 3. Append to vAxis and hAxis properties
  options.vAxis = {
    ...options.vAxis,
    format: options.vAxis?.format ?? 'decimal',
    title: options.vAxis?.title ?? '',
    viewWindow: {
      min: options.vAxis?.viewWindow?.min ?? 0,
    },
    titleTextStyle: {
      italic: false,
    },
  };
  options.hAxis = {
    ...options.hAxis,
    title: options.hAxis?.title ?? '',
    titleTextStyle: {
      italic: false,
    },
  };

  // If the chart is display on the homepage, override the options with:
  if (chartData.homePage) options = {
    ...options,
    enableInteractivity: false,
    annotations: {
      stem: {
        length: 0
      },
      textStyle: {
        opacity: chartData.homePage ? 0 : 1,
      },
    },
    legend: 'none',
    vAxis: {
      textPosition: 'none'
    },
    hAxis: {
      textPosition: 'none'
    },
    vAxes: {},
  }

  const chartEvents = [
    {
      eventName: 'ready',
      callback: ({ chartWrapper }) => {
        circleProgress = displayCircleProgress(false);
      },
    },
  ];

  function scaleCalendar(min, max) {
    var cellSize = window.innerWidth / 58;
    return Math.min(Math.max(cellSize, min), max);
  }

  return (
    <Box
      position={'relative'}
      className={chartData.chartType}
      marginLeft={chartData.chartType == 'Calendar' ? '-1rem' : ''}
      height={'100%'}
      width={chartData.chartType == 'Calendar' ? '100vw' : '100%'}
    >
      {circleProgress && (
        <CircularProgress
          sx={{
            display: 'block',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
          }}
        />
      )}
      <Chart
        chartType={chartData.chartType}
        chartWrapperParams={{
          view: {
            columns:
              chartData.columns ||
              (chartData.subcharts &&
                chartData.subcharts[chartSubIndex].columns) ||
              null ||
              null,
          },
        }}
        spreadSheetUrl={`https://docs.google.com/spreadsheets/d/${chartData.sheetId}`}
        spreadSheetQueryParameters={
          chartSubIndex == null
            ? {
              headers: chartData.headers,
              query: chartData.query,
              gid: chartData.gid,
            }
            : {
              headers:
                chartData.headers ||
                chartData.subcharts[chartSubIndex].headers ||
                null,
              query:
                chartData.query ||
                chartData.subcharts[chartSubIndex].query ||
                null,
              gid:
                chartData.gid ||
                chartData.subcharts[chartSubIndex].gid ||
                null,
            }
        }
        options={options}
        chartEvents={chartEvents}
        width={'100%'}
      />
    </Box>
  );
}

export default function ChartComponent({ chartData }) {
  // Assign the chart's properties based on the device orientation for HeatMap
  if (chartData.chartType == 'HeatMap') {
    chartData = {
      ...chartData,
      ...chartData[window.matchMedia("(orientation: landscape)").matches ? 'subchartsLandscape' : 'subchartsPortrait']
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
        {chartData.homePage ? (
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
        )}
        <Box
          position="relative"
          height={chartData.height ? chartData.height : '95%'}
        >
          {chartData.subcharts.map((element, index) => (
            <Box
              key={index}
              height="100%"
              width="100%"
              role="tabpanel"
              position="absolute"
              top={0}
              left={0}
              visibility={indexValue === index ? 'visible' : 'hidden'}
            >
              {useMemo(
                () => (
                  <InnerChart chartData={chartData} chartSubIndex={index} />
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
  else return <InnerChart chartData={chartData} />;
}
