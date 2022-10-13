import { useEffect } from 'react';
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
    <div className="home">
      <div className="projects">
        {cards.map((element, index) => (
          <Card
            title={element.name}
            key={index}
            graphType={element.graph}
            body="Researcher Name"
            LinkChange={LinkChange}
            setLinkChange={setLinkChange}
          />
        ))}
      </div>
    </div>
  );
}
