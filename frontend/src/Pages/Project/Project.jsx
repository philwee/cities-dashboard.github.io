// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import parse from 'html-react-parser';
import ChartComponent from '../../Graphs/ChartComponent';
import UnderlinedTitle from '../../Components/UnderlinedTitle';
import { Box, Typography, Container, Divider } from '@mui/material';
import data from '../../temp_database.json';
import './Project.css';

export default function Project({ prefersDarkMode }) {
  const [_, setUnderlineLink] = useContext(LinkContext);
  let { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // loop through all projects and find the one with the matching id
    data.map((p) => {
      if (p.id === id) {
        setProject({ ...p });
        setLoading(true);
      }
    });

    setUnderlineLink('project');
  }, [id, setUnderlineLink]);

  // for tabs
  // const [toggleTab, setToggleTab] = useState(1);
  // const [changeChart, setCHangeChart] = useState(true);

  // const toggleFunc = (index) => {
  //   setToggleTab(index);
  // };

  // const changeFunc = () => {
  //   setCHangeChart((prevT) => !prevT);
  // };

  // for carousel
  // const slides = [
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  //   <CarouselCard title="Project" date="Updated:Apr 5,2022" />,
  // ];

  // for link change(home -> back)

  return (
    <>
      {loading && (
        <Box>
          <Box>
            <Container sx={{ pt: 4, pb: 4 }}>
              <UnderlinedTitle text={project.title} />
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {parse(project.description)}
              </Typography>
              <br />
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ fontWeight: 'medium' }}
              >
                Dataset Owner:
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {project.owner}
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ fontWeight: 'medium' }}
              >
                Contact:
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {project.onwerContact}
              </Typography>
            </Container>
          </Box>

          {project.charts.map((element, index) => (
            <Box
              key={index}
              backgroundColor={
                index % 2 == 0 ? 'customAlternateBackground' : ''
              }
            >
              <Container sx={{ pt: 4, pb: 4 }} className={prefersDarkMode ? 'dark-mode' : ''}>
                <Typography variant="h6" color="text.primary">
                  {index + 1}. {element.title}
                </Typography>
                  <ChartComponent
                    chartData={{
                      sheetId: project.sheetId,
                      ...element,
                    }}
                  />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  gutterBottom
                  sx={{ mt: 2 }}
                >
                  {parse(element.subtitle)}
                </Typography>
              </Container>
            </Box>
          ))}

          {project.charts.length % 2 != 0 ? <Divider /> : <></>}
        </Box>
      )}
    </>

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
