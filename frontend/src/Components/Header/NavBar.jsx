// disable eslint for this file
/* eslint-disable */
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { MenuList, MenuItem, Box, Divider } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

import HoverMenu from 'material-ui-popup-state/HoverMenu';
import PopupState, {
    bindHover,
    bindFocus,
    bindMenu,
} from 'material-ui-popup-state';

import { showInDesktop, showInMobile } from './Header';

const capitalizePhrase = (str) => {
    const words = str.split(/[\s-]+/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedString = capitalizedWords.join(' ');
    return capitalizedString;
}

const NavLinkBehavior = {
    doNothingForNow: "doNothingForNow",
    toNewPage: "toNewPage",
    scrollTo: "scrollTo"
}

const StyledMenuItem = styled(MenuItem)(({ theme, fontSize }) => ({
    whiteSpace: "normal",
    overflowWrap: "break-word",
    fontSize: fontSize,
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

const StyledMenuList = styled(MenuList)(({ theme }) => ({
    // Make these items display on the same line on large display
    "& .MuiMenuItem-root": {
        [theme.breakpoints.up("lg")]: {
            display: "inline-flex !important",
            height: "100%",
        },
    }
}));


const HoverFocusMenu = (props) => {
    const { popupId, menuLabel, menuItems } = props;

    return (
        <PopupState variant="popover" popupId={popupId || "demoPopup"}>
            {(popupState) => (
                <>
                    <Box {...bindHover(popupState)} {...bindFocus(popupState)}>
                        {menuLabel}
                    </Box>

                    {
                        // Sanity check if there are items in menuItems array to display
                        (Array.isArray(menuItems) && menuItems.length > 0) &&
                        <HoverMenu
                            {...bindMenu(popupState)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            onClick={popupState.close}
                        >
                            {menuItems}
                        </HoverMenu>
                    }
                </>
            )}
        </PopupState>
    );
};

const MenuItemAsNavLink = (props) => {
    const { behavior, to, scrollToSectionID, label, fontSize } = props;

    const scrollToSection = (scrollToSectionID) => {
        const section = document.getElementById(scrollToSectionID);
        if (section) {
            section.scrollIntoView({ behavior: 'instant' });
        }
    }

    switch (behavior) {
        case NavLinkBehavior.doNothingForNow:
            return (
                <StyledMenuItem fontSize={fontSize}>
                    {capitalizePhrase(label)}
                </StyledMenuItem>
            );

        case NavLinkBehavior.toNewPage:
            return (
                <StyledMenuItem fontSize={fontSize} component={Link} to={to}>
                    {capitalizePhrase((to === "/") ? "home" : to)}
                </StyledMenuItem>
            );

        case NavLinkBehavior.scrollTo:
            return (
                <StyledMenuItem fontSize={fontSize} onClick={() => scrollToSectionID && scrollToSection(scrollToSectionID)}>
                    {capitalizePhrase(label || scrollToSectionID)}
                </StyledMenuItem>
            );

        default:
            return null;

    }
}

export default function NavBar(props) {
    const { currentPage, chartsTitlesList } = props;

    const mobileChartList = (
        <MenuList sx={{ p: 0, ml: 3 }}>
            {chartsTitlesList.map((element) => (
                <MenuItemAsNavLink
                    behavior={NavLinkBehavior.scrollTo}
                    scrollToSectionID={element.chartID}
                    label={`${element.chartID}. ${element.chartTitle}`}
                    fontSize="0.75rem"
                />
            ))}
        </MenuList>
    );

    const desktopChartList = (
        <HoverFocusMenu
            popupId={"chart-list-popup"}
            menuLabel={capitalizePhrase(`Charts: ${currentPage}`)}
            menuItems={
                chartsTitlesList.map((element, index) => (
                    <MenuItemAsNavLink
                        key={index}
                        behavior={NavLinkBehavior.scrollTo}
                        scrollToSectionID={element.chartID}
                        label={`${element.chartID}. ${element.chartTitle}`}
                        fontSize="0.8rem"
                    />
                ))}
        />
    );

    return (
        <StyledMenuList sx={{ height: "100%", p: 0 }}>
            {
                // If the current page is homepage, then display ABOUT link
                // If not homepage (implies in project page at this point), display Back to Home link and the name of this project
                currentPage === "home" ?
                    <>
                        <MenuItemAsNavLink behavior={NavLinkBehavior.scrollTo} scrollToSectionID="about" />
                    </>
                    :
                    <>
                        <MenuItemAsNavLink behavior={NavLinkBehavior.toNewPage} to="/" />

                        <Box sx={showInMobile("block")}>
                            <MenuItemAsNavLink behavior={NavLinkBehavior.doNothingForNow} label={`Charts: ${currentPage}`} />
                            {mobileChartList}
                        </Box>

                        <StyledMenuItem sx={showInDesktop("block")}>
                            {desktopChartList}
                        </StyledMenuItem>
                    </>
            }
            <MenuItemAsNavLink
                behavior={NavLinkBehavior.scrollTo}
                scrollToSectionID="join-us"
            />
        </StyledMenuList>
    );
}