// disable eslint for this file
/* eslint-disable */
/* eslint-disable no-unused-vars */
import './Project.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import Carousel from '../../Components/Carousel/Carousel';
// import CarouselCard from '../../Components/CarouselCard/CarouselCard';
import ChartComponent from '../../Graphs/ChartComponent';
import UnderlinedTitle from '../../Components/UnderlinedTitle';

import { Box, Typography, Container, Card, Divider } from '@mui/material';


const sampleData = {
  "title": "Food Waste",
  "sheetId": "1jQYr20b4c93RmIT4M014YY-qSC-n-qpNMysy6Oz3J6U",
  "description": "This dataset visualizes the amount of food waste incurred from dining activities across different on-campus outlets (Dining Halls D1, D2, and the Marketplace). Past data visualizations in the Dining Hall D2, such as the green calendar-styled monthly food waste counter at the entrance, have brought about awareness among the community. Not being constrained by the crowded space in the Dining Halls, this online visualization allows for a more detailed and nuanced break-down of the dataset into timeline, monthly, by-meal statistics...",
  "owner": "NYUAD Dining",
  "onwerContact": "nyuad.dining@nyu.edu",
  "charts": [
    {
      "title": "Daily Food Waste (kg) Per Month, with 95% Confidence Interval",
      "subtitle": "Interact with this calendar to explore the amount of daily food waste (desktop recommended). The unit of measurement is in kilogram(s) of food waste. On average, a plate full of food weighs around 0.5kg (150g for each portion of starch, protein, and vegetable), not including other side dishes. <b>Thus, to imagine how many plates full of food can be saved for those in need, simply multiply the kilogram figure by 2.</b>",
      "gid": 1034106646,
      "headers": 1,
      "chartType": "LineChart",
      "columns": [
        0,
        1,
        {
          "role": "interval",
          "sourceColumn": 2
        },
        {
          "role": "interval",
          "sourceColumn": 3
        },
        {
          "role": "annotation",
          "type": "string",
          "sourceColumn": 4
        }
      ],
      "intervals": {
        "style": "area"
      },
      "colors": [
        "#57068c"
      ],
      "legend": "none"
    },
    {
      "title": "Daily Food Waste (kg), Historical",
      "subtitle": "Interact with this calendar to explore the amount of daily food waste (desktop recommended). The unit of measurement is in kilogram(s) of food waste. On average, a plate full of food weighs around 0.5kg (150g for each portion of starch, protein, and vegetable), not including other side dishes. <b>Thus, to imagine how many plates full of food can be saved for those in need, simply multiply the kilogram figure by 2.</b>",
      "gid": 1952244844,
      "headers": 1,
      "chartType": "Calendar",
      "columns": [
        0,
        5,
        {
          "role": "tooltip",
          "sourceColumn": 8
        }
      ],
      "colorAxis": {
        "colors": [
          "#ffffff",
          "#57068c"
        ]
      }
    },
    {
      "title": "Daily Food Waste by Meal (kg), with 95% Confidence Interval",
      "subtitle": "Interact with this calendar to explore the amount of daily food waste (desktop recommended). The unit of measurement is in kilogram(s) of food waste. On average, a plate full of food weighs around 0.5kg (150g for each portion of starch, protein, and vegetable), not including other side dishes. <b>Thus, to imagine how many plates full of food can be saved for those in need, simply multiply the kilogram figure by 2.</b>",
      "gid": 1107716679,
      "headers": 1,
      "chartType": "LineChart",
      "columns": [
        0,
        1,
        {
          "role": "interval",
          "sourceColumn": 2
        },
        {
          "role": "interval",
          "sourceColumn": 3
        },
        4,
        {
          "role": "interval",
          "sourceColumn": 5
        },
        {
          "role": "interval",
          "sourceColumn": 6
        },
        7,
        {
          "role": "interval",
          "sourceColumn": 8
        },
        {
          "role": "interval",
          "sourceColumn": 9
        }
      ],
      "intervals": {
        "style": "area"
      }
    },
    {
      "query": "SELECT * OFFSET 1",
      "title": "Food Waste (kg) per Day of the Week, with 95% Confidence Interval",
      "subtitle": "Interact with this calendar to explore the amount of daily food waste (desktop recommended). The unit of measurement is in kilogram(s) of food waste. On average, a plate full of food weighs around 0.5kg (150g for each portion of starch, protein, and vegetable), not including other side dishes. <b>Thus, to imagine how many plates full of food can be saved for those in need, simply multiply the kilogram figure by 2.</b>",
      "gid": 171773137,
      "headers": 2,
      "chartType": "ColumnChart",
      "columns": [
        0,
        4,
        {
          "role": "interval",
          "sourceColumn": 5
        },
        {
          "role": "interval",
          "sourceColumn": 6
        },
        7,
        {
          "role": "interval",
          "sourceColumn": 8
        },
        {
          "role": "interval",
          "sourceColumn": 9
        }
      ]
    },
    {
      "title": "Food Waste By Meal, Percentage",
      "subtitle": "Interact with this calendar to explore the amount of daily food waste (desktop recommended). The unit of measurement is in kilogram(s) of food waste. On average, a plate full of food weighs around 0.5kg (150g for each portion of starch, protein, and vegetable), not including other side dishes. <b>Thus, to imagine how many plates full of food can be saved for those in need, simply multiply the kilogram figure by 2.</b>",
      "gid": 387300968,
      "headers": 1,
      "columns": [
        0,
        4,
        {
          "calc": "stringify",
          "type": "string",
          "role": "annotation",
          "sourceColumn": 4
        },
        5,
        {
          "calc": "stringify",
          "type": "string",
          "role": "annotation",
          "sourceColumn": 5
        },
        6,
        {
          "calc": "stringify",
          "type": "string",
          "role": "annotation",
          "sourceColumn": 6
        }
      ],
      "chartType": "ColumnChart",
      "isStacked": true,
      "vAxisFormat": "#.##%"
    }
  ]
};

export default function Project({ setLinkChange, prefersDarkMode }) {
  console.log("dark mode", prefersDarkMode)  
  // for tabs
  // const [toggleTab, setToggleTab] = useState(1);
  // const [changeChart, setCHangeChart] = useState(true);

  // const toggleFunc = (index) => {
  //   setToggleTab(index);
  // };

  const changeFunc = () => {
    setCHangeChart((prevT) => !prevT);
  };

  // for carousel
  // const slides = [
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  // ];

  // for link change(home -> back)
  useEffect(() => {
    let linkState = false;
    if (!linkState) {
      setLinkChange(false);
    }

    return () => {
      linkState = true;
    };
  });

  return (
    <Box>
      <Box>
        <Container sx={{pt: 4, pb: 4}}>
          <UnderlinedTitle text={sampleData.title} />
          <Typography variant='body1' color='text.secondary' gutterBottom>
            {sampleData.description}
          </Typography>
          <br/>
          <Typography variant='body1' color='text.primary' sx={{fontWeight: 'medium'}}>
            Dataset Owner:
          </Typography>
          <Typography variant='body1' color='text.secondary' gutterBottom>
            {sampleData.owner}
          </Typography>
          <Typography variant='body1' color='text.primary' sx={{ fontWeight: 'medium' }}>
            Contact: 
          </Typography>
          <Typography variant='body1' color='text.secondary' gutterBottom>
            {sampleData.onwerContact}
          </Typography>
        </Container>
      </Box>

      {sampleData.charts.map((element, index) => (
        <Box key={index} backgroundColor={(index % 2 == 0)? 'customAlternateBackground' : ''}>
          <Container sx={{ pt: 4, pb: 4 }}>
            <Typography variant='h6' color='text.primary'>
              {index + 1}. {element.title}
            </Typography>
            <Box height={'80vw'} maxHeight={400} className={prefersDarkMode? 'dark-mode' : ''}>
              <ChartComponent
                chartData={{
                  sheetId: sampleData.sheetId,
                  ...element,
                }}
              />
            </Box>
            
            <Typography variant='body1' color='text.secondary' gutterBottom sx={{ pt: 2 }}>
              {element.subtitle}
            </Typography>
          </Container>
        </Box>
      ))}

      {(sampleData.charts.length % 2 != 0) ? <Divider /> : <></>}
    </Box>

    // <div className="graphSection ">
    //   <div className="centerProjectItems1">
    //     <p className="projectName">PROJECT NAME</p>
    //     <div className="tabList">
    //       <button
    //         type="button"
    //         className={toggleTab === 1 ? 'tabs activeTab' : 'tabs'}
    //         onClick={() => toggleFunc(1)}
    //       >
    //         D2
    //       </button>
    //       <button
    //         type="button"
    //         className={toggleTab === 2 ? 'tabs activeTab' : 'tabs'}
    //         onClick={() => toggleFunc(2)}
    //       >
    //         Marketplace
    //       </button>
    //     </div>
    //     <div className="tabContainer">
    //       <div className="tabContents">
    //         <div
    //           className={
    //             toggleTab === 1 ? 'content  activeContent' : 'content'
    //           }
    //         >
    //           <div className="daysSelect">
    //             <p>Last 30 days</p>
    //           </div>
    //           <div className="graphCanvas">
    //             <div className="midGraph">
    //               {/* <ColumnChart toggleTab={changeChart} /> */}
    //               <ChartComponent
    //                 chartData={{
    //                   sheetId: '1jQYr20b4c93RmIT4M014YY-qSC-n-qpNMysy6Oz3J6U',
    //                   title: 'Daily Food Waste (kg), Historical',
    //                   subtitle: '',
    //                   gid: 1952244844,
    //                   headers: 1,
    //                   chartType: 'ColumnChart',
    //                   columns: [
    //                     0,
    //                     5,
    //                     {
    //                       role: 'tooltip',
    //                       sourceColumn: 8,
    //                     },
    //                   ],
    //                   colorAxis: {
    //                     colors: ['#ffffff', '#57068c'],
    //                   },
    //                 }}
    //               />
    //             </div>
    //             <div className="stackedButton">
    //               <Link className="linkButton" to="/project">
    //                 <button
    //                   type="button"
    //                   className="buttonStacked"
    //                   onClick={() => changeFunc()}
    //                 >
    //                   {changeChart ? 'Unstacked' : 'Stacked'}
    //                 </button>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //         <div
    //           className={
    //             toggleTab === 2 ? 'content  activeContent' : 'content'
    //           }
    //         >
    //           <div className="daysSelect">
    //             <p>Last 60 days</p>
    //           </div>
    //           <div className="graphCanvas">
    //             <div className="midGraph"></div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="dlButton">
    //         <Link className="linkButton" to="/project">
    //           <button type="button" className="buttonDl">
    //             Download Raw Data
    //           </button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    /* <div className="carousel-container">
      <div className="centerProjectItems3">
        <div className="carousel-title">
          <p>OTHER AVAILABLE DATA</p>
        </div>
        <Carousel carouselData={slides} />
      </div>
    </div> */
  );
}
