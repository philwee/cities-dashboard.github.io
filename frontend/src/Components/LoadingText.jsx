import { React } from 'react';
import { Typography, Container, CircularProgress, Stack } from '@mui/material/';

export default function LoadingText({ optionalText }) {
  return (
    <Container>
      {
        optionalText
          ? (
            <Stack
              p={4}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <CircularProgress disableShrink size="1.5rem" />
              <Typography variant="body2" textAlign="center" color="text.primary">
                {optionalText}
              </Typography>
            </Stack>
          )
          : <CircularProgress disableShrink size="1.5rem" />
      }

    </Container>
  );
}
