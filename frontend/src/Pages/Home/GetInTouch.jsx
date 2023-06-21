// disable eslint for this file
/* eslint-disable */
import { Typography, Container, Paper, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import UppercaseTitle from '../../Components/UppercaseTitle';

import jsonData from '../../section_data.json';
import parse from 'html-react-parser';
import { replacePlainHTMLWithMuiComponents, capitalizePhrase } from '../../Utils/Utils';

import * as Tracking from '../../Utils/Tracking';
import LaunchIcon from '@mui/icons-material/Launch';

const IFrameWrapper = styled(Box)(({ theme }) => ({
    filter: theme.palette.mode == "dark" && "invert(0.848) hue-rotate(180deg)",
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    height: '90vh',
    [theme.breakpoints.down("md")]: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
    },
}));

const GetInTouch = () => {
    const googleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLScnPA_ohsOvyZoO9QfjNk7shfXEyUGxOfxrpGzXq0VOSxjwbA/';
    return (
        <Container>
            <UppercaseTitle text={capitalizePhrase(jsonData.getInTouch.id)} />

            <Box maxWidth={"md"} margin={"auto"}>
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                        {parse(jsonData.getInTouch.content, {
                            replace: replacePlainHTMLWithMuiComponents,
                        })}
                    </Typography>
                    <Container sx={{ mt: 3, textAlign: "center" }}>
                        <Button
                            href={`${googleFormLink}/viewform`}
                            onClick={() => {
                                Tracking.sendEventAnalytics(Tracking.Events.openContactFormInExternalTab);
                            }}
                            target="_blank"
                            rel="noreferrer"
                            variant="contained"
                            size="small"
                        >
                            <LaunchIcon sx={{ fontSize: "1rem" }} />
                            &nbsp;
                            OPEN FORM IN SEPARATE TAB
                        </Button>
                    </Container>
                    <IFrameWrapper>
                        <iframe src={`${googleFormLink}viewform?embedded=true`} width="100%" height="100%" frameBorder="0">Loading...</iframe>
                    </IFrameWrapper>
                </Paper>
            </Box>
        </Container >
    );
};

export default GetInTouch;