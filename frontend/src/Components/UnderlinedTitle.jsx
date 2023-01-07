// disable eslint for this file
/* eslint-disable */
import Typography from '@mui/material/Typography';

export default function UnderlinedTitle({text}){
    return(
        <Typography variant="h5" color='text.primary' sx={{fontWeight: 'medium', borderBottom: '3px solid', borderColor: 'primary.main',
    display: 'inline-block', textTransform: 'uppercase'}}>
            {text}
        </Typography>
    );
}