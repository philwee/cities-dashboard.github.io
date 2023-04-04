// disable eslint for this file
/* eslint-disable */
import Typography from '@mui/material/Typography';

export default function UppercasedTitle({text}){
    return(
        <Typography variant="h4" color='text.primary' sx={{fontWeight: 'medium',
    display: 'inline-block', textTransform: 'uppercase', pb: 3, lineHeight: 1}}>
            {text}
        </Typography>
    );
}