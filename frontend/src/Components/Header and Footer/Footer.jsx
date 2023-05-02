// disable eslint for this file
/* eslint-disable */
import { Typography, Container, Box, Stack, Divider } from '@mui/material';

import jsonData from '../../home_data.json';
import parse from 'html-react-parser';

import { Facebook, LinkedIn, Instagram, Twitter } from '@mui/icons-material/';
import CustomLink from '../CustomLink';

function getYear() {
  const d = new Date();
  return d.getFullYear();
}

export default function Footer() {
  return (
    <Box width='100%' backgroundColor='customAlternateBackground' p={3} pt={2}>
      <Container maxWidth={"sm"}>
        <Stack direction="column" textAlign="center">
          <Typography variant="body1" fontWeight="bold" color='text.primary' pb={2}>
            Center for Interacting Urban Networks (CITIES)
            <br />
            {getYear()}
          </Typography>

          <Stack direction="row" spacing={1} justifyContent="center">
            <CustomLink href='https://twitter.com/cities_nyuad/' text={<Twitter sx={{ fontSize: '2rem' }} />} />
            <CustomLink href='https://www.linkedin.com/company/center-for-interacting-urban-networks/' text={<LinkedIn sx={{ fontSize: '2rem' }} />} />
            <CustomLink href='https://www.facebook.com/nyuad.cities/' text={<Facebook sx={{ fontSize: '2rem' }} />} />
            <CustomLink href='https://www.instagram.com/cities.nyuad/' text={<Instagram sx={{ fontSize: '2rem' }} />} />
          </Stack>

          <CustomLink href="mailto:nyuad.cities@nyu.edu" text="nyuad.cities@nyu.edu" />
        </Stack>
      </Container>
    </Box >
  );
}
