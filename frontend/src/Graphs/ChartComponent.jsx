// disable eslint for this file
/* eslint-disable */
import { React, useState, useMemo, useCallback } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress, Tabs, Tab } from '@mui/material/';
import HeatMap from './HeatMap';

import './ChartComponent.css';

function InnerChart({ chartData, chartIndex }) {
  // Case: HeatMap
  if (chartData.chartType == 'HeatMap') {
    return (
      <Box
        position={'relative'}
        className={chartData.chartType}
        height={chartData.height}
        width={'100%'}
      >
        <HeatMap
          publishedSheetId={chartData.publishedSheetId}
          gid={chartData.gid || chartData.subcharts[chartIndex].gid || null}
          height={chartData.height}
        />
      </Box>
    );
  }
  // Show CircleProgress or not
  let [circleProgress, displayCircleProgress] = useState(true);
  const options = {
    theme: 'material',
    backgroundColor: { fill: chartData.backgroundColorFill ?? 'transparent' },
    chartArea: { width: '80%', height: '65%' },
    vAxis: {
      format: chartData.vAxisFormat ?? 'decimal',
      title:
        chartData.vAxisTitle ||
        (chartData.subcharts && chartData.subcharts[chartIndex].vAxisTitle) ||
        null ||
        null,
      viewWindow: {
        min: chartData.vAxisMin,
      },
      titleTextStyle: {
        italic: false,
      },
      ticks: chartData.vAxisTicks,
      direction: chartData.vAxisDirection    
    },
    hAxis: {
      format:
        chartData.hAxisFormat ||
        (chartData.subcharts && chartData.subcharts[chartIndex].hAxisFormat) ||
        null ||
        null,
      title:
        chartData.hAxisTitle ||
        (chartData.subcharts && chartData.subcharts[chartIndex].hAxisTitle) ||
        null ||
        null,
      viewWindow: {
        min: chartData.hAxisMin,
      },
      titleTextStyle: {
        italic: false,
      },
      minorGridlines: {
        count: chartData.hAxisMinorGridlinesCount
      }  
    },
    width: '100%',
    height: '100%',
    legend: chartData.legend ?? 'bottom',
    isStacked: chartData.isStacked ?? false,
    lineWidth: chartData.lineWidth,
    seriesType: chartData.seriesType,
    series: chartData.series,
    intervals: chartData.intervals,
    curveType: chartData.curveType ?? 'function',
    colors: chartData.colors,
    colorAxis: chartData.colorAxis,
    defaultColor: chartData.defaultColor,
    datalessRegionColor: chartData.datalessRegionColor,
    areaOpacity: chartData.areaOpacity,
    tooltip: {
      isHtml: true,
    },
    calendar: {
      cellSize: scaleCalendar(5, 20), // calculate cell size for calendar chart
    },
    noDataPattern: {
      backgroundColor: 'none',
      color: 'none',
    },
    enableInteractivity: chartData.enableInteractivity,
    pointSize: chartData.pointSize,
    trendlines: chartData.trendlines,
    region: chartData.region,
    frozenColumns: chartData.frozenColumns,
    sortAscending: chartData.sortAscending,
    sortColumn: chartData.sortColumn,
  };

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
                chartData.subcharts[chartIndex].columns) ||
              null ||
              null,
          },
        }}
        spreadSheetUrl={`https://docs.google.com/spreadsheets/d/${chartData.sheetId}`}
        spreadSheetQueryParameters={
          chartIndex == null
            ? {
                headers: chartData.headers,
                query: chartData.query,
                gid: chartData.gid,
              }
            : {
                headers:
                  chartData.headers ||
                  chartData.subcharts[chartIndex].headers ||
                  null,
                query:
                  chartData.query ||
                  chartData.subcharts[chartIndex].query ||
                  null,
                gid:
                  chartData.gid || chartData.subcharts[chartIndex].gid || null,
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
  // Case WebsiteEmbed
  // if (chartData.chartType == 'WebsiteEmbed') {
  //   return (
  //     <iframe
  //       src="https://nyuadair.com/historical#historical-graph-wrapper"
  //       width="100%"
  //       height="100%"
  //     ></iframe>
  //   );
  // }

  // Check if there are multiple subcharts
  if (chartData.subcharts) {
    // Props for tab panels (multiple data visualizations in the same chart area, navigate with tab panels)
    const [indexValue, setIndexValue] = useState(0); // start with the first elem

    const handleChange = (event, newValue) => {
      setIndexValue(newValue);
    };

    return (
      <Box
        maxWidth={chartData.maxWidth ? chartData.maxWidth : '100%'}
        height="100%"
      >
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
                  <InnerChart chartData={chartData} chartIndex={index} />
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
