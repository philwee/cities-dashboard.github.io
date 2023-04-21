// disable eslint for this file
/* eslint-disable */
import { styled } from '@mui/material/styles';

// Styled component for the Google Table chart
const StyledTable = styled('div')(({ theme, isPortrait }) => ({
    '& table': {
        tableLayout: isPortrait ? 'fixed' : '',
        fontSize: '0.75rem',
    },
    '& .header-row': {
        backgroundColor: theme.palette.customBackground,
        pointerEvents: 'none',
        textAlign: 'left',
        wordWrap: isPortrait ? '' : 'break-word',
    },
    '& .table-row, & .odd-table-row': {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.customAlternateBackground,
    },
    '& .table-row .table-cell:first-of-type, & .odd-table-row .table-cell:first-of-type':
    {
        fontWeight: 'bold',
    },
}));

export default StyledTable;

