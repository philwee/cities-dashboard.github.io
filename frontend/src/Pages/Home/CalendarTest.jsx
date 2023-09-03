import * as React from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  '&': {
    borderRadius: '50%',
    border: '2px solid lightblue',
  },

  // '&:after': {
  //   content: '"."',
  //   fontSize: '1.5rem',
  //   bottom: '-0.5rem',
  //   position: 'absolute',
  //   color: 'lightblue'
  // }
}));

function isValidDate(day, validDates) {
  return validDates.indexOf(dayjs(day).format('YYYY-MM-DD')) >= 0;
}

function ServerDay(props) {
  const { validDates = [], day, ...other } = props;

  const isCircled = validDates.indexOf(dayjs(day).format('YYYY-MM-DD')) >= 0;

  return (
    isCircled
      ? <HighlightedDay {...other} day={day} />
      : <PickersDay {...other} day={day} />
  );
}

export default function DateCalendarServerRequest() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [validDates, setValidDates] = React.useState(['2023-09-01', '2023-09-05', '2023-08-01']);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        disableHighlightToday
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        onChange={(value) => {
          alert(`${dayjs(value).format('YYYY-MM-DD')} selected!`);
        }}
        slotProps={{
          day: {
            validDates
          }
        }}
        // disable the date if its not a valid date
        shouldDisableDate={(day) => !isValidDate(day, validDates)}
      />
    </LocalizationProvider>
  );
}
