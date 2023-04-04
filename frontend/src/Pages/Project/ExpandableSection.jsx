// disable eslint for this file
/* eslint-disable */

import { useState } from 'react';
import { styled } from '@mui/material/styles';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Project.css';

const StyledAccordion = styled(MuiAccordion)(({ theme, expanded }) => ({
    backgroundColor: expanded ? theme.palette.background.default : 'transparent',
    boxShadow: expanded ? theme.shadows : 'none',
    transition: theme.transitions,
}));

const StyledAccordionSummary = styled(MuiAccordionSummary)(({ theme, expanded }) => ({
    flexDirection: 'row-reverse',
    paddingLeft: expanded ? theme.spacing(1) : 0,
    '& .MuiIconButton-root': {
        color: theme.palette.primary.main,
    },
    '& .MuiTypography-root': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        transition: theme.transitions,
        '&:hover': {
            color: theme.palette.secondary.main,
        },
    },
}));

const ExpandableSection = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <StyledAccordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
                <StyledAccordionSummary expanded={expanded} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography component="a" variant="body1">
                        {title}
                    </Typography>
                </StyledAccordionSummary>
                <MuiAccordionDetails>
                    {content}
                </MuiAccordionDetails>
            </StyledAccordion>
        </div>
    );
}

export default ExpandableSection;
