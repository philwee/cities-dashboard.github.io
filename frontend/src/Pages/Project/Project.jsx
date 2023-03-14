// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { TabContext } from '../../ContextProviders/TabContext';
import parse from 'html-react-parser';
import ChartComponent from '../../Graphs/ChartComponent';
import UnderlinedTitle from '../../Components/UnderlinedTitle';
import { Box, Typography, Container, Divider, Button } from '@mui/material';
import data from '../../temp_database.json';
import './Project.css';

import { MdLink } from 'react-icons/md';
import zIndex from '@mui/material/styles/zIndex';

// Download button: download raw dataset
function DownloadButton({ project }) {
  const isDisabled = project.sheetId == null ? true : false;
  return (
    <a
      href={
        isDisabled
          ? ''
          : `https://docs.google.com/spreadsheets/d/${project.sheetId}`
      }
      target="_blank"
      rel="noreferrer"
    >
      <Button disabled={isDisabled} variant="contained">
        <MdLink />
        &nbsp;
        {isDisabled ? 'COMING SOON' : 'FULL DATASET'}
      </Button>
    </a>
  );
}

const Project = ({ prefersDarkMode }) => {
  const [_, setUnderlineLink] = useContext(LinkContext);
  let { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab] = useContext(TabContext);

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

  return (
    <>
      {loading && (
        <Box width="100%">
          <Box>
            <Container sx={{ pt: 4, pb: 4 }}>
              <UnderlinedTitle text={project.title} />
              <br />
              <br />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'justify' }}
                gutterBottom
              >
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
              <br />
              <DownloadButton project={project} />
              <br />
              <br />
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ fontWeight: 'medium' }}
              >
                Sample Data:
              </Typography>
              {project.rawDataTables.map((element, index) => (
                <Box
                  key={index}
                  sx={{ pt: 1 }}
                  className={prefersDarkMode ? 'dark-mode' : ''}
                >
                  <ChartComponent
                    chartData={{
                      chartType: 'Table',
                      sortAscending: true,
                      frozenColumns: 1,
                      sheetId: project.sheetId,
                      ...element,
                    }}
                  />
                </Box>
              ))}
            </Container>
          </Box>

          {project.charts.map((element, index) => (
            <Box
              key={index}
              backgroundColor={
                index % 2 == 0 ? 'customAlternateBackground' : ''
              }
            >
              <Container
                sx={{ pt: 4, pb: 4 }}
                className={prefersDarkMode ? 'dark-mode' : ''}
                height="auto"
              >
                <Typography variant="h6" color="text.primary">
                  {index + 1}. {element.title}
                </Typography>
                <Box
                  height={element.chartType == 'HeatMap' ? '' : '60vw'}
                  maxHeight={element.chartType == 'HeatMap' ? '' : 600}
                >
                  <ChartComponent
                    chartData={{
                      sheetId: project.sheetId,
                      ...element,
                    }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  gutterBottom
                  sx={{
                    mt: 2,
                    paddingTop: 3,
                    paddingLeft: 2,
                    paddingRight: 2,
                    textAlign: 'justify',
                  }}
                >
                  {element.subtitle && parse(element.subtitle)}
                  {element.subIndex &&
                    element.subIndex == Object.keys(tab)[index] &&
                    element.subcharts[Object.values(tab)[index]].subtext &&
                    parse(element.subcharts[Object.values(tab)[index]].subtext)}
                  {element.reference && parse(element.reference)}
                </Typography>
              </Container>
            </Box>
          ))}

          {project.charts.length % 2 != 0 ? <Divider /> : <></>}
        </Box>
      )}
    </>
  );
};

export default Project;
