// disable eslint for this file
/* eslint-disable */
import { useState, useEffect } from 'react';
import { Stack, IconButton, Select, FormControl, MenuItem, Grid, Chip, Container, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HistoryIcon from '@mui/icons-material/History';

import * as Tracking from '../../Utils/Tracking';
import { fetchDataFromURL } from './DatasetFetcher';

const datasetMetadata = {
  "athletic-facilities-check-in": [
    {
      id: "30903651",
      versions: [
        {
          "name": "_update-here_-by-month",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/main/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-26",
          "size": "0.24 KB"
        },
        {
          "name": "_update-here_-by-month",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/7f6a0600091ecd87b8f2fb254e4aef8a61461eee/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-25",
          "size": "0.16 KB"
        },
        {
          "name": "_update-here_-by-month",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/027dfe06de674884ea832cec464e1c4e7f68ed53/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-24",
          "size": "0.24 KB"
        }
      ]
    },
    {
      id: "948552227",
      versions: [
        {
          "name": "super-long-name-name-nameafadvadvadaasdasdsadadadas",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/main/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-day.csv",
          "version": "2023-08-24",
          "size": "0.12 KB"
        }
      ]
    },
    {
      id: "1993454060",
      versions: [
        {
          "name": "_update-here_-by-hour",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/main/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-hour.csv",
          "version": "2023-08-24",
          "size": "0.26 KB"
        }
      ]
    }
  ],
  "air-quality": [
    {
      id: "30903651",
      versions: [
        {
          "name": "latest-name",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/main/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-29",
          "size": "0.24 KB"
        },
        {
          "name": "super-long-name-name-name",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/7f6a0600091ecd87b8f2fb254e4aef8a61461eee/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-28",
          "size": "1.6 KB"
        },
        {
          "name": "_update-here_-by-month",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/027dfe06de674884ea832cec464e1c4e7f68ed53/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-27",
          "size": "0.24 KB"
        },
        {
          "name": "_update-here_-by-month",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/main/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-26",
          "size": "0.24 KB"
        },
        {
          "name": "_update-here_-by-month",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/7f6a0600091ecd87b8f2fb254e4aef8a61461eee/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-25",
          "size": "0.16 KB"
        },
        {
          "name": "_update-here_-by-month",
          "rawLink": "https://raw.githubusercontent.com/RitinDev/CITIES-data-scraper-test/027dfe06de674884ea832cec464e1c4e7f68ed53/athletic-facilities-check-in/athletic-facilities-check-in-_update-here_-by-month.csv",
          "version": "2023-08-24",
          "size": "0.24 KB"
        }
      ]
    }
  ]
};

export default function DatasetDownloadDialog(props) {
  const { project } = props;
  const [datasets, setDatasets] = useState();

  useEffect(() => {
    setDatasets(datasetMetadata[project?.id]); // get all the dataset(s) of this project
  }, [project]);

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          Tracking.sendEventAnalytics(Tracking.Events.rawDatasetButtonClicked);
        }}
        variant="contained"
      >
        Download Raw Dataset
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        fullScreen={smallScreen}
        keepMounted
      >
        <DialogTitle sx={{ px: smallScreen ? 1.5 : 3 }}>
          <Chip label={project.title} size="small" />
          <br />
          Preview and download raw dataset(s)
        </DialogTitle>
        <DialogContent sx={{ px: smallScreen ? 1 : 3 }}>
          <DatasetSelectorAndPreviewer datasets={datasets} smallScreen={smallScreen} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const DatasetSelectorAndPreviewer = (props) => {
  const { datasets, smallScreen } = props;
  const [previewingDataset, setPreviewingDataset] = useState();
  const [previewingDatasetId, setPreviewingDatasetId] = useState();

  // Preview the first version of the first dataset initially
  useEffect(() => {
    if (datasets?.length > 0) {
      setPreviewingDataset(datasets[0]?.versions[0]);
      setPreviewingDatasetId(datasets[0]?.id);
      fetchDataFromURL(datasets[0]?.versions[0]?.rawLink).then((data) => {
        setPreviewingDataset({ ...datasets[0]?.versions[0], fetchedDataset: data });
      });
    }
  }, [datasets]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={1}>
      <Grid item sm={12} md={6}>
        <DatasetsTable
          datasets={datasets}
          smallScreen={smallScreen}
          previewingDataset={previewingDataset}
          setPreviewingDataset={setPreviewingDataset}
          previewingDatasetId={previewingDatasetId}
          setPreviewingDatasetId={setPreviewingDatasetId}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <Container>
          <PreviewDataset
            previewingDataset={previewingDataset}
          />
        </Container>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>
  )
};

const DatasetsTable = (props) => {
  const { datasets, smallScreen, previewingDataset, setPreviewingDataset, previewingDatasetId, setPreviewingDatasetId } = props;
  return (
    <Table
      size="small"
      sx={{
        tableLayout: 'fixed',
        '& td, div, .MuiMenuItem-root': {
          fontSize: smallScreen ? '0.625rem !important' : '0.8rem !important'
        }
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={{ p: 0, width: '2rem' }} />
          <TableCell sx={{ pl: 1 }}>
            Dataset
          </TableCell>
          <TableCell sx={{ width: smallScreen ? '6.5rem' : '8rem' }}>Version</TableCell>
          {
            !smallScreen &&
            <TableCell sx={{ width: '6rem' }}>
              Size
            </TableCell>
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {datasets.map((dataset) => (
          <Dataset
            smallScreen={smallScreen}
            dataset={dataset}
            previewingDataset={previewingDataset}
            setPreviewingDataset={setPreviewingDataset}
            isPreviewing={dataset.id === previewingDatasetId}
            setPreviewingDatasetId={setPreviewingDatasetId}
          />
        ))}
      </TableBody>
    </Table>
  )
}

const Dataset = (props) => {
  const { smallScreen, dataset, previewingDataset, setPreviewingDataset, isPreviewing, previewingDatasetId, setPreviewingDatasetId } = props;

  const [fetchedDatasets, setFetchedDatasets] = useState({});

  const latestVersionOfThisDataset = dataset?.versions[0] || {};

  const [selectedVersionOfThisDataset, setSelectedVersionOfThisDataset] = useState(latestVersionOfThisDataset);

  const handleVersionChange = (event) => {
    // Loop through the array (allVersionsOfThisDataset) to find the one with the selected version
    const selectedVersion = dataset?.versions.find(aDatasetVersion => {
      return aDatasetVersion.version === event.target.value;
    });
    setSelectedVersionOfThisDataset(selectedVersion);
    setPreviewingDatasetId(dataset.id);

    setPreviewingDataset(selectedVersion);

    updateFetchedDataset(selectedVersion);
  };

  const updateFetchedDataset = (selectedVersion) => {
    // If this dataset version hasn't been fetched yet,
    // fetch it and append it into the object fetchedDatasets
    if (!fetchedDatasets[selectedVersion.version]) {
      fetchDataFromURL(selectedVersion.rawLink).then((data) => {
        const selectedVersionWithFetchedDataset = { ...selectedVersion, fetchedDataset: data };
        setPreviewingDataset(selectedVersionWithFetchedDataset);
        setFetchedDatasets({
          ...fetchedDatasets,
          [selectedVersionWithFetchedDataset.version]: selectedVersionWithFetchedDataset
        });
      });
    }
    // If it has been fetched before, simply get it from memory 
    else {
      setPreviewingDataset(fetchedDatasets[selectedVersion.version]);
    }
  }

  const setThisDatasetToPreview = () => {
    if (previewingDatasetId !== dataset.id) {
      setPreviewingDatasetId(dataset.id);
      setPreviewingDataset(selectedVersionOfThisDataset);
      updateFetchedDataset(selectedVersionOfThisDataset);
    }
  }

  const downloadThisDatasetVersion = () => {
    if (!fetchedDatasets[selectedVersionOfThisDataset.version]) {
      fetchDataFromURL(selectedVersionOfThisDataset.rawLink).then((data) => {
        const selectedVersionWithFetchedDataset = { ...selectedVersionOfThisDataset, fetchedDataset: data };
        setPreviewingDatasetId(dataset.id);
        setPreviewingDataset(selectedVersionWithFetchedDataset);
        setFetchedDatasets({
          ...fetchedDatasets,
          [selectedVersionWithFetchedDataset.version]: selectedVersionWithFetchedDataset
        });
        const blob = new Blob([data], { type: 'application/octet-stream' }); // create a Blob with the raw data
        const url = URL.createObjectURL(blob); // create a download link for the Blob
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `raw_dataset.csv`;
        document.body.appendChild(downloadLink);
        downloadLink.click(); // simulate a click on the download link
        URL.revokeObjectURL(url); // clean up by revoking the object URL
        document.body.removeChild(downloadLink);
      });
    }
    // If it has been fetched before, simply get it from memory 
    else {
      setPreviewingDataset(fetchedDatasets[selectedVersionOfThisDataset.version]);
    }
  };

  return (
    <>
      <TableRow key={dataset.id}>
        <TableCell sx={{ p: 0 }}>
          <IconButton
            sx={{ opacity: 0.5, ':hover': { color: 'primary.main', opacity: 1 } }}
            onClick={downloadThisDatasetVersion}
          >
            <CloudDownloadIcon fontSize="small" />
          </IconButton>
        </TableCell>

        <TableCell
          sx={{
            pl: 1,
            cursor: 'pointer',
            textDecoration: isPreviewing && 'underline'
          }}
          onClick={setThisDatasetToPreview}>
          {selectedVersionOfThisDataset?.name}
        </TableCell>

        <TableCell>
          <FormControl size="small">
            <Select
              value={selectedVersionOfThisDataset?.version}
              onClick={() => {
                if (dataset.versions.length <= 1) setThisDatasetToPreview();
              }}
              onChange={handleVersionChange}
              variant="standard"
              MenuProps={{ disablePortal: true }}
            >
              {dataset?.versions.map((aDatasetVersion) => (
                <MenuItem
                  key={aDatasetVersion.version}
                  value={aDatasetVersion.version}

                >
                  {aDatasetVersion.version}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        {
          !smallScreen &&
          <TableCell>
            {selectedVersionOfThisDataset?.size}
          </TableCell>
        }
      </TableRow>
    </>
  )
}

const CodeBlock = styled('pre')(({ theme }) => ({
  overflowX: 'auto',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.customBackground,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  minHeight: "5rem"
}));

const PreviewDataset = (props) => {
  const { previewingDataset } = props;
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      direction={mediumScreen ? 'column-reverse' : 'column'}
      sx={{
        '& *': {
          fontFamily: "monospace !important"
        }
      }}>
      <Grid container spacing={1}>
        <Grid item>
          <Chip label={previewingDataset?.name} icon={<VisibilityIcon />} size="small" />
        </Grid>
        <Grid item>
          <Chip label={previewingDataset?.version} icon={<HistoryIcon />} size="small" />
        </Grid>
        <Grid item>
          <Chip label={previewingDataset?.size} icon={<InsertDriveFileIcon />} size="small" />
        </Grid>
      </Grid>
      <CodeBlock>
        {previewingDataset?.fetchedDataset}
      </CodeBlock>
    </Stack>

  )
}