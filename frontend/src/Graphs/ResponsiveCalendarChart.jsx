import { useState, useRef, useCallback } from 'react';
import { Box, CircularProgress, styled } from '@mui/material/';
import MemoizedChart from './MemoizedChart';

const StyledChartWrapper = styled(Box)({
  // Override React Google Charts to make Calendar chart truly responsive
  '& > div, & > div > div ': {
    width: '100% !important'
  },
  '& > div > div > div > div': {
    margin: 'auto'
  }
});

const calculateCalendarDimensions = ({ cellSizeMin, cellSizeMax }) => {
  const cellSize = Math.min(Math.max((window.innerWidth * 0.9) / 58, cellSizeMin), cellSizeMax);
  return {
    chartWidth: cellSize * 56, // fixed ratio
    cellSize,
    yearLabelFontSize: cellSize * 2
  };
};

function CalendarChart({ chartData, chartProps, isPortrait, showControl }) {
  const [chartTotalHeight, setChartTotalHeight] = useState(200);
  const chartHeight = useRef(0);
  const controlHeight = useRef(0);

  const [circleProgress, displayCircleProgress] = useState(true);

  const calculateChartTotalHeight = useCallback(() => {
    // early return if both values are not ready
    if (!chartHeight.current) return;
    if (showControl && !controlHeight.current) return;
    const hasLegend = chartProps.options.legend?.position !== 'none';

    let calculatedHeight = chartHeight.current * (hasLegend ? 1.07 : 1.15);
    calculatedHeight += controlHeight.current;

    setChartTotalHeight(calculatedHeight);
  }, [chartProps.options.legend?.position, showControl]);

  const updateChartHeight = useCallback((chartWrapper) => {
    // from the chartWrapper, querySelector is used to select the first 'g' element in the svg.
    const chartContainer = chartWrapper.container.querySelector('svg > g:nth-of-type(1)');
    const renderedHeight = chartContainer.getBBox().height;

    chartHeight.current = renderedHeight;

    calculateChartTotalHeight();
  }, [calculateChartTotalHeight]);

  const updateControlHeight = useCallback((controlWrapper) => {
    const controlContainer = controlWrapper.getControl().container;
    const renderedHeight = controlContainer.getBoundingClientRect().height;

    controlHeight.current = renderedHeight;

    calculateChartTotalHeight();
  }, [calculateChartTotalHeight]);

  const calendarDimensions = calculateCalendarDimensions({ cellSizeMin: 10, cellSizeMax: 18 });

  // When chart is ready
  const chartEvents = [
    {
      eventName: 'ready',
      callback: useCallback(({ chartWrapper }) => {
        updateChartHeight(chartWrapper.getChart());
        displayCircleProgress(false);
      }, [updateChartHeight])
    }
  ];

  const controlEvents = [
    {
      eventName: 'ready',
      callback: useCallback(({ controlWrapper }) => {
        updateControlHeight(controlWrapper);
      }, [updateControlHeight])
    },
    { eventName: 'statechange',
      callback: useCallback(({ controlWrapper }) => {
        updateControlHeight(controlWrapper);
      }, [updateControlHeight]),
    },
  ];

  const calendarChartProps = {
    ...chartProps,
    options: {
      ...chartProps.options,
      // overcompensate the height of chart SVG element. this is OK as
      // the chart container will clip the chart to it's expected height of {chartTotalHeight}
      height: '1000px',
      width: calendarDimensions.chartWidth,
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
    },
    chartEvents
  };

  // additional props if there is a controlFilter present
  if (showControl) {
    calendarChartProps.controls = [{
      ...calendarChartProps.controls[0],
      controlEvents,
    }];
  }

  return (
    <StyledChartWrapper
      className={chartData.chartType}
      sx={{
        position: 'relative',
        width: '100%',
        height: chartTotalHeight,
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
      <MemoizedChart chartProps={calendarChartProps} isPortrait={isPortrait} />
    </StyledChartWrapper>
  );
}

export default CalendarChart;
