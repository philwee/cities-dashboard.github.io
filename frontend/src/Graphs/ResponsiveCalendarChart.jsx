import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress, styled } from '@mui/material/';

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
  const [chartHeight, setChartHeight] = useState(200);
  const [controlHeight, setControlHeight] = useState(0);
  const [chartTotalHeight, setChartTotalHeight] = useState(200);
  const [chartWidth, setChartWidth] = useState();
  const [circleProgress, displayCircleProgress] = useState(true);

  const calculateChartTotalHeight = () => {
    if (!chartHeight) return; // don't calculate without main chart height
    // if theres a control but we haven't gotten value of control height yet,
    // then don't calculate total yet
    if (showControl && !controlHeight) return;

    const hasLegend = chartProps.options.legend?.position !== 'none';

    let calculatedHeight = chartHeight * (hasLegend ? 1.07 : 1.15);
    calculatedHeight += controlHeight;

    setChartTotalHeight(calculatedHeight);
  };

  const updateChartHeight = (chartWrapper) => {
    // from the chartWrapper, querySelector is used to select the first 'g' element in the svg.
    const chartContainer = chartWrapper.container.querySelector('svg > g:nth-of-type(1)');
    const renderedHeight = chartContainer.getBBox().height;
    const renderedWidth = chartContainer.getBBox().width;

    setChartHeight(renderedHeight);
    setChartWidth(renderedWidth);

    calculateChartTotalHeight();
  };

  const updateControlHeight = (controlWrapper) => {
    const controlContainer = controlWrapper.getControl().container;
    const renderedHeight = controlContainer.getBoundingClientRect().height;

    setControlHeight(renderedHeight);

    calculateChartTotalHeight();
  };

  const calendarDimensions = calculateCalendarDimensions({ cellSizeMin: 10, cellSizeMax: 18 });

  const calendarChartProps = chartProps;

  calendarChartProps.options = {
    ...calendarChartProps.options,
    height: chartTotalHeight,
    width: chartWidth || calendarDimensions.chartWidth,
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

  // additional props if there is a controlFilter present
  if (showControl) {
    calendarChartProps.controls = [{
      ...calendarChartProps.controls[0],
      controlEvents: [
        {
          eventName: 'ready',
          callback: (({ controlWrapper }) => {
            updateControlHeight(controlWrapper);
          })
        },
        { eventName: 'statechange',
          callback: (({ controlWrapper }) => {
            updateControlHeight(controlWrapper);
          }),
        },
      ],
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
      <Chart
        style={{ margin: 'auto' }}
        {...calendarChartProps}
        chartEvents={[
          {
            eventName: 'ready',
            callback: (({ chartWrapper }) => {
              updateChartHeight(chartWrapper.getChart());
              displayCircleProgress(false);
            })
          }
        ]}
      />
    </StyledChartWrapper>
  );
}

export default CalendarChart;
