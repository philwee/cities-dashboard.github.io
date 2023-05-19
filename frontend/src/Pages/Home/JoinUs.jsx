// disable eslint for this file
/* eslint-disable */
import { Grid, Typography, Container, Paper, Box } from '@mui/material';

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
                        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2, height: '50vh' }}>
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScSvUZhRlH65WvT1kjEjkl64-NPSxQtfyYmVVJOH_On5bqxDQ/viewform?embedded=true" width="100%" height="100%" frameborder="0">Loading…</iframe>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>

        </Container >
    );
};

export default JoinUs;