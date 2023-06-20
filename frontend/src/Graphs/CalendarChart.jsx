import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress } from '@mui/material/';

function CalendarChart({ chartData, chartProps }) {
  const [chartHeight, setChartHeight] = useState('100%');
  const [circleProgress, displayCircleProgress] = useState(true);

  const updateChartHeight = (chartWrapper) => {
    // from the chartWrapper, querySelector is used to select the first 'g' element in the svg.
    const chartContainer = chartWrapper.container.querySelector('div > div:nth-child(1) > div > svg > g:nth-child(2)');
    const renderedHeight = chartContainer.getBBox().height;
    setChartHeight(renderedHeight * 1.15); // additional 15% for padding
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
