// disable eslint for this file
/* eslint-disable */
import Typography from '@mui/material/Typography';

export default function UnderlinedTitle({text}){
    return(
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium', borderBottom: '3px solid #57068c',
    display: 'inline-block', textTransform: 'uppercase'}}>
            {text}
        </Typography>
    );
}