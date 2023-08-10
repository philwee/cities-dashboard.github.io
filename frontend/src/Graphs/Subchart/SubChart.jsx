/* eslint-disable */

import { useState, useCallback, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Box, CircularProgress } from '@mui/material/';

import { useTheme } from '@mui/material/styles';
import HeatMap from '../HeatMap';
import CalendarChart from '../ResponsiveCalendarChart';
import Chart from 'react-google-charts';
import SeriesSelector from './SeriesSelector';

import SubChartStyleWrapper from './SubChartStyleWrapper';

const chartFilterHeightInPixel = 50;

const hideAnnotations = {
  stem: {
    length: 0,
  },
  textStyle: {
    opacity: 0,
  },
  boxStyle: null,
};

export default function SubChart({ chartData, chartSubIndex, windowSize, isPortrait, isHomepage }) {
  const [dataTable, setDataTable] = useState();
  // Store the chartWrapper reference
  const [chartWrapperRef, setChartWrapperRef] = useState();

  const handleGoogleChartLibraryLoad = (chartWrapper, google) => {
    const handleQueryResponse = (response) => {
      if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
      }
      chartWrapper.setDataTable(response.getDataTable());
      setDataTable(dataTable);
      chartWrapper.draw();
    };

    const params =
      chartSubIndex == null
        ? {
          headers: chartData.headers,
          query: chartData.query,
          gid: chartData.gid,
        }
        : {
          headers:
            chartData.headers
            || chartData.subcharts[chartSubIndex].headers
            || null,
          query:
            chartData.query
            || chartData.subcharts[chartSubIndex].query
            || null,
          gid:
            chartData.gid
            || chartData.subcharts[chartSubIndex].gid
            || null,
        };
    const url = `https://docs.google.com/spreadsheets/d/${chartData.sheetId}/gviz/tq?gid=${params.gid}&headers=${params.headers}&tq=${params.query && encodeURIComponent(params.query)}`;
    const query = new google.visualization.Query(url);
    query.send(handleQueryResponse);
  };

  // Formulate the className
  const className = chartData.customClassName ? `${chartData.chartType} ${chartData.customClassName}` : chartData.chartType;
  // Get the current theme
  const theme = useTheme();

  // Property to determine if this is the first time the chart is rendered
  // to show/hide the loading CircularProgress
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Keep track of the columns (series) of the chart
  const [dataColumns, setDataColumns] = useState([]);

  // Options object for the chart
  const [chartOptions, setChartOptions] = useState();

  // Define some shared styling rules for the chart
  const responsiveFontSize = isPortrait ? 9 : 12;
  const responsiveFontSizeSmall = isPortrait ? 7 : 10;
  const axisTitleTextStyle = {
    italic: false,
    bold: true,
    color: theme.palette.chart.axisTitle,
    fontSize: responsiveFontSize
  };
  const axisTextStyle = {
    color: theme.palette.chart.axisText,
    fontSize: responsiveFontSize
  };

  // Properties for chart control (if existed)
  let showControl = false;
  const deviceType = isMobile ? 'mobile' : 'desktop';
  // Only show the chart control if:
  // It exists in the database (either for all subcharts or just for a particular subchart)
  // And if the chart is currently not shown on homePage
  let chartControl = chartData.control || chartData.subcharts?.[chartSubIndex].control;
  if (chartControl && (isHomepage !== true)) {
    showControl = true;
    // Control is different for mobile and desktop if deviceType as a key exists in the database
    if (chartControl[deviceType]) chartControl = chartControl[deviceType];
  }

  // ---- Formulate the options for this specific chart:
  // 1. Populate first with subchart's options (if any)
  let options = chartData.subcharts?.[chartSubIndex].options
    ? { ...chartData.subcharts[chartSubIndex].options }
    : {};

  // 2. Append own chart's options and then populate with universal options for all charts
  options = {
    ...options,
    ...chartData.options,
    theme: 'material',
    curveType: options.curveType || chartData.options?.curveType || 'function',
    crosshair: { orientation: 'both', trigger: 'focus', opacity: 0.5 },
    backgroundColor: { fill: 'transparent' },
    chartArea: {
      ...chartData.options?.chartArea,
      width: isPortrait ? (chartData.options?.chartArea?.width?.portrait || '80%') : (chartData.options?.chartArea?.width?.landscape || '75%'),
      height: isPortrait ? '60%' : '70%'
    },
    width: isPortrait ? (chartData.options?.width?.portrait || '100%') : (chartData.options?.width?.landscape || '100%'),
    // if there is a filter, we make space for the chartFilter from the chart's height.
    // value is divided in 2 because the calculation is applied twice due to
    // how react-google-charts nest components
    height: showControl ? `calc(100% - (${chartFilterHeightInPixel}px / 2))` : '100%',
    tooltip: {
      isHtml: true,
      showColorCode: false
    },
    legend: {
      backgroundColor: '#fff',
      alignment: isPortrait ? 'center' : 'start',
      position:
        chartData.options?.legend?.position
        ?? (isPortrait ? 'top' : 'right'),
      scrollArrows: {
        activeColor: theme.palette.chart.axisTitle,
        inactiveColor: theme.palette.text.secondary,
      },
      pagingTextStyle: {
        fontSize: 12,
        color: theme.palette.chart.axisTitle,
        bold: true,
      }
    }
  };

  // 3. Append to vAxis and hAxis properties
  options.vAxis = {
    ...options.vAxis,
    format: options.vAxis?.format ?? 'decimal',
    title: options.vAxis?.title ?? '',
    viewWindow: {
      min: options.vAxis?.viewWindow?.min ?? 0,
    },
  };
  options.hAxis = {
    ...options.hAxis,
    title: options.hAxis?.title ?? '',
  };
  // 3.1. If in portrait mode, slant the text of the hAxis
  if (isPortrait) {
    options.hAxis = {
      ...options.hAxis,
      slantedText: true,
      slantedTextAngle: 30,
    };
  }

  // 4. Override with custom colors:
  // 4.1. Color scheme of all the series of this chart
  if (typeof options.colors === 'string' || !options.colors) options.colors = theme.palette.chart.optionsColors[options.colors || 'multiColor'];
  // 4.2. Individual color of a single serie (if given)
  if (options.series) {
    Object.values(options.series).forEach((_serie) => {
      const serie = _serie;
      if (serie.color === 'default') {
        serie.color = theme.palette.primary.main;
      }
    });
  }
  // 4.3. Color of the trendline
  if (options.trendlines) {
    options.trendlines.forEach((_item) => {
      const item = _item;
      item.color = theme.palette.primary.main;
    });
  }
  // 4.4. Color axis of the Calendar chart
  if (options.colorAxis) {
    switch (options.colorAxis.colors) {
      case 'matchingColor':
        options.colorAxis.colors = [
          theme.palette.chart.colorAxisFirstColor,
          theme.palette.chart.optionsColors.multiColor[options.colorAxis.colorIndex],
        ];
        break;
      case 'default':
        options.colorAxis.colors = [
          theme.palette.chart.colorAxisFirstColor,
          theme.palette.NYUpurple,
        ];
        break;
      case 'aqi':
        options.colorAxis = theme.palette.chart.aqiColorAxis;
        break;
      default:
        break;
    }
  }
  // 4.5. Colors of other elements of the chart (typographies and gridlines)
  options.vAxis = {
    ...options.vAxis,
    titleTextStyle: axisTitleTextStyle,
    textStyle: axisTextStyle,
    gridlines: {
      ...options.vAxis?.gridlines,
      color: options.vAxis?.gridlines?.color || theme.palette.chart.gridlines
    },
    minorGridlines: { count: 0 },
  };
  options.hAxis = {
    ...options.hAxis,
    titleTextStyle: axisTitleTextStyle,
    textStyle: axisTextStyle,
    gridlines: {
      ...options.hAxis?.gridlines,
      color: options.hAxis?.gridlines?.color || theme.palette.chart.gridlines
    },
    minorGridlines: {
      ...options.hAxis?.minorGridlines,
      color: options.hAxis?.gridlines?.color || theme.palette.chart.gridlines,
    },
  };
  options.legend = {
    ...options.legend,
    textStyle: axisTextStyle,
  };
  options.annotations = {
    ...options.annotations,
    highContrast: true,
    textStyle: {
      color: theme.palette.primary.contrastText,
      fontSize: responsiveFontSizeSmall,
      opacity: 0.8
    },
    stem: {
      ...options.annotations?.stem,
      color: theme.palette.chart.axisTitle,
      thickness: 2
    },
    boxStyle: {
      rx: theme.shape.borderRadius, // rounded corners
      ry: theme.shape.borderRadius,
      fill: theme.palette.chart.annotationBoxFill,
      fillOpacity: 0.5
    },
  };

  // 5. If the chart is displayed on the homepage, override the options with:
  if (isHomepage) {
    options = {
      ...options,
      pointSize: 0,
      enableInteractivity: false,
      annotations: {
        ...options.annotations,
        ...hideAnnotations
      },
      legend: 'none',
      vAxis: {
        ...options.vAxis,
        textPosition: 'none',
        titleTextStyle: {
          ...options.vAxis.titleTextStyle,
          bold: false
        }
      },
      hAxis: {
        ...options.hAxis,
        textPosition: 'none',
        gridlines: { color: 'transparent', count: 0 },
        titleTextStyle: {
          ...options.hAxis.titleTextStyle,
          bold: false
        }
      },
    };
  }

  // Assign the appropriate controlOptions based on controlType (if existed)
  if (chartControl?.controlType === 'ChartRangeFilter') {
    chartControl.options.ui = {
      ...chartControl.options?.ui,
      chartType: chartData.chartType,
      snapToData: true,
      chartView: {
        columns:
          chartData.columns
          || (chartData.subcharts
            && chartData.subcharts[chartSubIndex].columns)
          || null
          || null,
      },
      chartOptions: {
        ...options,
        ...chartControl.options?.ui?.chartOptions,
        height: chartFilterHeightInPixel,
        hAxis: {
          ...chartControl.options?.ui?.chartOptions?.hAxis,
          textPosition: 'out',
          textStyle: { color: theme.palette.chart.axisText, fontSize: responsiveFontSizeSmall }
        },
        annotations: { ...hideAnnotations },
        legend: null,
      }
    };
  }

  // Set the chart's options once at the beginning
  useEffect(() => {
    setChartOptions(options);
  }, [isPortrait]);

  // works for isPortrait change, but the charts re-render again making it not changed
  useEffect(() => {
    // This function also setOptions without re-rendering
    handleSeriesSelection(dataColumns);
    // Code for when handleSeriesSelection is not turned on for this chart
    // ...
  }, [theme, isPortrait]);

  // When chart is ready
  const chartEvents = [
    {
      eventName: 'ready',
      callback: ({ chartWrapper }) => {
        console.log('ready')
        // ------ DO THE BELOW IF THIS IS THE FIRST TIME THE CHART IS RENDERED
        if (!isFirstRender) return;

        // Hide the circleProgress when chart finishes rendering the first time
        setIsFirstRender(false);

        // 
        getInitialColumns(chartWrapper);

        // If chart is on homepage, on right click, enable default context menu
        // eslint-disable-next-line no-undef
        if (isHomepage && google) {
          const chart = chartWrapper.getChart();
          // eslint-disable-next-line no-undef
          google.visualization.events.addListener(chart, 'rightclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
          });
        }
      }
    }
  ];

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
      (col.role === 'data') && (col.selected = true);
      return col;
    });

    // Only get the 'data' columns to track selection
    setDataColumns(allInitialColumns.filter(col => col.role === 'data'));

    setChartWrapperRef(chartWrapper);

  };

  const handleSeriesSelection = (newDataColumns) => {
    setDataColumns(newDataColumns);

    const hiddenSeriesObject = {};
    newDataColumns.forEach((col, index) => {
      if (!col.selected)
        hiddenSeriesObject[index] = {
          color: 'transparent',
          enableInteractivity: false,
          visibleInLegend: false
        }; // 'hide' the serie
    });

    chartWrapperRef?.setOptions({
      ...options,
      series: {
        ...options.series,
        ...hiddenSeriesObject
      }
    });

    // Call draw to apply the new DataView and 'refresh' the chart
    chartWrapperRef?.draw();
  };

  const chartProps = {
    getChartWrapper: (chartWrapper, google) => {
      handleGoogleChartLibraryLoad(chartWrapper, google);
    },
    data: dataTable,
    chartType: chartData.chartType,
    chartWrapperParams: {
      view: {
        columns:
          chartData.columns
          || (chartData.subcharts
            && chartData.subcharts[chartSubIndex].columns)
          || null
          || null,
      },
    },
    options: chartOptions,
    chartEvents,
    // if the filter prop exists and it's not a chart on homepage:
    // add the packages and control props below
    ...(
      showControl ? {
        chartPackages: ['corechart', 'controls'],
        controls: [
          chartControl
        ]
      } : {}
    )
  };

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
          gid={chartData.gid || chartData.subcharts[chartSubIndex].gid || null}
          range={
            chartData.range || chartData.subcharts[chartSubIndex].range || null
          }
        />
      </Box>
    );
  }

  if (chartData.chartType === 'Calendar') {
    return (
      <SubChartStyleWrapper>
        <CalendarChart
          chartData={chartData}
          chartProps={chartProps}
          isPortrait={isPortrait}
          showControl={showControl}
        />
      </SubChartStyleWrapper>
    );
  }

  return (
    <Box>
      <SeriesSelector
        items={dataColumns}
        selectorID={`${chartData.title}-selector`}
        onSeriesSelection={handleSeriesSelection}
      />
      <SubChartStyleWrapper
        isPortrait={isPortrait}
        position="relative"
        className={className}
        height="100%"
        width="100%"
      >
        {isFirstRender && (
          <CircularProgress
            sx={{
              display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',
            }}
          />
        )}
        <Chart {...chartProps} />
      </SubChartStyleWrapper>
    </Box>

  );
}
