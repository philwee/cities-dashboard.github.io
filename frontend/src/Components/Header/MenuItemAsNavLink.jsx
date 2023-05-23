// disable eslint for this file
/* eslint-disable */
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';

import { NavLinkBehavior } from './NavBar';

const capitalizePhrase = (str) => {
    const words = str.split(/[\s-]+/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedString = capitalizedWords.join(' ');
    return capitalizedString;
}

const StyledMenuItem = styled(MenuItem)(({ theme, sx }) => ({
    ...sx,
    whiteSpace: "normal",
    overflowWrap: "break-word",
    minHeight: "unset",
    // Make height 100% and vertical align text elements of popup menu
    "& .MuiBox-root": {
        height: "100%",
        display: "flex",
        alignItems: "center"
    },
    [theme.breakpoints.up("lg")]: {
        "&:hover": {
            backgroundColor: theme.palette.backgroundColorForNavLink
        }
    }
}));

export const scrollToSection = (scrollToSectionID) => {
    const section = document.getElementById(scrollToSectionID);
    if (section) {
        section.scrollIntoView({ behavior: 'instant' });
    }
};

export default function MenuItemAsNavLink(props) {
    const { behavior, to, scrollToSectionID, sx } = props;
    let { label } = props;

    if (label && typeof label === 'string') label = capitalizePhrase(label);

    switch (behavior) {
        case NavLinkBehavior.doNothingForNow:
            return (
                <StyledMenuItem sx={sx}>
                    {label}
                </StyledMenuItem>
            );

        case NavLinkBehavior.toNewPage:
            return (
                <StyledMenuItem sx={sx} component={Link} to={to}>
                    {capitalizePhrase((to === "/") ? "home" : to)}
                </StyledMenuItem>
            );

        case NavLinkBehavior.scrollTo:
            return (
                <StyledMenuItem
                    sx={sx}
                    onClick={() => scrollToSectionID && scrollToSection(scrollToSectionID)}
                >
                    {label || capitalizePhrase(scrollToSectionID)}
                </StyledMenuItem>
            );

        default:
            return null;
    }
}