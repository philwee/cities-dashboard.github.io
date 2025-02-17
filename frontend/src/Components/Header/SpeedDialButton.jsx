import { Box, Fab, Tooltip } from '@mui/material';
import parse from 'html-react-parser';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import PopupState, { bindHover, bindFocus, bindMenu } from 'material-ui-popup-state';
import MenuItemAsNavLink, { StyledMenuItem, scrollToSection } from './MenuItemAsNavLink';
import NavLinkBehavior from './NavLinkBehavior';
import * as Tracking from '../../Utils/Tracking';
import { FadeInButtonForSpeedDial } from './FadeInButtonForSpeedDial';

function HoverFocusMenu(props) {
  const { popupId, label, menuItems } = props;

  return (
    <PopupState variant="popover" popupId={popupId}>
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

export default function SpeedDialButton(props) {
  const { chartsTitlesList, topAnchorID } = props;

  const menuItemsArray = chartsTitlesList.length > 0 ? chartsTitlesList.map((element, index) => (
    <MenuItemAsNavLink
      key={index}
      behavior={NavLinkBehavior.scrollTo}
      scrollToSectionID={element.chartID}
      label={(
        <>
          {index + 1}
          .
          &nbsp;
          {parse(element.chartTitle)}
        </>
      )}
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
    <FadeInButtonForSpeedDial {...props} distanceFromBottomOfWindow="1rem">
      {
        // If there are charts to scroll to
        // display the list of charts' titles (below Scroll to top)
        (chartsTitlesList.length > 0)
          ? (
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
            // If there is no chart to scroll to
            // Simply display a button to scroll to the top
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
          )
      }

    </FadeInButtonForSpeedDial>
  );
}
