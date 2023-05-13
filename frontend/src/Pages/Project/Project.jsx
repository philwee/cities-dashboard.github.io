// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { TabContext } from '../../ContextProviders/TabContext';
import parse from 'html-react-parser';
import ChartComponent from '../../Graphs/ChartComponent';
import UppercaseTitle from '../../Components/UppercaseTitle';
import { Box, Typography, Container, Divider, Button, Chip, Grid } from '@mui/material';

import JoinUs from '../Home/JoinUs';

import ExpandableSection from './ExpandableSection';

import ThemePreferences from '../../ThemePreferences';

import data from '../../temp_database.json';
import './Project.css';

import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

import { replacePlainHTMLWithMuiComponents } from '../../Utils';

// Download button: download raw dataset
const DatasetDownloadButton = ({ project }) => {
  const isDisabled = project.sheetId == null ? true : false;
  return (
    <Box>
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
          <LinkIcon />
          &nbsp;
          {isDisabled ? 'COMING SOON' : 'FULL DATASET'}
        </Button>
      </a>
    </Box>
  );
};

// Custom Chip component to display metadata
const CustomChip = ({ icon, label }) => {
  return (
    <Chip
      size="small"
      icon={icon}
      label={label}
    />
  );
}

const Project = ({ themePreference }) => {
  const [_, setCurrentPage, chartsTitlesList, setChartsTitlesList] = useContext(LinkContext);

  let { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useContext(TabContext);

  // Update the currentPage with the project's ID
  // and the chartsTitle with all the charts' titles of the project
  useEffect(() => {
    // loop through all projects and find the one with the matching id
    let chartsTitles = [];

    data.map((project) => {
      if (project.id === id) {
        setProject({ ...project });
        let temp = {};
        for (let i = 0; i < project.charts.length; i++) {
          temp[i] = 0;
        }
        setTab(temp);
        setLoading(true);
        // Populate the array with all the charts' titles of the project
        chartsTitles = project.charts.map((element, index) => ({ chartTitle: element.title, chartID: `-${index + 1}` }));
      }
    });

    setCurrentPage(id);
    setChartsTitlesList(chartsTitles);

  }, [id, setCurrentPage, setChartsTitlesList]);

  return (
    <>
      {loading && (
        <Box width="100%">
          <Box>
            <Container sx={{ pt: 4, pb: 4 }}>

              <UppercaseTitle text={project.title} />

              <Grid container spacing={1} sx={{ pb: 3, mt: -3 }}>
                <Grid item>
                  <CustomChip icon={<PersonIcon />} label={project.owner} />
                </Grid>
                <Grid item>
                  <CustomChip icon={<EmailIcon />} label={project.contact} />
                </Grid>
                <Grid item>
                  <CustomChip icon={<PublishedWithChangesIcon />} label={`Last update: ${project.lastUpdate}`} />
                </Grid>
              </Grid>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'justify', pb: 3, mb: 0 }}
                gutterBottom
              >
                {parse(project.description, {
                  replace: replacePlainHTMLWithMuiComponents,
                })}
              </Typography>

              <DatasetDownloadButton project={project} />

              <ExpandableSection
                title="Sample Data"
                content={
                  <>
                    {project.rawDataTables.map((element, index) => (
                      <Box
                        key={index}
                        sx={
                          index < project.rawDataTables.length - 1
                            ? { mb: 3 }
                            : { mb: 1 }
                        }
                      >
                        <ChartComponent
                          chartData={{
                            chartType: 'Table',
                            sortAscending: true,
                            frozenColumns: 1,
                            sheetId: project.sheetId,
                            ...element,
                          }}
                          themePreference={themePreference}
                          isHomepage={false}
                        />
                      </Box>
                    ))}
                  </>
                }
              />
            </Container>
          </Box>

          {project.charts.map((element, index) => (
            <Box
              id={chartsTitlesList[index].chartID} // set the chartWrapper's ID to help Navbar in Header scroll to
              key={index}
              backgroundColor={
                index % 2 == 0 ? 'customAlternateBackground' : ''
              }
            >
              <Container
                sx={{ pt: 4, pb: 4 }}
                height="auto"
                className={themePreference === ThemePreferences.dark ? 'dark' : ''}
              >
                <Typography variant="h6" color="text.primary">
                  {index + 1}. {element.title}
                </Typography>
                <ChartComponent
                  chartData={{
                    chartIndex: index,
                    sheetId: project.sheetId,
                    ...element,
                  }}
                />
                <Box sx={{ m: 3 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {element.subtitle && parse(element.subtitle, {
                      replace: replacePlainHTMLWithMuiComponents,
                    })}
                    {Object.keys(tab)[index] == index &&
                      element.subcharts &&
                      element.subcharts[Object.values(tab)[index]]
                        .subchartSubtitle &&
                      parse(
                        element.subcharts[Object.values(tab)[index]]
                          .subchartSubtitle, {
                        replace: replacePlainHTMLWithMuiComponents,
                      }
                      )}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {element.reference && parse(element.reference, {
                      replace: replacePlainHTMLWithMuiComponents,
                    })}
                    {Object.keys(tab)[index] == index &&
                      element.subcharts &&
                      element.subcharts[Object.values(tab)[index]].reference &&
                      parse(
                        element.subcharts[Object.values(tab)[index]].reference, {
                        replace: replacePlainHTMLWithMuiComponents,
                      }
                      )}
                  </Typography>
                </Box>
              </Container>
            </Box>
          ))}

          {project.charts.length % 2 != 0 ? <></> : <Divider />}

          <Box id="join-us" sx={{ pt: 3, pb: 3 }}>
            <JoinUs />
          </Box>

          {project.charts.length % 2 != 0 ? <Divider /> : <></>}
        </Box>
      )}
    </>
  );
};

export default Project;
