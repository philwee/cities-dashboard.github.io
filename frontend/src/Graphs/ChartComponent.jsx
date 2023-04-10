// disable eslint for this file
/* eslint-disable */
import { useState, useMemo, useContext } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress, Tabs, Tab } from '@mui/material/';
import HeatMap from './HeatMap';
import { TabContext } from '../ContextProviders/TabContext';

import './ChartComponent.css';

import { useTheme } from '@mui/material/styles';

function InnerChart({ chartData, chartSubIndex, isLandscape }) {
  // Case: HeatMap
  if (chartData.chartType == 'HeatMap') {
    return (
      <Box
        position={'relative'}
        className={chartData.chartType}
        height={chartData.height}
        maxWidth={chartData.maxWidth ? chartData.maxWidth : '100%'}
        width={'100%'}
        sx={{ pt: 2, pb: 2 }}
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

  // Get the current theme
  const theme = useTheme();

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
    chartArea: { width: '80%', height: isLandscape ? '70%' : '60%' },
    width: '100%',
    height: '100%',
    backgroundColor: {
      fill: 'transparent',
    },
    tooltip: {
      isHtml: true,
    },
    curveType: 'function',
    legend: {
      alignmemt: (isLandscape ? 'start' : 'center'),
      position: chartData.options?.legend?.position ?? (isLandscape ? 'right' : 'top')
    },
  };

  if (chartData.chartType == "Calendar") options = {
    ...options, calendar: {
      cellSize: scaleCalendar(5, 20), // calculate cell size for calendar chart
    },
    noDataPattern: {
      backgroundColor: 'none',
      color: 'none',
    },
  }
  // 3. Append to vAxis and hAxis properties
  options.vAxis = {
    ...options.vAxis,
    format: options.vAxis?.format ?? 'decimal',
    title: options.vAxis?.title ?? '',
    viewWindow: {
      min: options.vAxis?.viewWindow?.min ?? 0,
    }
  };
  options.hAxis = {
    ...options.hAxis,
    title: options.hAxis?.title ?? ''
  };
  // 3.1. If in portrait mode, slant the text of the hAxis
  if (!isLandscape) options.hAxis = {
    ...options.hAxis,
    slantedText: true,
    slantedTextAngle: 30
  }

  // 4. Override with custom colors:
  // 4.1. Color scheme of all the series of this chart
  if (typeof options.colors === 'string' || !options.colors) options.colors = theme.palette.chart.optionsColors[options.colors || "multiColor"];
  // 4.2. Individual color of a single serie (if given)
  if (options.series) Object.values(options.series).forEach(serie => {
    if (serie.color === "default") serie.color = theme.palette.primary.main;
  });
  // 4.3. Color of the trendline
  if (options.trendlines) options.trendlines.forEach(item => {
    item.color = theme.palette.NYUpurple;
  });
  // 4.4. Color axis of the Calendar chart
  if (options.colorAxis) {
    switch (options.colorAxis.colors) {
      case "matchingColor":
        options.colorAxis.colors = [theme.palette.chart.colorAxisFirstColor, theme.palette.chart.optionsColors["multiColor"][options.colorAxis.colorIndex]];
        break;
      case "default":
        options.colorAxis.colors = [theme.palette.chart.colorAxisFirstColor, theme.palette.NYUpurple];
        break;
      default:
        break;
    }
  }
  // 4.5. Colors of other elements of the chart (typographies and gridlines)
  options.vAxis = {
    ...options.vAxis,
    titleTextStyle: { italic: false, color: theme.palette.chart.axisTitle },
    textStyle: { color: theme.palette.chart.axisText },
    gridlines: { color: theme.palette.chart.gridlines },
    minorGridlines: { count: 0 }
  };
  options.hAxis = {
    ...options.hAxis,
    titleTextStyle: { italic: false, color: theme.palette.chart.axisTitle },
    textStyle: { color: theme.palette.chart.axisText },
    gridlines: { color: theme.palette.chart.gridlines },
    minorGridlines: { color: theme.palette.chart.gridlines }
  };
  options.legend = {
    ...options.legend,
    textStyle: { color: theme.palette.chart.axisText }
  };
  options.annotations = {
    ...options.annotations,
    highContrast: true,
    textStyle: {
      color: theme.palette.text.secondary,
      fontSize: scaleCalendar(3, 15),
    },
    stem: {
      ...options.annotations?.stem,
      color: theme.palette.chart.axisTitle
    },
    boxStyle: {
      rx: 3, // rounded corners
      ry: 3,
      fill: theme.palette.chart.annotationBoxFill
    }
  };

  // 5. If the chart is displayde on the homepage, override the options with:
  if (chartData.homePage) options = {
    ...options,
    annotations: {
      ...options.annotations,
      stem: {
        length: 0
      },
      textStyle: {
        opacity: chartData.homePage ? 0 : 1,
      },
      boxStyle: null
    },
    legend: 'none',
    vAxis: {
      ...options.vAxis,
      textPosition: 'none'
    },
    hAxis: {
      ...options.hAxis,
      textPosition: 'none',
      minorGridlines: { count: 0 }
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
      height="100%"
      marginLeft={chartData.chartType == 'Calendar' ? '-1rem' : ''}
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
      />
    </Box>
  );
}

export default function ChartComponent({ chartData, chartWrapperHeight, chartWrapperMaxHeight }) {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  if (!chartWrapperHeight) {
    chartWrapperHeight = isLandscape ? "35vw" : "80vw";
    chartWrapperMaxHeight = isLandscape ? "500px" : "800px";
  }

  // Assign the chart's properties based on the device orientation for HeatMap
  if (chartData.chartType == 'HeatMap') {
    chartData = {
      ...chartData,
      ...chartData[isLandscape ? 'subchartsLandscape' : 'subchartsPortrait']
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
          // Hide the subchart selector if in homepage 
          chartData.homePage ? (
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
          height={chartData.height ? chartData.height : chartWrapperHeight}
          maxHeight={["heatMap", "Calendar"].includes(chartData.chartType) ? '' : chartWrapperMaxHeight}
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
                  <InnerChart chartData={chartData} chartSubIndex={index} isLandscape={isLandscape} />
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
  else return (
    <Box
      position="relative"
      height={chartData.height ? chartData.height : chartWrapperHeight}
      maxHeight={chartData.chartType == 'HeatMap' ? '' : chartWrapperMaxHeight}
    >
      <InnerChart chartData={chartData} isLandscape={isLandscape} />
    </Box>
  );
}
