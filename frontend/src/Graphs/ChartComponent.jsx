import { Chart } from 'react-google-charts';

export default function ChartComponent({chartData}) {

  const options = {
    theme: 'material',
    chartArea: { width: '70%' },
    title: chartData.title,
    vAxis: {
      format: chartData.vAxisFormat ?? 'decimal',
      title: chartData.vAxisTitle,
    },
    hAxis: {
      format: '',
      title: chartData.hAxisTitle,
    },
    animation: {
      startup: true,
      easing: 'inAndOut',
    },
    height: '100%',
    legend: chartData.legend ?? 'bottom',
    isStacked: chartData.isStacked ?? false,
    seriesType: chartData.seriesType,
    series: chartData.series,
    intervals: chartData.intervals,
    curveType: chartData.curveType ?? "function"
  };

  const url = `https://docs.google.com/spreadsheets/d/${chartData.sheetId}`;
  
  return (
    <Chart
      chartType={chartData.chartType}
      chartWrapperParams={{
        view: {columns: chartData.columns},
      }}
      spreadSheetUrl={url}
      spreadSheetQueryParameters={{
        headers: chartData.headers,
        gid: chartData.gid,
        query: chartData.query
      }}
      options={options}
    />
  );
}


