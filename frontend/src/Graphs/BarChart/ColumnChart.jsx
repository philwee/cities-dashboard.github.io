import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const chartEvents = [
  {
    eventName: 'select',
    callback: ({ chartWrapper }) => {
      const chart = chartWrapper.getChart();
      const selection = chart.getSelection();
      if (selection.length === 1) {
        const [selectedItem] = selection;
        const dataTable = chartWrapper.getDataTable();

        const { row, column } = selectedItem;

        console.log('You selected:', {
          row,
          column,
          value: dataTable?.getValue(row, column),
        });
      }
    },
  },
];

const views = {
  columns: [
    0,
    1,
    { role: 'tooltip', type: 'string', sourceColumn: 17 },
    2,
    { role: 'tooltip', type: 'string', sourceColumn: 18 },
    3,
    { role: 'tooltip', type: 'string', sourceColumn: 19 },
    4,
    { role: 'tooltip', type: 'string', sourceColumn: 20 },
  ],
};

export default function ColumnChart({ toggleTab }) {
  const [chartType, setChartType] = useState(false);

  useEffect(() => {
    let chartState = false;
    if (!chartState) {
      setChartType((prevType) => !prevType);
    }

    return () => {
      chartState = true;
    };
  }, [toggleTab]);

  const options = {
    theme: 'material',
    chartArea: { width: '70%' },
    vAxis: {
      format: 'decimal',
      title: 'Number of membership',
    },
    hAxis: {
      format: '',
      title: 'Year',
    },
    isStacked: chartType,
    focusTarget: 'datum',
    animation: {
      startup: true,
      easing: 'inAndOut',
    },
    height: '100%',
  };

  return (
    <Chart
      chartType="ColumnChart"
      chartWrapperParams={{
        view: views,
      }}
      spreadSheetUrl="https://docs.google.com/spreadsheets/d/1mRberQXQI9uHCP_gGXgK8NfjbiA2DdQc-HH1c01eEDk"
      spreadSheetQueryParameters={{
        headers: 1,
        gid: 337720664
      }}
      options={options}
      chartEvents={chartEvents}
    />
  );
}


