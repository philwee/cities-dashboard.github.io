// disable eslint for this file
/* eslint-disable */
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress } from '@mui/material/';

function CalendarChart({ chartData, chartProps, isPortrait }) {
  const [chartHeight, setChartHeight] = useState('100%');
  const [circleProgress, displayCircleProgress] = useState(true);

  const updateChartHeight = (chartWrapper) => {
    // from the chartWrapper, querySelector is used to select the first 'g' element in the svg.
    const chartContainer = chartWrapper.container.querySelector('svg > g:nth-of-type(1)');
    const renderedHeight = chartContainer.getBBox().height;
    const hasLegend = (chartProps.options.legend?.position === "none") ? false : true;
    setChartHeight(renderedHeight * (hasLegend ? 1.05 : 1.15)); // additional 5% or 15% for padding depends on if there is a legend
  };

  const scaleCalendar = (min, max) => {
    const cellSize = (window.innerWidth * 0.98) / 58;
    return Math.min(Math.max(cellSize, min), max);
  };

  chartProps.options = {
    ...chartProps.options,
    calendar: {
      cellSize: scaleCalendar(5, 20), // calculate cell size for calendar chart
      yearLabel: {
        fontSize: scaleCalendar(5, 20) * 2
      },
      daysOfWeek: isPortrait ? '' : 'SMTWTFS' // hide dayOfWeek label on mobile to save space
    },
    noDataPattern: {
      backgroundColor: 'none',
      color: 'none',
    },
  };

  return (
    <Box
      position="relative"
      className={chartData.chartType}
      height={chartHeight}
      marginLeft="-0.5rem"
      width="100vw"
    >
      {circleProgress && (
        <CircularProgress
          sx={{
            display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',
          }}
        />
      )}
      <Chart
        style={{ margin: 'auto' }}
        {...chartProps}
        chartEvents={[
          {
            eventName: 'ready',
            callback: ({ chartWrapper }) => {
              updateChartHeight(chartWrapper.getChart());
              displayCircleProgress(false);
            }
          }
        ]}
      />
    </Box>
  );
}

export default CalendarChart;
