import { Grid, Typography, Container, Paper } from '@mui/material';

import parse from 'html-react-parser';
import UppercaseTitle from '../../Components/UppercaseTitle';

import jsonData from '../../section_data.json';
import { replacePlainHTMLWithMuiComponents, capitalizePhrase } from '../../Utils/Utils';

function About() {
  return (
    <Container>
      <UppercaseTitle text={capitalizePhrase(jsonData.about.id)} />

      <Grid container spacing={3}>
        {jsonData.about.content.map((element, index) => (
          <Grid key={index} item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {parse(element, {
                  replace: replacePlainHTMLWithMuiComponents,
                })}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}

export default About;
