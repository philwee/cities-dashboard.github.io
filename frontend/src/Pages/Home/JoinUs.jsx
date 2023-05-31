// disable eslint for this file
/* eslint-disable */
import { Grid, Typography, Container, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import UppercaseTitle from '../../Components/UppercaseTitle';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';
import { replacePlainHTMLWithMuiComponents } from '../../Utils';

const IFrameWrapper = styled(Box)(({ theme }) => ({
    filter: theme.palette.mode == "dark" && "invert(0.848) hue-rotate(180deg)",
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    height: '70vh',
    [theme.breakpoints.down("md")]: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
    },
}));

const JoinUs = ({ themePreference }) => {
    const googleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSenxtTIizWED0PT3hBOn3IU6fwmj4sr1yhjU70mjmK4R-ipsw/';
    return (
        <Container>
            <UppercaseTitle text={'get in touch'} />

            <Grid container spacing={3}>
                <Grid item>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            {parse(jsonData.getInTouch.content, {
                                replace: replacePlainHTMLWithMuiComponents,
                            })}
                        </Typography>
                        <IFrameWrapper>
                            <iframe src={`${googleFormLink}viewform?embedded=true`} width="100%" height="100%" frameborder="0">Loading...</iframe>
                        </IFrameWrapper>
                    </Paper>
                </Grid>

            </Grid>

        </Container >
    );
};

export default JoinUs;