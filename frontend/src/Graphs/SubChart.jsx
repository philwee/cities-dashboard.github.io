// disable eslint for this file
/* eslint-disable */
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Box, CircularProgress } from '@mui/material/';

import HeatMap from './HeatMap';
import CalendarChart from './ResponsiveCalendarChart';

import { useTheme } from '@mui/material/styles';

const chartFilterHeightInPixel = 100;

const hideAnnotations = {
    stem: {
        length: 0,
    },
    textStyle: {
        opacity: 0,
    },
    boxStyle: null,
};


const SubChart = ({ chartData, chartSubIndex, isPortrait, isHomepage }) => {
    // Get the current theme
    const theme = useTheme();
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

    // Options object for the chart
    let options = {};
    // Show CircleProgress or not
    let [circleProgress, displayCircleProgress] = useState(true);

    switch (chartData.chartType) {
        case 'HeatMap':
            return (
                <Box
                    position={'relative'}
                    className={chartData.chartType}
                    height={chartData.height}
                    maxWidth={chartData.maxWidth ? chartData.maxWidth : '100%'}
                    width={'100%'}
                    sx={{ pt: 2, pb: 2, margin: 'auto' }}
                >
                    <HeatMap
                        publishedSheetId={chartData.publishedSheetId}
                        gid={chartData.gid || chartData.subcharts[chartSubIndex].gid || null}
                        range={
                            chartData.range || chartData.subcharts[chartSubIndex].range || null
                        }
                        height={chartData.height}
                    />
                </Box>
            );

        default:
            let showChartFilter = false;
            if ((chartData.filter != null || chartData.subcharts?.[chartSubIndex].filter != null) && (isHomepage == null || isHomepage == false)) showChartFilter = true;
            // ---- Formulate the options for this specific chart:
            // 1. Populate first with subchart's options (if any)
            options = chartData.subcharts?.[chartSubIndex].options
                ? { ...chartData.subcharts[chartSubIndex].options }
                : {};

            // 2. Append own chart's options and then populate with universal options for all charts
            options = {
                ...options,
                ...chartData.options,
                theme: 'material',
                crosshair: { orientation: 'both', trigger: 'focus', opacity: 0.5 },
                chartArea: {
                    width: isPortrait ? (chartData.options?.chartArea?.width?.portrait || '80%') : (chartData.options?.chartArea?.width?.landscape || '75%'),
                    height: isPortrait ? '60%' : '70%'
                },
                width: isPortrait ? (chartData.options?.width?.portrait || '100%') : (chartData.options?.width?.landscape || '100%'),
                height: showChartFilter ? '90%' : '100%',
                backgroundColor: { fill: 'transparent' },
                tooltip: {
                    isHtml: true,
                    showColorCode: true

                },
                curveType: 'function',
                legend: {
                    alignment: isPortrait ? 'center' : 'start',
                    position:
                        chartData.options?.legend?.position ??
                        (isPortrait ? 'top' : 'right'),
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
            if (isPortrait)
                options.hAxis = {
                    ...options.hAxis,
                    slantedText: true,
                    slantedTextAngle: 30,
                };

            // 4. Override with custom colors:
            // 4.1. Color scheme of all the series of this chart
            if (typeof options.colors === 'string' || !options.colors)
                options.colors =
                    theme.palette.chart.optionsColors[options.colors || 'multiColor'];
            // 4.2. Individual color of a single serie (if given)
            if (options.series)
                Object.values(options.series).forEach((serie) => {
                    if (serie.color === 'default') serie.color = theme.palette.primary.main;
                });
            // 4.3. Color of the trendline
            if (options.trendlines)
                options.trendlines.forEach((item) => {
                    item.color = theme.palette.primary.main;
                });
            // 4.4. Color axis of the Calendar chart
            if (options.colorAxis) {
                switch (options.colorAxis.colors) {
                    case 'matchingColor':
                        options.colorAxis.colors = [
                            theme.palette.chart.colorAxisFirstColor,
                            theme.palette.chart.optionsColors['multiColor'][
                            options.colorAxis.colorIndex
                            ],
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
                    default:
                        break;
                }
            }
            // 4.5. Colors of other elements of the chart (typographies and gridlines)
            options.vAxis = {
                ...options.vAxis,
                titleTextStyle: axisTitleTextStyle,
                textStyle: axisTextStyle,
                gridlines: { color: theme.palette.chart.gridlines },
                minorGridlines: { count: 0 },
            };
            options.hAxis = {
                ...options.hAxis,
                titleTextStyle: axisTitleTextStyle,
                textStyle: axisTextStyle,
                gridlines: { color: theme.palette.chart.gridlines },
                minorGridlines: {
                    ...options.hAxis?.minorGridlines,
                    color: theme.palette.chart.gridlines,
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
            if (isHomepage)
                options = {
                    ...options,
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
                        minorGridlines: { count: 0 },
                        titleTextStyle: {
                            ...options.hAxis.titleTextStyle,
                            bold: false
                        }
                    },
                    vAxes: {},
                };

            // When chart is ready
            const chartEvents = [
                {
                    eventName: 'ready',
                    callback: ({ chartWrapper }) => {
                        circleProgress = displayCircleProgress(false);
                    },
                },
            ];

            const chartProps = {
                chartType: chartData.chartType,
                chartWrapperParams: {
                    view: {
                        columns:
                            chartData.columns ||
                            (chartData.subcharts &&
                                chartData.subcharts[chartSubIndex].columns) ||
                            null ||
                            null,
                    },
                },
                spreadSheetUrl: `https://docs.google.com/spreadsheets/d/${chartData.sheetId}`,
                spreadSheetQueryParameters:
                    chartSubIndex == null
                        ? {
                            headers: chartData.headers,
                            query: chartData.query,
                            gid: chartData.gid,
                        }
                        : {
                            headers:
                                chartData.headers ||
                                chartData.subcharts[chartSubIndex].headers ||
                                null,
                            query:
                                chartData.query ||
                                chartData.subcharts[chartSubIndex].query ||
                                null,
                            gid:
                                chartData.gid ||
                                chartData.subcharts[chartSubIndex].gid ||
                                null,
                        }
                ,
                options: options,
                chartEvents: chartEvents,
                // if the filter prop exists and it's not a chart on homepage:
                // add the packages and control props below
                ...(
                    showChartFilter ? {
                        chartPackages: ["corechart", "controls"],
                        controls: [
                            {
                                controlType: chartData.filter || chartData.subcharts?.[chartSubIndex].filter,
                                snapToData: true,
                                options: {
                                    filterColumnIndex: 0,
                                    ui: {
                                        chartType: chartData.chartType,
                                        chartView: {
                                            columns:
                                                chartData.columns ||
                                                (chartData.subcharts &&
                                                    chartData.subcharts[chartSubIndex].columns) ||
                                                null ||
                                                null,
                                        },
                                        chartOptions: {
                                            ...options,
                                            height: chartFilterHeightInPixel,
                                            vAxis: null,
                                            hAxis: {
                                                textPosition: 'out',
                                                textStyle: { color: theme.palette.chart.axisText }
                                            },
                                            annotations: { ...hideAnnotations },
                                            legend: null,
                                        }
                                    },
                                },
                                controlPosition: "bottom"
                            },
                        ]
                    } : {}
                )
            };

            if (chartData.chartType == 'Calendar') return (
                <CalendarChart
                    chartData={chartData}
                    chartProps={chartProps}
                    isPortrait={isPortrait}
                />
            )

            return (
                <Box
                    position={'relative'}
                    className={chartData.chartType}
                    height="100%"
                    width='100%'
                >
                    {circleProgress && (
                        <CircularProgress
                            sx={{
                                display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',
                            }}
                        />
                    )}
                    <Chart style={{ margin: "auto" }} {...chartProps} />
                </Box>
            );
    }
}

export default SubChart;