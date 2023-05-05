// disable eslint for this file
/* eslint-disable */
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Tooltip, Button, Menu, MenuItem, Grid, Box, Typography, Container, Paper, AppBar, Toolbar, useScrollTrigger, Fab, Fade, Slide, Stack, Drawer, Divider } from '@mui/material';

import { IoReturnDownBack } from 'react-icons/io5';

import HoverMenu from 'material-ui-popup-state/HoverMenu';
import PopupState, {
    bindHover,
    bindFocus,
    bindMenu,
} from 'material-ui-popup-state';

import { showInDesktop, showInMobile } from './Header';

const HoverFocusMenu = (props) => {
    const { popupId, elementToDisplay, menuItemToDisplay } = props;

    return (
        <PopupState variant="popover" popupId={popupId || "demoPopup"}>
            {(popupState) => (
                <>
                    <Box {...bindHover(popupState)} {...bindFocus(popupState)}>
                        {elementToDisplay}
                    </Box>

                    {
                        // Sanity check if there are items in menuItemToDisplay array to display
                        (Array.isArray(menuItemToDisplay) && menuItemToDisplay.length > 0) &&
                        <HoverMenu
                            {...bindMenu(popupState)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            {menuItemToDisplay.map((element) => (
                                <MenuItem onClick={popupState.close}>{element}</MenuItem>
                            ))}
                        </HoverMenu>
                    }
                </>
            )}
        </PopupState>
    );
};

const StyledNavLink = styled(Box)(({ theme }) => ({
    display: 'inline-block',
    marginRight: theme.spacing(2),
    "& .MuiTypography-root": {
        color: { xs: theme.palette.text.primary, lg: theme.palette.primary.contrastText },
        opacity: 0.75,
    },
    "& .underlineOnHover, & a": {
        cursor: "pointer",
        textDecoration: "none"
    },
    "& .underlineOnHover:hover": {
        textDecoration: "underline 2px",
        textUnderlineOffset: "4px",
        opacity: 1,
        [theme.breakpoints.up("lg")]: {
            textDecorationColor: theme.palette.primary.contrastText,
        },
        [theme.breakpoints.down("lg")]: {
            textDecorationColor: theme.palette.primary.main,
        },
    },
}));

const NavLinkBehavior = {
    doNothingForNow: "doNothingForNow",
    toNewPage: "toNewPage",
    scrollTo: "scrollTo"
}

const BackToHome = () => {
    return (
        <>
            <IoReturnDownBack
                style={{ verticalAlign: 'middle' }}
            />
            Back to Home
        </>
    );
}

const NavLink = (props) => {
    const { behavior, to, scrollToSectionID, label, typographyVariant, typographyFontWeight } = props;

    const scrollToSection = (scrollToSectionID) => {
        const section = document.getElementById(scrollToSectionID);
        if (section) {
            section.scrollIntoView({ behavior: 'instant' });
        }
    }

    const capitalizePhrase = (str) => {
        const words = str.split(/[\s-]+/);
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        const capitalizedString = capitalizedWords.join(' ');
        return capitalizedString;
    }

    let placeholderDOM;

    switch (behavior) {
        case NavLinkBehavior.doNothingForNow:
            placeholderDOM = (
                <Typography variant={typographyVariant || "body1"}
                    fontWeight={typographyFontWeight || 500}>
                    {capitalizePhrase(label)}
                </Typography>
            );
            break;

        case NavLinkBehavior.toNewPage:
            placeholderDOM = (
                <Link to={to}>
                    <Typography
                        className="underlineOnHover"
                        variant={typographyVariant || "body1"}
                        fontWeight={typographyFontWeight || 500}
                        color={{ xs: "text.primary", lg: "primary.contrastText" }} // need to use color here or else it won't override <a> color scheme
                    >
                        {to === "/" ? <BackToHome /> : capitalizePhrase(to)}
                    </Typography>
                </Link >
            );
            break;


        case NavLinkBehavior.scrollTo:
            placeholderDOM = (
                <Box onClick={() => scrollToSectionID && scrollToSection(scrollToSectionID)}>
                    <Typography
                        className="underlineOnHover"
                        variant={typographyVariant || "body1"}
                        fontWeight={typographyFontWeight || 500}
                    >
                        {capitalizePhrase(label || scrollToSectionID)}
                    </Typography>
                </Box>
            );
            break;

        default:
            break;
    }

    return (
        <StyledNavLink>
            {placeholderDOM}
        </StyledNavLink>
    );
}

export default function NavBar(props) {
    const { currentPage, chartsTitlesList } = props;

    const mobileChartList = (
        <Grid container ml={3}>
            {chartsTitlesList.map((element, index) => (
                <Grid key={index} item xs={12} lg="auto">
                    <NavLink
                        behavior={NavLinkBehavior.scrollTo}
                        scrollToSectionID={element.chartID}
                        label={`${element.chartID}. ${element.chartTitle}`}
                        typographyVariant="caption"
                        typographyFontWeight={400}
                    />
                </Grid>
            ))}
        </Grid>
    );

    const desktopChartList = (
        <HoverFocusMenu
            popupId={"chart-list-popup"}
            elementToDisplay={
                <NavLink behavior={NavLinkBehavior.doNothingForNow} label={`Charts of ${currentPage}`} />
            }
            menuItemToDisplay={chartsTitlesList.map((element, index) => (
                <NavLink
                    key={index}
                    behavior={NavLinkBehavior.scrollTo}
                    scrollToSectionID={element.chartID}
                    label={`${element.chartID}. ${element.chartTitle}`}
                    typographyVariant="caption"
                    typographyFontWeight={400}
                />
            ))}
        />
    );

    return (
        <Grid container spacing={1}>
            {
                // If the current page is homepage, then display ABOUT link
                // If not homepage (implies in project page at this point), display Back to Home link and the name of this project
                currentPage === "home" ?
                    <Grid item xs={12} lg="auto">
                        <NavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="about" />
                    </Grid>
                    :
                    <>
                        <Grid item xs={12} lg="auto">
                            <NavLink
                                behavior={NavLinkBehavior.toNewPage} to="/" />
                        </Grid>

                        <Grid container sx={showInMobile}>
                            <Grid item xs={12} lg="auto">
                                <NavLink behavior={NavLinkBehavior.doNothingForNow} label={`Charts of ${currentPage}`} />
                            </Grid>
                            <Grid item xs={12} lg="auto" >
                                {mobileChartList}
                            </Grid>
                        </Grid>

                        <Grid item xs={12} lg="auto" sx={showInDesktop}>
                            {desktopChartList}
                        </Grid>
                    </>
            }
            <Grid item xs={12} lg="auto">
                <NavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="join-us" />
            </Grid>
        </Grid>
    );
}