// disable eslint for this file
/* eslint-disable */
import { React, useState } from 'react'
import { Chart } from 'react-google-charts';
import { Box, CircularProgress} from '@mui/material/';
import HeatMap from './HeatMap';
import parse from 'html-react-parser';



import './ChartComponent.css';

export default function ChartComponent({ chartData }) {
  // Show CircleProgress or not
  let [circleProgress, displayCircleProgress] = useState(true);

  // Case HeatMap
  if (chartData.chartType == 'HeatMap') {
    return (
      <HeatMap
        chartData={chartData}
      />
    );
  }

  // Case: all the other chart types using React-Google-Chart wrapper
  const options = {
    theme: 'material',
    backgroundColor: { fill: 'transparent' },
    chartArea: { width: '80%', height: '70%' },
    vAxis: {
      format: chartData.vAxisFormat ?? 'decimal',
      title: chartData.vAxisTitle,
      viewWindow: {
        min: chartData.vAxisMin,
      },
    },
    hAxis: {
      format: chartData.hAxisFormat,
      title: chartData.hAxisTitle,
    },
    width: '100%',
    height: '100%',
    legend: chartData.legend ?? 'bottom',
    isStacked: chartData.isStacked ?? false,
    seriesType: chartData.seriesType,
    series: chartData.series,
    intervals: chartData.intervals,
    curveType: chartData.curveType ?? 'function',
    colors: chartData.colors,
    colorAxis: chartData.colorAxis,
    tooltip: {
      isHtml: false,
    },
    calendar: {
      cellSize: scaleCalendar(5, 20),
    },
    noDataPattern: {
      backgroundColor: 'none',
      color: 'none',
    },
    tooltip: { isHtml: true, trigger: "visible" }

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
    var cellSize = window.innerWidth / 70;
    return Math.min(Math.max(cellSize, min), max);
  }

  const url = `https://docs.google.com/spreadsheets/d/${chartData.sheetId}`;

  return (
    <Box position={'relative'} width='100%' height='100%'>
      {circleProgress && <CircularProgress sx={{display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto'}}/>}
      <Chart
        chartType={chartData.chartType}
        chartWrapperParams={{
          view: { columns: chartData.columns },
        }}
        spreadSheetUrl={url}
        spreadSheetQueryParameters={{
          headers: chartData.headers,
          gid: chartData.gid,
          query: chartData.query,
        }}
        options={options}
        chartEvents={chartEvents}
      />
    </Box>
      
  );
}
