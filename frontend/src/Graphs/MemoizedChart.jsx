import { memo } from 'react';
import { Chart } from 'react-google-charts';
import isEqual from 'lodash.isequal';

const MemoizedChart = memo(
  (props) => {
    const { chartProps } = props;
    return <Chart style={{ margin: 'auto' }} {...chartProps} />;
  },
  // Use isEqual to perform deep comparison of objects
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default MemoizedChart;
