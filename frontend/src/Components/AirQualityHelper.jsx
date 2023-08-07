import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { Box, Fab, Popover, Typography, Table, TableBody, TableCell, TableHead, TableRow, Stack, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AirIcon from '@mui/icons-material/Air';
import { FadeInButtonForSpeedDial } from './Header/FadeInButtonForSpeedDial';
import { useVisibility } from '../ContextProviders/VisibilityContext';

import * as Tracking from '../Utils/Tracking';

const StyledTable = styled(Table)(({ theme }) => ({
  '& th, td': {
    fontSize: '0.5em',
    color: theme.palette.text.primary
  },
  '& th': {
    fontWeight: 500
  }
}));

export default function AirQualityIndexLegendQuickGlance(props) {
  const { isVisible } = useVisibility();
  // Mechanism for opening and closing the Quick Glance on hover
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    Tracking.sendEventAnalytics(Tracking.Events.airQualityIndexLegendQuickGlance);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // Air quality index legend
  const theme = useTheme();

  if (!isVisible) return null;

  const airQualityIndexCategories = [
    {
      name: 'Good',
      color: theme.palette.chart.optionsColors.aqi[0],
      aqi: '0 - 50',
      rawPM2_5: '0 - 12'
    },
    {
      name: 'Moderate',
      color: theme.palette.chart.optionsColors.aqi[1],
      aqi: '51 - 100',
      rawPM2_5: '12.1 - 35.4'
    },
    {
      name: 'Unhealthy for Sensitive Groups',
      color: theme.palette.chart.optionsColors.aqi[2],
      aqi: '101 - 150',
      rawPM2_5: '35.5 - 55.4'
    },
    {
      name: 'Unhealthy',
      color: theme.palette.chart.optionsColors.aqi[3],
      aqi: '151 - 200',
      rawPM2_5: '55.5 - 150.4'
    },
    {
      name: 'Very Unhealthy',
      color: theme.palette.chart.optionsColors.aqi[4],
      aqi: '201 - 300',
      rawPM2_5: '150.5 - 250.4'
    },
    {
      name: 'Hazardous',
      color: theme.palette.chart.optionsColors.aqi[5],
      aqi: '300 - 500',
      rawPM2_5: '250.5 - 550.5'
    },
  ];

  return (
    <>
      <FadeInButtonForSpeedDial {...props} distanceFromBottomOfWindow="5.5rem" triggerThreshold={1.5}>
        <Fab
          sx={{ mt: 1 }}
          aria-owns={open ? Tracking.Events.airQualityIndexLegendQuickGlance : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={(event) => isMobile && (open ? handlePopoverClose() : handlePopoverOpen(event))}
          aria-label={Tracking.Events.airQualityIndexLegendQuickGlance}
          color="primary"
        >
          <Stack direction="column" alignItems="center">
            <AirIcon fontSize="1rem" />
            <Typography variant="body2" fontWeight="500">
              AQI
            </Typography>
          </Stack>
        </Fab>
      </FadeInButtonForSpeedDial>

      <Popover
        id={Tracking.Events.airQualityIndexLegendQuickGlance}
        sx={{
          pointerEvents: 'none',
          mt: -1
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: '100',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ mx: 2, mt: 1 }} color="text.disabled" variant="body1" fontWeight={500}>
          AQI at quick glance
        </Typography>
        <StyledTable size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Stack direction="row" alignItems="center">
                  <Box sx={{ width: '2em', height: '1em', marginRight: '4px' }} />
                  Category
                </Stack>
              </TableCell>
              <TableCell align="right">US AQI</TableCell>
              <TableCell align="right">Raw PM2.5 Concentration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airQualityIndexCategories.reverse().map((element) => (
              <TableRow
                key={element.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" alignItems="center">
                    <Box sx={{ width: '2em', height: '1em', marginRight: '4px', backgroundColor: element.color }} />
                    {element.name}
                  </Stack>
                </TableCell>
                <TableCell align="right">{element.aqi}</TableCell>
                <TableCell align="right">
                  {element.rawPM2_5}
                  (µg/m3)
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Popover>
    </>
  );
}
