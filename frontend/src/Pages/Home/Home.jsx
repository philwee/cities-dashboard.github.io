import { useEffect } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '../../Components/Card/Card';
import BarChart from '../../Graphs/BarChart/BarChart';
import ColumnChart from '../../Graphs/BarChart/ColumnChart';
import './Home.css';


export default function Home({ LinkChange, setLinkChange }) {
  const cards = [
    { name: 'Project 1', graph: <BarChart /> },
    { name: 'Project 2', graph: <ColumnChart /> },
    { name: 'Project 3', graph: <BarChart /> },
    { name: 'Project 4', graph: <BarChart /> },
    { name: 'Project 5', graph: <BarChart /> },
    { name: 'Project 6', graph: <BarChart /> },
  ];

  useEffect(() => {
    setLinkChange(true);

    return () => {
      console.log('Returned');
    };
  });

  return (
    <Container sx={{pt: 4, pb: 4}}>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{ color: 'text.primary' }}>
            All Projects
          </Typography>
        </Grid>
        
        {cards.map((element, index) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              title={element.name}
              key={index}
              graphType={element.graph}
              body="Researcher Name"
              LinkChange={LinkChange}
              setLinkChange={setLinkChange}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
