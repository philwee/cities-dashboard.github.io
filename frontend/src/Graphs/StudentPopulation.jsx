/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useTheme, styled } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

/**
 * styled component to apply custom styles to the Student Population chart
 * @param {object} theme the theme object
 * @returns {object} the styled component
 * Used to apply some styles based on the theme
 * Also used to style the custom HTML tooltips to match Google's default tooltips
 */
const ChartStyleWrapper = styled(Box)(({ theme }) => ({
  // Styles for dark theme only
  ...(theme.palette.mode === 'dark' && {
    filter: 'saturate(0.85)',
    '& .line-chart-iframe': {
      filter: 'invert(0.848) hue-rotate(180deg)',
    },
  }),
  // Styles for Google Charts' HTML tooltip (can't be formatted using options parameter)
  '& .google-visualization-tooltip': {
    width: 'unset',
    height: 'unset',
    borderRadius: '0.25rem',
    pointerEvents: 'none', // Prevent tooltip flickering
  },
  // Styles for the chart controls
  '& [id^=googlechart-control]': {
    opacity: 0.75,
    filter: 'saturate(0.25)',
    height: '80px !important', // Adjusted size
    maxWidth: '80%', // Limit the width
    backgroundColor: theme.palette.background.paper, // Match the theme
    margin: '0.5rem auto', // Center the controls
  },
  // Adjust the stroke style of paths and rectangles in the chart for better visibility
  '& path[stroke-opacity="0.3"], path[stroke-opacity="0.1"], path[stroke-opacity="0.05"], rect[stroke-opacity]': {
    stroke: theme.palette.text.primary,
    strokeWidth: 3,
  },
  // Add a hover effect to non-empty column elements to indicate interactivity
  // May not be necessary but is included for consistency
  '& [column-id]:not(:empty)': {
    cursor: 'pointer',
    ':hover': {
      fontWeight: 600,
    },
  },
}));

/**
 * Component to render the Student Population chart
 * @param {object} options from the temp_database file for the chart
 * @returns {object} the Student Population chart
  */
function StudentPopChart({ options }) {
  const [chartData, setChartData] = useState([]);
  /**
   * Use a state for chart options to allow for dynamically
   * adjusting to orientation and theme changes
   */
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const isPortrait = useMediaQuery('(orientation: portrait)');
  // State to detect when orientation is determined since determining orientation
  // takes longer than fetching data and rendering the chart
  const [isOrientationDetected, setIsOrientationDetected] = useState(false);

  // Hook to detect when orientation is determined
  useEffect(() => {
    setIsOrientationDetected(true);
  }, [isPortrait]);

  /**
   * Don't fetch data until orientation is detected
   * This prevents unnecessary re-renders and calls to the API
   * to fetch the data required by the chart
    */
  useEffect(() => {
    if (!isOrientationDetected) {
      return;
    }

    /**
     * Each object in the array represents a column in the chart
     * Required primarily for the HTML tooltips and chart controls
     */
    const columns = [
      { type: 'date', label: 'Term Date' },
      { type: 'number', label: 'New First Year Cohort Size' },
      { type: 'string', role: 'tooltip', p: { html: true } },
      { type: 'number', label: 'Undergrads Abroad' },
      { type: 'string', role: 'tooltip', p: { html: true } },
      { type: 'number', label: 'Visiting Students' },
      { type: 'string', role: 'tooltip', p: { html: true } },
      { type: 'number', label: 'Approx. Students on Campus' },
      { type: 'string', role: 'tooltip', p: { html: true } },
      { type: 'string', role: 'style' },
    ];

    /**
     * Fetch the data from the Google Sheets API and process it into the format
     * required by the chart for the HTML tooltips and chart controls
     * Also set the initial chart options according to the theme and orientation
     */
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1xRuDQem0jvTil1MfXXI4sptWU37Q53VkTwVunqdnSY0/values/VizData!A:Q?key=AIzaSyCjVRS9swFZFN8FQq9ChM0FHWb_kRc0LCI')
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.values.slice(1).map((row) => {
          const termName = row[0]; // Term Name
          const termDate = new Date(row[16]); // Term Date
          const colB = parseFloat(row[1]); // First Year Cohort Size
          const colD = parseFloat(row[3]); // Undergrads Abroad
          const colE = parseFloat(row[4]); // Visiting Students
          const colJ = parseFloat(row[9]); // Approx. Students on Campus

          let tooltipB = `<div class="google-visualization-tooltip">
            <ul class="google-visualization-tooltip-item-list">
              <li class="google-visualization-tooltip-item">
                <b>Term:</b> ${termName} <br>
                <b>New First Year Cohort Size:</b> ${colB}
              </li>
            </ul>
          </div>`;

          let tooltipD = `<div class="google-visualization-tooltip">
            <ul class="google-visualization-tooltip-item-list">
              <li class="google-visualization-tooltip-item">
                <b>Term:</b> ${termName} <br>
                <b>Undergrads Abroad:</b> ${colD}
              </li>
            </ul>
          </div>`;

          let tooltipE = `<div class="google-visualization-tooltip">
            <ul class="google-visualization-tooltip-item-list">
              <li class="google-visualization-tooltip-item">
                <b>Term:</b> ${termName} <br>
                <b>Visiting Students:</b> ${colE}
              </li>
            </ul>
          </div>`;

          let tooltipJ = `<div class="google-visualization-tooltip">
            <ul class="google-visualization-tooltip-item-list">
              <li class="google-visualization-tooltip-item">
                <b>Term:</b> ${termName} <br>
                <b>Approx. Students on Campus:</b> ${colJ}
              </li>
            </ul>
          </div>`;

          /**
           * Add a note to the tooltip for Spring 2020, Fall 2020, and Spring 2021
           * to indicate that the data may not be accurate due to Covid-19
           * The note has a different color and a warning icon to make it stand out
           */
          const errorIcon = `
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          `;

          // Adding covid note to the tooltip for Spring 2020, Fall 2020, and Spring 2021
          // Change the datapoint colors for the semesters to make them stand out
          // Done so for the approx. students on campus line / column
          let pointColorJ = null;
          if (termName === 'Spring 2020') {
            const covidNote = `<li class="google-visualization-tooltip-item" style="color: #FF5733;"> ${errorIcon} The Covid-19 pandemic caused significant disruptions in March 2020, resulting in a reduced student population on campus.</li>`;
            tooltipB = tooltipB.replace('</ul>', `${covidNote}</ul>`);
            tooltipD = tooltipD.replace('</ul>', `${covidNote}</ul>`);
            tooltipE = tooltipE.replace('</ul>', `${covidNote}</ul>`);
            tooltipJ = tooltipJ.replace('</ul>', `${covidNote}</ul>`);

            pointColorJ = '#ff7f0e';
          }

          if (termName === 'Fall 2020') {
            const housingNote = `<li class="google-visualization-tooltip-item" style="color: #FF5733;"> ${errorIcon} Due to remote learning, these numbers may not be truly accurate. There were approximately 760 total students residing on campus, comprising 680 undergraduates, 7 masters students, and 75 Global PhD students.</li>`;
            tooltipJ = tooltipJ.replace('</ul>', `${housingNote}</ul>`);
            pointColorJ = '#ff7f0e';
          }

          if (termName === 'Spring 2021') {
            const housingNote = `<li class="google-visualization-tooltip-item" style="color: #FF5733;"> ${errorIcon} Due to remote learning, these numbers may not be truly accurate. There were approximately 1260 total students residing on campus, including 1176 undergraduates, 7 masters students, and 75 Global PhD students.</li>`;
            tooltipJ = tooltipJ.replace('</ul>', `${housingNote}</ul>`);
            pointColorJ = '#ff7f0e';
          }

          // Set initial options for the chart
          // Can be changed later based on orientation and theme
          setChartOptions({
            ...options,
            theme: 'material',
            chartArea: {
              width: '80%',
              left: isPortrait ? '15%' : 'auto',
              height: '80%'
            },
            height: '500px',
            backgroundColor: { fill: 'transparent' },
            tooltip: {
              isHtml: true,
              showColorCode: true,
            },
            curveType: 'function',
            legend: isPortrait ? {
              alignment: 'center',
              position: 'top',
              maxLines: 3,
              scrollArrows: {
                activeColor: theme.palette.chart.axisTitle,
                inactiveColor: theme.palette.text.secondary,
              },
            } : {
              alignment: 'start',
              position: 'right',
              scrollArrows: {
                activeColor: theme.palette.chart.axisTitle,
                inactiveColor: theme.palette.text.secondary,
              },
            },
            vAxis: {
              ...options.vAxis,
              format: 'decimal',
              title: options.vAxis?.title ?? '',
              titleTextStyle: {
                color: theme.palette.chart.axisTitle,
                italic: false,
                bold: true,
                fontSize: isPortrait ? 10 : 12,
              },
              viewWindow: {
                min: options.vAxis?.viewWindow?.min ?? 0,
              },
              gridlines: {
                color: theme.palette.mode === 'dark' ? '#555' : '#ccc',
                count: -1,
              },
              minorGridlines: {
                count: 0,
              },
            },
            hAxis: {
              ...options.hAxis,
              title: options.hAxis?.title ?? '',
              textPosition: 'out',
              titleTextStyle: {
                color: theme.palette.chart.axisTitle,
                italic: false,
                bold: true,
                fontSize: isPortrait ? 10 : 12,
              },
            },

          });

          return [
            termDate,
            colB, tooltipB,
            colD, tooltipD,
            colE, tooltipE,
            colJ, tooltipJ, pointColorJ
          ];
        });

        setChartData([columns, ...processedData]);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Even in case of error, set loading to false
      });
  }, [isOrientationDetected]);

  // Change chart options on orientation and theme changes
  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      legend: {
        ...prevOptions.legend,
        alignment: isPortrait ? 'center' : 'start',
        position: isPortrait ? 'top' : 'right',
        maxLines: 3,
      },
      // Shrink the chart a little to allow vAxis labels to fit
      chartArea: {
        ...prevOptions.chartArea,
        width: isPortrait ? '75%' : '80%',
        left: isPortrait ? '15%' : 'auto',
      },
      hAxis: {
        ...prevOptions.hAxis,
        titleTextStyle: {
          ...prevOptions.hAxis?.titleTextStyle,
          color: theme.palette.chart.axisTitle,
          fontSize: isPortrait ? 10 : 12,
        },
      },
      vAxis: {
        ...prevOptions.vAxis,
        titleTextStyle: {
          ...prevOptions.vAxis?.titleTextStyle,
          color: theme.palette.chart.axisTitle,
          fontSize: isPortrait ? 10 : 12,
        },
        textStyle: {
          ...prevOptions.vAxis?.textStyle,
          fontSize: isPortrait ? 10 : 12,
        },
        gridlines: {
          ...prevOptions.vAxis?.gridlines,
          color: theme.palette.mode === 'dark' ? '#555' : '#ccc',
          count: -1,
        },
      },
    }));
  }, [isPortrait, theme.palette.mode]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ChartStyleWrapper theme={theme}>
      <Chart
        chartType="LineChart"
        data={chartData}
        options={chartOptions}
        controls={isPortrait ? [
          {
            controlType: 'DateRangeFilter',
            options: {
              filterColumnIndex: 0,
              ui: {
                label: '',
                format: { pattern: 'yyyy' },
              },
            },
            controlPosition: 'bottom',
          },
        ] : [
          {
            controlType: 'ChartRangeFilter',
            options: {
              filterColumnIndex: 0,
              ui: {
                chartType: 'LineChart',
                snapToData: true,
                chartOptions: {
                  backgroundColor: { fill: theme.palette.mode === 'dark' ? 'transparent' : '#f6f6f6' },
                  chartArea: { width: '95%', height: '50%' },
                  hAxis: {
                    baselineColor: 'none',
                    textPosition: 'out',
                    // Change label colors based on theme
                    textStyle: {
                      color: theme.palette.chart.axisTitle,
                    },
                  },
                  colors: [
                    '#1f77b4',
                    '#a778c2',
                    '#2ca02c',
                    '#e74c3c'
                  ],
                },
              },
            },
            controlPosition: 'bottom',
          },
        ]}
        rootProps={{ 'data-testid': '1' }}
      />
    </ChartStyleWrapper>
  );
}

export default StudentPopChart;
