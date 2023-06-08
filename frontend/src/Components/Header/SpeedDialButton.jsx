// disable eslint for this file
/* eslint-disable */
import { Box, useScrollTrigger, Fab, Fade } from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import HoverMenu from 'material-ui-popup-state/HoverMenu';
import PopupState, {
    bindHover,
    bindFocus,
    bindMenu,
} from 'material-ui-popup-state';
import MenuItemAsNavLink from './MenuItemAsNavLink';
import { scrollToSection } from './MenuItemAsNavLink';
import { NavLinkBehavior } from './NavBar';

import * as Tracking from '../../Utils/Tracking';

const innerHeight = window.innerHeight;

function FadeInButton(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: innerHeight / 2,
    });

    return (
        <Fade in={trigger}>
            <Box
                role="presentation"
                sx={{ position: 'fixed', bottom: "1rem", left: "calc(100vw - 5rem)" }}
            >
                {children}
            </Box>
        </Fade>
    );
}

const HoverFocusMenu = (props) => {
    const { popupId, label, menuItems } = props;

    return (
        <PopupState variant="popover" popupId={popupId || "demoPopup"}>
            {(popupState) => (
                <>
                    <Box {...bindHover(popupState)} {...bindFocus(popupState)}>
                        {label}
                    </Box>
                    {
                        <HoverMenu
                            {...bindMenu(popupState)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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

export default function SpeedDialButton(props) {
    const { chartsTitlesList, topAnchorID } = props;

    let menuItemsArray = [];

    if (chartsTitlesList.length > 0) {
        menuItemsArray = chartsTitlesList.map((element, index) => (
            <MenuItemAsNavLink
                key={index}
                behavior={NavLinkBehavior.scrollTo}
                scrollToSectionID={element.chartID}
                label={`${element.chartID}. ${element.chartTitle}`}
                analyticsOriginID="speed-dial"
                analyticsDestinationLabel={element.chartTitle}
                sx={{ fontSize: "0.8rem" }}
            />
        ));

        menuItemsArray.unshift(
            <MenuItemAsNavLink
                behavior={NavLinkBehavior.scrollTo}
                scrollToSectionID={topAnchorID}
                label={'↑ Scroll to Top'}
                analyticsOriginID="speed-dial"
                sx={{ fontSize: "0.8rem", fontWeight: "600" }}
            />
        );
    }

    return (
        <Box sx={{ zIndex: 99999999999999 }}>
            <FadeInButton {...props}>
                {
                    // If there are charts to scroll to
                    // display the list of charts' titles (below Scroll to top)
                    chartsTitlesList.length > 0 ?
                        <HoverFocusMenu
                            popupId={"chart-list-popup"}
                            label={
                                <Fab sx={{ mt: 1 }} aria-label="popup menu" color="primary">
                                    <FormatListNumberedIcon />
                                </Fab>
                            }
                            menuItems={menuItemsArray}
                        />
                        :
                        // If there is no chart to scroll to
                        // Simply display a button to scroll to the top
                        <Fab
                            onClick={() => {
                                topAnchorID && scrollToSection(topAnchorID);
                                Tracking.sendEventAnalytics(Tracking.Events.internalNavigation,
                                    {
                                        destination_id: topAnchorID,
                                        origin_id: "speed-dial"
                                    });
                            }}
                            sx={{ mt: 1 }} aria-label="popup menu" color="primary"
                        >
                            <KeyboardArrowUpIcon />
                        </Fab>
                }

            </FadeInButton>
        </Box>
    );
}