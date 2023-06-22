// disable eslint for this file
/* eslint-disable */
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress } from '@mui/material/';
import { styled } from '@mui/material/';

const StyledChartWrapper = styled(Box)(({ theme }) => ({
  // Override React Google Charts to make Calendar chart truly responsive
  "& > div, & > div > div ": {
    width: "100% !important"
  },
  "& > div > div > div > div": {
    margin: "auto"
  }
}));

function CalendarChart({ chartData, chartProps, isPortrait }) {
  const [chartHeight, setChartHeight] = useState("200px");
  const [chartWidth, setChartWidth] = useState();
  const [circleProgress, displayCircleProgress] = useState(true);

  const updateChartHeight = (chartWrapper) => {
    // from the chartWrapper, querySelector is used to select the first 'g' element in the svg.
    const chartContainer = chartWrapper.container.querySelector('svg > g:nth-of-type(1)');
    const renderedHeight = chartContainer.getBBox().height;
    const renderedWidth = chartContainer.getBBox().width;

    const hasLegend = (chartProps.options.legend?.position === "none") ? false : true;
    setChartWidth(renderedWidth);
    setChartHeight(renderedHeight * (hasLegend ? 1.07 : 1.15)); // additional 7% or 15% for padding depends on if there is a legend
  };

  const calculateCalendarDimensions = ({ cellSizeMin, cellSizeMax }) => {
    const cellSize = Math.min(Math.max((window.innerWidth * 0.9) / 58, cellSizeMin), cellSizeMax);
    return {
      chartWidth: cellSize * 56, // fixed ratio
      cellSize: cellSize,
      yearLabelFontSize: cellSize * 2
    };
  };

  const calendarDimensions = calculateCalendarDimensions({ cellSizeMin: 10, cellSizeMax: 18 });

  chartProps.options = {
    ...chartProps.options,
    width: chartWidth ? chartWidth : calendarDimensions.chartWidth,
    calendar: {
      cellSize: calendarDimensions.cellSize,
      yearLabel: {
        fontSize: calendarDimensions.yearLabelFontSize
      },
      daysOfWeek: isPortrait ? '' : 'SMTWTFS' // hide dayOfWeek label on mobile to save space
    },
    noDataPattern: {
      backgroundColor: 'none',
      color: 'none',
    },
  };

  return (
    <StyledChartWrapper
      className={chartData.chartType}
      sx={{
        position: "relative",
        width: "100%",
        height: chartHeight,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
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
    </StyledChartWrapper>

  );
}

export default CalendarChart;
