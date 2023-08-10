import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Box, CircularProgress, styled } from '@mui/material/';
import MemoizedChart from './MemoizedChart';

const StyledChartWrapper = styled(Box)({
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
    chartWidth: cellSize * 56,
    cellSize,
    yearLabelFontSize: cellSize * 2
  };
};

function CalendarChart({ chartData, chartProps, isPortrait, showControl }) {
  const [chartTotalHeight, setChartTotalHeight] = useState(200);
  const chartHeight = useRef(0);
  const controlHeight = useRef(0);

  const [circleProgress, displayCircleProgress] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const currentRef = componentRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const hasLegend = useMemo(() => chartProps.options.legend?.position !== 'none', [chartProps.options.legend?.position]);

  const calculateChartTotalHeight = useCallback(() => {
    if (!chartHeight.current) return;
    if (showControl && !controlHeight.current) return;

    let calculatedHeight = chartHeight.current + (hasLegend ? 30 : 60);
    calculatedHeight += controlHeight.current;

    setChartTotalHeight(calculatedHeight);
  }, [hasLegend, showControl]);

  const updateChartHeight = useCallback((chartWrapper) => {
    if (!chartWrapper || !chartWrapper.container) return;
    const chartContainer = chartWrapper.container.querySelector('svg > g:nth-of-type(1)');
    const renderedHeight = chartContainer.getBBox().height;

    chartHeight.current = renderedHeight;
    calculateChartTotalHeight();
  }, [calculateChartTotalHeight]);

  const updateControlHeight = useCallback((controlWrapper) => {
    if (!controlWrapper || typeof controlWrapper.getControl !== 'function') return;
    const controlContainer = controlWrapper.getControl().container;
    const renderedHeight = controlContainer.getBoundingClientRect().height;

    controlHeight.current = renderedHeight;
    calculateChartTotalHeight();
  }, [calculateChartTotalHeight]);

  const calendarDimensions = calculateCalendarDimensions({ cellSizeMin: 10, cellSizeMax: 18 });

  const chartEvents = useMemo(() => [
    {
      eventName: 'ready',
      callback: ({ chartWrapper }) => {
        updateChartHeight(chartWrapper.getChart());
        displayCircleProgress(false);
      }
    }
  ], [updateChartHeight]);

  const controlEvents = useMemo(() => [
    {
      eventName: 'ready',
      callback: ({ controlWrapper }) => {
        updateControlHeight(controlWrapper);
      }
    },
    {
      eventName: 'statechange',
      callback: ({ controlWrapper }) => {
        updateControlHeight(controlWrapper);
      }
    },
  ], [updateControlHeight]);

  const calendarChartProps = useMemo(() => {
    const props = {
      ...chartProps,
      options: {
        ...chartProps.options,
        height: '1000px',
        width: calendarDimensions.chartWidth,
        calendar: {
          cellSize: calendarDimensions.cellSize,
          yearLabel: {
            fontSize: calendarDimensions.yearLabelFontSize
          },
          daysOfWeek: isPortrait ? '' : 'SMTWTFS'
        },
        noDataPattern: {
          backgroundColor: 'none',
          color: 'none',
        },
      },
      chartEvents
    };

    if (showControl) {
      props.controls = [{
        ...props.controls[0],
        controlEvents,
      }];
    }

    return props;
  }, [chartProps, calendarDimensions, chartEvents, controlEvents, isPortrait, showControl]);

  return (
    isVisible ? (
      <StyledChartWrapper
        ref={componentRef}
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
    ) : <div ref={componentRef} />
  );
}

export default CalendarChart;
