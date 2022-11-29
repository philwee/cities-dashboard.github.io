import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { SocialHandleGrid } from '../../Pages/About/About';

function getYear(){
    const d = new Date();
    return d.getFullYear();
}

export default function Footer(){
    return(
        <Paper elevation={0} square >
            <Container>
                <Grid container justify='center' align='center' sx={{p: 5}}>
                    <Grid>
                        <Typography variant='body1' fontWeight='bold' gutterBottom>
                            Center for Interacting Urban Networks<br />- {getYear()} -
                        </Typography>
                        <Container maxWidth='xs'>
                            <SocialHandleGrid />
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}