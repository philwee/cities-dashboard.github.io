/* eslint-disable react/jsx-props-no-spreading */
import { Box, useScrollTrigger, Fab, Fade, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import PopupState, { bindHover, bindFocus, bindMenu } from 'material-ui-popup-state';
import MenuItemAsNavLink, { StyledMenuItem, scrollToSection } from './MenuItemAsNavLink';
import NavLinkBehavior from './NavLinkBehavior';
import * as Tracking from '../../Utils/Tracking';

const { innerHeight } = window;

function FadeInButton({ children, window }) {
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: innerHeight / 2,
  });

  return (
    <Fade in={trigger}>
      <Box
        role="presentation"
        sx={{ position: 'fixed', bottom: '1rem', left: 'calc(100vw - 5rem)' }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function HoverFocusMenu({ popupId, label, menuItems }) {
  return (
    <PopupState variant="popover" popupId={popupId || 'demoPopup'}>
      {(popupState) => (
        <>
          <Box {...bindHover(popupState)} {...bindFocus(popupState)}>
            {label}
          </Box>
          <HoverMenu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClick={popupState.close}
          >
            {menuItems}
          </HoverMenu>
        </>
      )}
    </PopupState>
  );
}

function SpeedDialButton({ chartsTitlesList, topAnchorID }) {
  const menuItemsArray = chartsTitlesList.length > 0 ? chartsTitlesList.map((element, index) => (
    <MenuItemAsNavLink
      key={index}
      behavior={NavLinkBehavior.scrollTo}
      scrollToSectionID={element.chartID}
      label={`${element.chartID}. ${element.chartTitle}`}
      analyticsOriginID="speed-dial"
      analyticsDestinationLabel={element.chartTitle}
      sx={{ fontSize: '0.8rem' }}
    />
  )) : [];

  if (menuItemsArray.length > 0) {
    menuItemsArray.unshift(
      <StyledMenuItem disabled sx={{ fontWeight: '600' }}>
        Quick Chart Navigation
      </StyledMenuItem>,
      <MenuItemAsNavLink
        behavior={NavLinkBehavior.scrollTo}
        scrollToSectionID={topAnchorID}
        label="↑ Scroll to Top"
        analyticsOriginID="speed-dial"
        sx={{ fontSize: '0.8rem' }}
      />
    );
  }

  return (
    <Box sx={{ zIndex: 99999999999999 }}>
      <FadeInButton>
        {chartsTitlesList.length > 0 ? (
          <HoverFocusMenu
            popupId="chart-list-popup"
            label={(
              <Fab sx={{ mt: 1 }} aria-label="popup menu" color="primary">
                <FormatListNumberedIcon />
              </Fab>
            )}
            menuItems={menuItemsArray}
          />
        ) : (
          <Tooltip title="Scroll to Top">
            <Fab
              onClick={() => {
                if (topAnchorID) {
                  scrollToSection(topAnchorID);
                }
                Tracking.sendEventAnalytics(
                  Tracking.Events.internalNavigation,
                  {
                    destination_id: topAnchorID,
                    origin_id: 'speed-dial',
                  },
                );
              }}
              sx={{ mt: 1 }}
              aria-label="popup menu"
              color="primary"
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Tooltip>
        )}
      </FadeInButton>
    </Box>
  );
}

export default SpeedDialButton;
