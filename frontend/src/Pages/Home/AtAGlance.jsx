// disable eslint for this file
/* eslint-disable */
import { Grid, Typography, Container } from '@mui/material';

import UppercaseTitle from '../../Components/UppercaseTitle';

import jsonData from '../../home_data.json';

const AtAGlance = () => {
    return (
        <Container>
            <UppercaseTitle text={'at a glance'} />

            <Grid
                container
                direction="row"
                spacing={4}
                sx={{
                    textAlign: 'center',
                    justifyContent: 'center',
                }}
            >
                {jsonData.statistics.map((item, index) => (
                    <Grid key={index} item md={3} sm={4} xs={12}>
                        <Typography
                            variant="h2"
                            color="primary.main"
                            sx={{ marginBottom: '-0.5rem', fontWeight: 'medium' }}
                        >
                            {item.number}
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            textTransform="uppercase"
                        >
                            {item.text}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AtAGlance;
