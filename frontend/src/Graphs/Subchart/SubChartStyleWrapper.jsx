import { Box } from '@mui/material/';
import { styled } from '@mui/material/styles';

const SubChartStyleWrapper = styled(Box)(({ theme, isPortrait }) => ({
  // CSS for HTML tooltip
  '& .google-visualization-tooltip': {
    width: 'unset !important',
    maxWidth: '350px',
    height: 'unset',
    padding: '1em',
    fontSize: `${isPortrait ? 9 : 12}px`,
    color: theme.palette.chart.tooltip.text,
    background: theme.palette.chart.tooltip.background,
    borderRadius: theme.spacing(1 / 2),
    '& ul': {
      margin: '0 !important',
      '& li': {
        margin: '0 !important',
        padding: '0 !important',
        '& span': {
          fontSize: `${isPortrait ? 9 : 12}px !important`,
          color: `${theme.palette.chart.tooltip.text} !important`,
        }
      }
    }
  },
  '& .Calendar [dir]:not(:empty)': {
    margin: 'auto'
  },
  /* Modify the appearance of the Google chart's filter
  // (by selecting all divs with id containing the keyword below */
  '& [id^=googlechart-control]': {
    opacity: 0.75,
    filter: 'saturate(0.25)',
  },

  '& .google-visualization-controls-categoryfilter': {
    fontSize: '0.85rem',
    marginTop: '0.75rem',
    marginBottom: '-0.75rem',

    '& .google-visualization-controls-label': {
      color: theme.palette.text.secondary,
      verticalAlign: 'middle',
      marginBottom: '0.5rem'
    },
  },

  // CSS for DateRangeFilter-type filter charts to look consistent with our styling
  '& .google-visualization-controls-rangefilter': {
    width: '100%',
    fontSize: '0.75rem',
    '& .goog-inline-block': {
      width: '100%',
    },
    '& .google-visualization-controls-slider-horizontal': {
      width: '75%',
      margin: '0 12.5%',
    },
    '& .google-visualization-controls-rangefilter-thumblabel:nth-of-type(1)': {
      position: 'absolute',
      top: '1.5em',
      left: '12.5%'
    },
    '& .google-visualization-controls-rangefilter-thumblabel:nth-of-type(2)': {
      position: 'absolute',
      top: '1.5em',
      right: '12.5%'
    },
    '& .google-visualization-controls-slider-handle': {
      background: theme.palette.primary.main
    },
    '& .google-visualization-controls-rangefilter-thumblabel': {
      color: theme.palette.text.secondary,
      padding: 0
    },
    '& .google-visualization-controls-slider-thumb': {
      background: theme.palette.primary.main,
      border: 'unset',
      borderRadius: '4px'
    }
  },

  // These are the paths showing on top of the line chart
  // and the stroke around the bar/column chart
  // when the user hovers on the legend to make the serie stand out
  // by Google Chart's default doesn't change color based on light/dark theme, but we modify here:
  '& path[stroke-opacity="0.3"], path[stroke-opacity="0.1"], path[stroke-opacity="0.05"], rect[stroke-opacity]': {
    stroke: theme.palette.text.primary,
    strokeWidth: 3
  },

  // Cursor of series in legends
  '& [column-id]:not(:empty)': {
    cursor: 'pointer',
    ':hover': {
      fontWeight: 600
    }
  }
}));

export default SubChartStyleWrapper;
