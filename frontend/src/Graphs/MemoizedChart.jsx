import { memo } from 'react';
import { Chart } from 'react-google-charts';
import isEqual from 'lodash.isequal';

const MemoizedChart = memo(
  (props) => {
    const { chartProps } = props;
    if (chartProps) { // check for chartProps obj, or if params are passed as attributes
      return <Chart style={{ margin: 'auto' }} {...chartProps} />;
    }
    return <Chart style={{ margin: 'auto' }} {...props} />;
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default MemoizedChart;
