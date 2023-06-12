// disable eslint for this file
/* eslint-disable */
import { Box, Typography, Container, Paper } from '@mui/material';
import UppercaseTitle from './UppercaseTitle';
import { Embed } from 'hyvor-talk-react';

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

import jsonData from '../section_data.json';
import parse from 'html-react-parser';
import { replacePlainHTMLWithMuiComponents, capitalizePhrase } from '../Utils/Utils';

export const WEBSITE_ID = 8990; // Hyvor Talk's website ID

const StyledHyvorTalk = styled(Box)(({ theme }) => ({
    "& #hyvor-talk-iframe": {
        marginBottom: "-50px"
    }
}));

const CommentSection = ({ pageID }) => {
    // Get the current theme
    const theme = useTheme();

    return (
        <Container>
            <UppercaseTitle text={capitalizePhrase(jsonData.commentSection.id)} />
            <Box maxWidth={"md"} margin={"auto"}>
                <Paper elevation={2} sx={{ p: 3, pb: 0 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
                        {parse(jsonData.commentSection.content, {
                            replace: replacePlainHTMLWithMuiComponents,
                        })}
                    </Typography>
                    <Box sx={{ mx: -3 }}>
                        <StyledHyvorTalk>
                            <Embed
                                websiteId={WEBSITE_ID}
                                id={pageID}
                                palette={{
                                    accent: theme.palette.primary.main,
                                    accentText: theme.palette.primary.contrastText,
                                    box: theme.palette.customAlternateBackground,
                                    boxText: theme.palette.text.secondaryRGB,
                                    backgroundText: theme.palette.text.secondaryRGB,
                                    footerHeader: theme.palette.customBackground,
                                    footerHeaderText: theme.palette.text.secondaryRGB,
                                }}
                            />
                        </StyledHyvorTalk>

                    </Box>
                </Paper>
            </Box>
        </Container >
    );
}

export default CommentSection;