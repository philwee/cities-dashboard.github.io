// disable eslint for this file
/* eslint-disable */
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContext } from '../ContextProviders/LinkContext';
import { Button, Typography, Container } from '@mui/material';

export default function FourOhFour() {
  // state to set underline link in header
  const [_, setUnderlineLink] = useContext(LinkContext);

  // set underline link to 404 (to undo any other underlined links)
  useEffect(() => {
    setUnderlineLink('404');
  }, [setUnderlineLink]);

  return (
    <Container sx={{ p: 5, textAlign: 'center', margin: 'auto' }}>
      <Typography
        variant="h3"
        fontWeight="medium"
        color="text.primary"
        gutterBottom
      >
        Page not found
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Bad links happen to good people
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Either you're lost or we're still developing this project
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
        <Typography>Return home</Typography>
      </Button>
    </Container>
  );
}
