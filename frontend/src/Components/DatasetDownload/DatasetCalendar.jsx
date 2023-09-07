import * as React from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Card from '@mui/material/Card';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  // style for circle highlight
  // '&': {
  //   borderRadius: '50%',
  //   border: '2px solid lightblue',
  // },

  // styles for dot
  '&:after': {
    content: '"."',
    fontSize: '1.5rem',
    bottom: '-0.5rem',
    position: 'absolute',
    color: 'lightblue'
  }
}));

function isValidDate(day, validDates) {
  return validDates.indexOf(dayjs(day).format('YYYY-MM-DD')) >= 0;
}

function ServerDay(props) {
  const { versionDates = [], day, ...other } = props;

  const isHighlighted = versionDates.indexOf(dayjs(day).format('YYYY-MM-DD')) >= 0;

  return (
    isHighlighted
      ? <HighlightedDay {...other} day={day} />
      : <PickersDay {...other} day={day} />
  );
}

export default function DatasetCalendar(props) {
  const { onChange, versions } = props;

  const versionDates = versions
    .filter((version) => version.version.length === 10) // valid date
    .map((version) => version.version);

  return (
    <ClickAwayListener onClickAway={() => onChange('close')}>
      <Card
        sx={{ position: 'absolute', right: 0, zIndex: 999 }}
        raised
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            loading={!versionDates}
            disableHighlightToday
            format="YYYY-MM-DD"
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            onChange={(value) => onChange(dayjs(value).format('YYYY-MM-DD'))}
            slotProps={{
              day: {
                versionDates
              }
            }}
            // disable the date if its not a valid date
            shouldDisableDate={(day) => !isValidDate(day, versionDates)}
          />
        </LocalizationProvider>
      </Card>
    </ClickAwayListener>
  );
}
