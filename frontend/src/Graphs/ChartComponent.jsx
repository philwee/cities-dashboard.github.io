// disable eslint for this file
/* eslint-disable */
import { React, useState } from 'react'
import { Chart } from 'react-google-charts';
import { Box, CircularProgress, Tabs, Tab } from '@mui/material/';
import HeatMap from './HeatMap';
import parse from 'html-react-parser';

import './ChartComponent.css';

function InnerChart({ chartData, chartIndex }) {
  // Show CircleProgress or not
  let [circleProgress, displayCircleProgress] = useState(true);
  const options = {
    theme: 'material',
    backgroundColor: { fill: chartData.backgroundColorFill ?? 'transparent' },
    chartArea: { width: '80%', height: '70%' },
    vAxis: {
      format: chartData.vAxisFormat ?? 'decimal',
      title: chartData.vAxisTitle,
      viewWindow: {
        min: chartData.vAxisMin
      },
      titleTextStyle: {
        italic: false
      }
    },
    hAxis: {
      format: chartData.hAxisFormat,
      title: chartData.hAxisTitle,
      viewWindow: {
        min: chartData.hAxisMin
      },
      titleTextStyle: {
        italic: false
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
    areaOpacity: chartData.areaOpacity,
    tooltip: {
      isHtml: true,
    },
    calendar: {
      cellSize: scaleCalendar(5, 20) // calculate cell size for calendar chart
    },
    noDataPattern: {
      backgroundColor: 'none',
      color: 'none',
    },
    enableInteractivity: chartData.enableInteractivity,
    pointSize: chartData.pointSize,
    trendlines: chartData.trendlines,
    region: chartData.region
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
      width={chartData.chartType == 'Calendar' ? '100vw' : '100%'}>
      {circleProgress && <CircularProgress sx={{ display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }} />}
      <Chart
        chartType={chartData.chartType}
        chartWrapperParams={{
          view: { columns: chartData.columns },
        }}
        spreadSheetUrl={`https://docs.google.com/spreadsheets/d/${chartData.sheetId}`}
        spreadSheetQueryParameters={{
          headers: chartData.headers,
          gid: Array.isArray(chartData.gid) ? chartData.gid[chartIndex] : chartData.gid,
          query: chartData.query,
        }}
        options={options}
        chartEvents={chartEvents}
      />
    </Box>
  );
}

export default function ChartComponent({ chartData }) {
  // Case HeatMap
  if (chartData.chartType == 'HeatMap') {
    return (
      <HeatMap
        chartData={chartData}
      />
    );
  }

  // Case WebsiteEmbed
  else if (chartData.chartType == 'WebsiteEmbed') {
    return (
      <iframe src="https://nyuadair.com/historical#historical-graph-wrapper" width="100%" height="100%"></iframe>
    );
  }

  // All the other chart types using React-Google-Chart wrapper
  // If there are multiple charts 
  if (Array.isArray(chartData.gid)) {
    const array = chartData.gid;

    // Props for tab panels (multiple data visualizations in the same chart area, navigate with tab panels)
    const [indexValue, setIndexValue] = useState(0); // start with the first elem

    const handleChange = (event, newValue) => {
      setIndexValue(newValue);
    };

    return (
      <Box width="100%" height="100%">
        <Tabs
          value={indexValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{ mb: 2 }}
        >
          {array.map((element, index) => (
            <Tab
              key={index}
              value={index}
              label={array[index]}
            />
          ))}
        </Tabs>
        <Box height="100%">
          {array.map((element, index) => (
            <Box
            key={index}
            height="100%"
            role="tabpanel"
            hidden={indexValue !== index}
          >
              <InnerChart chartData={chartData} chartIndex={index}/>
            </Box>
          ))}
        </Box>
      </Box>

    );
  }
  // If there is only one single chart
  else return (
    <InnerChart chartData={chartData}/>
  );
}