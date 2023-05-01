// disable eslint for this file
/* eslint-disable */
import { Grid, Typography, Container, Paper } from '@mui/material';

import UppercaseTitle from '../../Components/UppercaseTitle';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';

const JoinUs = () => {
    return (
        <Container>
            <UppercaseTitle text={'join us!'} />

            <Grid container spacing={4}>
                <Grid item>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            {parse(jsonData.joinUs)}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

        </Container >
    );
};

export default JoinUs;