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

import ExpandableSection from './ExpandableSection';

import ThemePreferences from '../../ThemePreferences';

import data from '../../temp_database.json';
import './Project.css';

import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

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

const Project = ({ themePreference }) => {
  const [_, setUnderlineLink] = useContext(LinkContext);
  let { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useContext(TabContext);

  useEffect(() => {
    // loop through all projects and find the one with the matching id
    data.map((p) => {
      if (p.id === id) {
        setProject({ ...p });
        let temp = {};
        for (let i = 0; i < p.charts.length; i++) {
          temp[i] = 0;
        }
        setTab(temp);
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

              <UppercaseTitle text={project.title} />

              <Grid container spacing={1} sx={{ pb: 3, mt: -3 }}>
                <Grid item>
                  <Chip size="small" icon={<PersonIcon />} label={project.owner} title="Dataset Owner"/>
                </Grid>
                <Grid item>
                  <Chip size="small" icon={<EmailIcon />} label={project.contact} title="Contact" />
                </Grid>
                <Grid item>
                  <Chip size="small" icon={<PublishedWithChangesIcon />} label={`Last update: ${project.lastUpdate}`} title="Dataset's Last Update" />
                </Grid>
              </Grid>

              {/* google-visualization-table-type-date table-cell */}

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'justify', pb: 3, mb: 0 }}
                gutterBottom
              >
                {parse(project.description)}
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
                    sx={{ mb: 3 }}
                  >
                    {element.subtitle && parse(element.subtitle)}
                    {Object.keys(tab)[index] == index &&
                      element.subcharts &&
                      element.subcharts[Object.values(tab)[index]]
                        .subchartSubtitle &&
                      parse(
                        element.subcharts[Object.values(tab)[index]]
                          .subchartSubtitle
                      )}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {element.reference && parse(element.reference)}
                    {Object.keys(tab)[index] == index &&
                      element.subcharts &&
                      element.subcharts[Object.values(tab)[index]].reference &&
                      parse(
                        element.subcharts[Object.values(tab)[index]].reference
                      )}
                  </Typography>
                </Box>
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
