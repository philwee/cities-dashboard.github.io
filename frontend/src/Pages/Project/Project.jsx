// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LinkContext } from '../../ContextProviders/LinkContext';
import { TabContext } from '../../ContextProviders/TabContext';
import parse from 'html-react-parser';
import ChartComponent from '../../Graphs/ChartComponent';
import SampleDataTable from '../../Graphs/SampleDataTable';
import UppercaseTitle from '../../Components/UppercaseTitle';
import CommentSection from '../../Components/CommentSection';
import { Box, Typography, Container, Divider, Chip, Grid, Tooltip } from '@mui/material';

import GetInTouch from '../Home/GetInTouch';

import ExpandableSection from './ExpandableSection';

import ThemePreferences from '../../Themes/ThemePreferences';

import data from '../../temp_database.json';
import jsonData from '../../section_data.json';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import BarChartIcon from '@mui/icons-material/BarChart';
import CommentIcon from '@mui/icons-material/Comment';

import { replacePlainHTMLWithMuiComponents } from '../../Utils/Utils';
import { DatasetDownloadButton } from './DatasetDownloadButton';

import { scrollToSection } from '../../Components/Header/MenuItemAsNavLink';

import * as Tracking from '../../Utils/Tracking';

import { CommentCountsContext } from '../../ContextProviders/CommentCountsContext';

import { gapi } from 'gapi-script';

// Custom Chip component to display metadata
const CustomChip = (props) => {
  const { tooltipTitle, ...otherProps } = props;
  return (
    <Tooltip title={tooltipTitle}>
      <Chip
        size="small"
        {...otherProps}
      />
    </Tooltip>
  );
}

const Project = ({ themePreference }) => {
  const [_, setCurrentPage, chartsTitlesList, setChartsTitlesList] = useContext(LinkContext);

  let { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useContext(TabContext);

  const [commentCounts] = useContext(CommentCountsContext);

  // Update the page's title
  useEffect(() => { if (project.title) document.title = `${project.title} | CITIES Dashboard`, [project] });

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
        chartsTitles = project.charts.map((element, index) => ({ chartTitle: element.title, chartID: `chart-${index + 1}` }));
      }
    });

    setCurrentPage("project");
    setChartsTitlesList(chartsTitles);

  }, [id, setCurrentPage, setChartsTitlesList]);

  const [lastModified, setLastModified] = useState("Loading...");

  // Google Sheets API to get the last modified date of the project's spreadsheet
  useEffect(() => {
    if (project.sheetId) {
      gapi.load('client', () => {
        gapi.client.init({
          apiKey: 'AIzaSyCjVRS9swFZFN8FQq9ChM0FHWb_kRc0LCI',
          discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(() => {
          // Get all the sheets inside the Google Sheets document to find the name of 
          // the sheet with gid === project.lastUpdateGID
          // This sheet contains the last modified date of the visualized data
          gapi.client.sheets.spreadsheets.get({
            spreadsheetId: project.sheetId,
            includeGridData: false,
          }).then((response) => {
            const sheets = response.result.sheets;
            let sheetName = 'Metadata'; // Default value
            for (let i = 0; i < sheets.length; i++) {
              if (sheets[i].properties.sheetId === Number(project.lastUpdateGID)) {
                sheetName = sheets[i].properties.title;
                break;
              }
            }
            // Now fetch the cell data
            const range = `${sheetName}!A2:A2`;
            gapi.client.sheets.spreadsheets.values.get({
              spreadsheetId: project.sheetId,
              range: range,
            }).then((response) => {
              const result = response.result;
              if (result.values && result.values.length > 0) {
                // The cell value should be in the first row and column of the values array
                const cellValue = result.values[0][0];
                setLastModified(cellValue);
              } else {
                console.log('No data found.');
              }
            }).catch((error) => {
              console.log(error);
            });
          }).catch((error) => {
            console.log(error);
          });
        });
      });
    }
  }, [project.sheetId, project.lastUpdateGID]);

  return (
    <>
      {loading && (
        <Box width="100%">
          <Box>
            <Container sx={{ pt: 4, pb: 4 }}>

              <UppercaseTitle text={project.title} />

              <Grid container spacing={1} sx={{ pb: 3, mt: -3 }}>
                <Grid item>
                  <CustomChip
                    icon={<PersonIcon />}
                    label={project.owner}
                    tooltipTitle="Dataset Owner" />
                </Grid>
                <Grid item>
                  <CustomChip
                    icon={<EmailIcon />}
                    label={project.contact}
                    tooltipTitle="Contact"
                    component="a"
                    href={`mailto:${project.contact}`}
                    clickable
                  />
                </Grid>
                <Grid item>
                  <CustomChip
                    icon={<PublishedWithChangesIcon />}
                    label={lastModified}
                    tooltipTitle="Last Update" />
                </Grid>
                <Grid item>
                  <CustomChip
                    icon={<BarChartIcon />}
                    label={`${project.charts.length} Chart${project.charts.length > 1 && "s"}`}
                    tooltipTitle="Number of Charts"
                    onClick={() => {
                      scrollToSection(jsonData.charts.id);
                      Tracking.sendEventAnalytics(Tracking.Events.internalNavigation,
                        {
                          destination_id: jsonData.charts.id,
                          destination_label: jsonData.project.toString(),
                          origin_id: 'chip'
                        })
                    }}
                  />
                </Grid>
                <Grid item>
                  <CustomChip
                    icon={<CommentIcon />}
                    label={`${commentCounts[project.id]?.commentCounts || "0"} Comment${commentCounts[project.id]?.commentCounts > 1 ? "s" : ""}`}
                    tooltipTitle="Number of Comments"
                    onClick={() => {
                      scrollToSection(jsonData.commentSection.id);
                      Tracking.sendEventAnalytics(Tracking.Events.internalNavigation,
                        {
                          destination_id: jsonData.commentSection.id,
                          destination_label: jsonData.commentSection.toString(),
                          origin_id: 'chip'
                        })
                    }}
                  />
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
                      <SampleDataTable
                        key={index}
                        chartData={element}
                        sheetId={project.sheetId}
                        marginBottom={(index < project.rawDataTables.length - 1) ? 3 : 1}
                      />
                    ))}
                  </>
                }
              />
            </Container>
          </Box>

          <Box id={jsonData.charts.id}>
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
          </Box>


          <Divider />

          <Box id={jsonData.commentSection.id} sx={{ pt: 3, pb: 4 }}>
            <CommentSection pageID={project.id} />
          </Box>

          <Divider />

          <Box id={jsonData.getInTouch.id} sx={{ pt: 3, pb: 4 }}>
            <GetInTouch />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Project;
