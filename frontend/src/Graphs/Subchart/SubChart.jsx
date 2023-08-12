/* eslint-disable */

import { useState, useEffect, useContext } from 'react';

import { GoogleContext } from '../../ContextProviders/GoogleContext';

import { isMobile } from 'react-device-detect';
import { Box, CircularProgress } from '@mui/material/';

import { useTheme } from '@mui/material/styles';
import HeatMap from '../HeatMap';
import SeriesSelector from './SeriesSelector';

import { fetchDataFromSheet, generateRandomID, returnGenericOptions } from '../GoogleChartHelper';

import ResponsiveCalendarChart from '../ResponsiveCalendarChart';

import SubChartStyleWrapper from './SubChartStyleWrapper';

export default function SubChart(props) {
  const { chartData, subchartIndex, windowSize, isPortrait, isHomepage } = props;

  if (chartData.chartType === 'Calendar') {
    return (
      <SubChartStyleWrapper>
        <ResponsiveCalendarChart
          {...props}
        />
      </SubChartStyleWrapper>
    );
  }

  // Formulate the className
  const className = chartData.customClassName ? `${chartData.chartType} ${chartData.customClassName}` : chartData.chartType;

  // Special return for 'HeatMap' chartType
  if (chartData.chartType === 'HeatMap') {
    return (
      <Box
        position="relative"
        className={className}
        height={chartData.height}
        maxWidth={chartData.maxWidth ? chartData.maxWidth : '100%'}
        width="100%"
        sx={{ pt: 2, pb: 2, margin: 'auto' }}
      >
        <HeatMap
          publishedSheetId={chartData.publishedSheetId}
          gid={chartData.gid || chartData.subcharts[subchartIndex].gid || null}
          range={
            chartData.range || chartData.subcharts[subchartIndex].range || null
          }
        />
      </Box>
    );
  }

  const [chartWrapper, setChartWrapper] = useState(null);
  const [google, _] = useContext(GoogleContext);

  // Get the current theme
  const theme = useTheme();

  // Property to determine if this is the first time the chart is rendered
  // to show/hide the loading CircularProgress
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Keep track of the columns (series) of the chart
  const [dataColumns, setDataColumns] = useState([]);


  // Properties for chart control (if existed)
  let showControl = false;
  const deviceType = isMobile ? 'mobile' : 'desktop';
  // Only show the chart control if:
  // It exists in the database (either for all subcharts or just for a particular subchart)
  // And if the chart is currently not shown on homePage
  let chartControl = chartData.control || chartData.subcharts?.[subchartIndex].control;
  if (chartControl && (isHomepage !== true)) {
    showControl = true;
    // Control is different for mobile and desktop if deviceType as a key exists in the database
    if (chartControl[deviceType]) chartControl = chartControl[deviceType];
  }

  // const chartProps = {

  //   chartEvents,
  //   // if the filter prop exists and it's not a chart on homepage:
  //   // add the packages and control props below
  //   ...(
  //     showControl ? {
  //       chartPackages: ['corechart', 'controls'],
  //       controls: [
  //         chartControl
  //       ]
  //     } : {}
  //   )
  // };

  // Define the DOM container's ID for drawing the google chart inside
  const [randomID, setRandomID] = useState(generateRandomID());

  // Get the generic options for chart
  const options = returnGenericOptions({ ...props, theme, showControl });

  // Properties for selecting (showing or hiding) the serie(s)
  const seriesSelector = options.seriesSelector || false;

  // Set new options prop and re-render the chart if theme or isPortrait changes
  useEffect(() => {
    if (seriesSelector) handleSeriesSelection(dataColumns); // this function set new options, too
    else {
      chartWrapper?.setOptions(options);
      chartWrapper?.draw();
    }
  }, [theme, isPortrait, windowSize]);


  const getInitialColumns = (chartWrapper) => {
    // Update the initial DataView's columns (often, all of the series are displayed initially)
    const dataTable = chartWrapper.getDataTable();
    var initialView = chartWrapper.getView();
    // If (optional) columns is not specified in database
    // Assign it from DataTable
    if (initialView.columns == null) {
      const viewFromDataTable = new google.visualization.DataView(dataTable);
      chartWrapper.setView({
        columns: viewFromDataTable.columns
      });
      initialView = chartWrapper.getView();
    }

    var shouldAssignDomainRoleToFistColumn = true; // variable to only assign type: 'domain' to the very first column
    const allInitialColumns = initialView.columns.map((col, index) => {
      const sourceColumn = (typeof col === 'number') ? col : col.sourceColumn;
      const columnLabel = dataTable.getColumnLabel(sourceColumn);

      // A column can either be a number (that denotes the index of the sourceColumn) or an object
      // The code below harmonize all columns to be an object to store crucial data to toggle their visibility
      var col = (typeof col === 'number')
        ? {
          label: columnLabel,
          role: shouldAssignDomainRoleToFistColumn ? 'domain' : 'data',
          sourceColumn: sourceColumn,
          originalColumnIndex: index
        }
        : { label: columnLabel, originalColumnIndex: index, ...col };
      shouldAssignDomainRoleToFistColumn = shouldAssignDomainRoleToFistColumn && false;

      // Set the visibility of data column, initially, all data columns are selected
      if (col.role === 'data') col.selected = true;
      return col;
    });


    // To track selection, only get the columns that are:
    // role === 'data'
    // visibleInLegend !== false
    const dataColumns = allInitialColumns.filter((col, index) => {
      return col.role === 'data' && options.series?.[index - 1]?.visibleInLegend !== false;
    });
    console.log(dataColumns)
    setDataColumns(dataColumns);
  };

  const handleSeriesSelection = (newDataColumns) => {
    setDataColumns(newDataColumns);

    const hiddenSeriesObject = {};
    newDataColumns.forEach((col) => {
      if (!col.selected)
        hiddenSeriesObject[col.originalColumnIndex - 1] = {
          color: 'transparent',
          enableInteractivity: false,
          visibleInLegend: false
        }; // 'hide' the serie, using col.originalColumnIndex - 1 because sourceColumnIndex 0 is the domain
    });

    chartWrapper?.setOptions({
      ...options,
      series: {
        ...options.series,
        ...hiddenSeriesObject
      }
    });

    // Call draw to apply the new DataView and 'refresh' the chart
    chartWrapper?.draw();
  };

  // Call this function to fetch the data and draw the initial chart
  useEffect(() => {
    if (google && !chartWrapper) {
      fetchDataFromSheet({ chartData: chartData, subchartIndex: subchartIndex })
        .then(response => {
          const dataTable = response.getDataTable();
          const wrapper = new google.visualization.ChartWrapper({
            chartType: chartData.chartType,
            dataTable: dataTable,
            options: options,
            view: {
              columns:
                chartData.columns
                || (chartData.subcharts
                  && chartData.subcharts[subchartIndex].columns)
                || null
                || null,
            },
            containerId: randomID
          });
          setChartWrapper(wrapper);
          google.visualization.events.addListener(wrapper, 'ready', onChartReady);

          wrapper.draw();
          if (seriesSelector) getInitialColumns(wrapper);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [google]);

  const onChartReady = () => {
    if (!isFirstRender) return;
    // Hide the circleProgress when chart finishes rendering the first time
    setIsFirstRender(false);
  };

  // On homepage, allow rightclick on google chart component
  useEffect(() => {
    if (!isFirstRender && chartWrapper) {
      const chart = chartWrapper.getChart();
      google.visualization.events.addListener(chart, 'rightclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    }
  }, [isFirstRender])

  return (
    <Box height="100%">
      {seriesSelector && (
        <SeriesSelector
          items={dataColumns}
          selectorID={`${chartData.title}-selector`}
          onSeriesSelection={handleSeriesSelection}
        />
      )}
      <SubChartStyleWrapper
        isPortrait={isPortrait}
        className={className}
        height="100%"
      >
        {isFirstRender && (
          <CircularProgress
            sx={{
              display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',
            }}
          />
        )}
        <Box id={randomID} sx={{
          height: "100%"
        }} />
      </SubChartStyleWrapper>
    </Box>

  );
}