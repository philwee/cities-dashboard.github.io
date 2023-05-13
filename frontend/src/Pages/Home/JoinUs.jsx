// disable eslint for this file
/* eslint-disable */
import { Grid, Typography, Container, Paper } from '@mui/material';

import UppercaseTitle from '../../Components/UppercaseTitle';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';
import { replacePlainHTMLWithMuiComponents } from '../../Utils';

const JoinUs = () => {
    return (
        <Container>
            <UppercaseTitle text={'join us'} />

            <Grid container spacing={3}>
                <Grid item>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            {parse(jsonData.joinUs, {
                                replace: replacePlainHTMLWithMuiComponents,
                            })}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

        </Container >
    );
};

export default JoinUs;