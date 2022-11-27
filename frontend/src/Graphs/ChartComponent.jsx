import { Chart } from 'react-google-charts';
import HeatMap from './HeatMap';

export default function ChartComponent({chartData}) {
  // Case HeatMap
  if (chartData.chartType == "HeatMap") {
    return(<HeatMap publishedSheetId={chartData.publishedSheetId} gid={chartData.gid} />)
  }

  // All the other chart types using React-Google-Chart wrapper
  const options = {
    theme: 'material',
    chartArea: { width: '70%' },
    title: chartData.title,
    vAxis: {
      format: chartData.vAxisFormat ?? 'decimal',
      title: chartData.vAxisTitle,
      viewWindow: {
        min: chartData.vAxisMin
      }
    },
    hAxis: {
      format: chartData.hAxisFormat,
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
    curveType: chartData.curveType ?? "function",
    colors: chartData.colors
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


