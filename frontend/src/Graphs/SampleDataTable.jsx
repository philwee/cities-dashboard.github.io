import { styled } from '@mui/material/styles';
import MemoizedChart from './MemoizedChart';

// Styled component for the Google Table chart
const StyledTable = styled('div')(({ theme, marginBottom }) => ({
  marginBottom: theme.spacing(marginBottom),
  '& table': {
    fontSize: '0.75rem',
  },
  '& .header-row, .frozen-column:first-of-type': {
    backgroundColor: theme.palette.customBackground,
    pointerEvents: 'none',
    textAlign: 'left'
  },
  '& .table-row, & .odd-table-row': {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.customAlternateBackground,
  },
  '& .table-row .table-cell:first-of-type, & .odd-table-row .table-cell:first-of-type':
  {
    fontWeight: 'bold',
    backgroundColor: theme.palette.customAlternateBackground,
  },

  '& .frozen-column': {
    borderRightWidth: '1px !important'
  }
}));

function SampleDataTable(props) {
  const { chartData, sheetId, marginBottom } = props;

  const options = {
    width: '100%',
    sortAscending: true,
    frozenColumns: 1,
    cssClassNames: {
      headerRow: 'header-row',
      tableRow: 'table-row',
      oddTableRow: 'odd-table-row',
      selectedTableRow: 'selected-table-row',
      hoverTableRow: 'hover-table-row',
      headerCell: 'header-cell',
      tableCell: 'table-cell',
    }
  };

  return (
    <StyledTable marginBottom={marginBottom}>
      <MemoizedChart
        chartType="Table"
        spreadSheetUrl={`https://docs.google.com/spreadsheets/d/${sheetId}`}
        spreadSheetQueryParameters={{
          headers: chartData.headers,
          query: chartData.query,
          gid: chartData.gid,
        }}
        options={options}
      />
    </StyledTable>
  );
}

export default SampleDataTable;
