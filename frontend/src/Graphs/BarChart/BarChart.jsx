import { Chart } from 'react-google-charts';

function createCustomToolTip(columnToolTipData) {
  return `<p>${columnToolTipData}</p>`;
}

const data = [
  [
    'City',
    { role: 'tooltip', type: 'string', p: { html: true } },
    '2010 Population',
    '2000 Population',
  ],
  [
    'New York City, NY',
    createCustomToolTip('This data is marvelous'),
    8175000,
    8008000,
  ],
  [
    'Los Angeles, CA',
    createCustomToolTip('This data is wow'),
    3792000,
    3694000,
  ],
  ['Chicago, IL', createCustomToolTip('This data is great'), 2695000, 2896000],
  ['Houston, TX', createCustomToolTip('This data has power'), 2099000, 1953000],
  [
    'Philadelphia, PA',
    createCustomToolTip('PalTech fixed the issues!'),
    1526000,
    1517000,
  ],
];

const options = {
  title: 'Population of Largest U.S. Cities',
  chartArea: { width: '40%' },
  hAxis: {
    title: 'Total Population',
    minValue: 0,
  },
  vAxis: {
    title: 'City',
  },
  focusTarget: 'category',
  tooltip: { isHtml: true, trigger: 'visible' },
};

export default function BarChart() {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
