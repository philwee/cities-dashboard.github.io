// disable eslint for this file
/* eslint-disable */
import { useState, useEffect } from 'react';
import { Box, Typography, Stack, Select, FormControl, MenuItem, Grid, Chip, Dialog, Button, DialogActions, DialogContent, DialogTitle, useMediaQuery, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

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
          Tracking.sendEventAnalytics(Tracking.Events.rawDatasetButtonClicked, {
            project_id: project.id
          });
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
        <DialogContent sx={{
          px: smallScreen ? 2 : 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <Typography variant="h6" textAlign="left" width="100%" sx={{ mb: 3 }}>
            <Chip label={project.title} size="small" />
            <br />
            Preview and download raw dataset(s)
          </Typography>
          <DatasetSelectorAndPreviewer datasets={datasets} smallScreen={smallScreen} project={project} />
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
  const { datasets, smallScreen, project } = props;
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
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
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
      <Grid item sm={12} md={6} maxWidth={smallScreen ? '100%' : 'unset'}>
        <PreviewDataset
          previewingDataset={previewingDataset}
          previewingDatasetId={previewingDatasetId}
          project={project}
          smallScreen={smallScreen}
        />
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
          <TableCell sx={{ pl: 1 }}>
            Dataset
          </TableCell>
          <TableCell sx={{ width: smallScreen ? '6.5rem' : '8rem' }}>Version</TableCell>
          <TableCell sx={{ width: smallScreen ? '5rem' : '6rem' }}>
            Size
          </TableCell>
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
  const { dataset, setPreviewingDataset, isPreviewing, previewingDatasetId, setPreviewingDatasetId } = props;

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

    fetchThisDataset(selectedVersion);
  };

  const fetchThisDataset = (selectedVersion) => {
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
      fetchThisDataset(selectedVersionOfThisDataset);
    }
  }

  const theme = useTheme();

  return (
    <>
      <TableRow key={dataset.id}>
        <TableCell
          sx={{
            pl: 1,
            cursor: 'pointer',
            background: isPreviewing && theme.palette.background.NYUpurpleLight
          }}
          onClick={setThisDatasetToPreview}>
          {selectedVersionOfThisDataset?.name}
        </TableCell>

        <TableCell sx={{ background: isPreviewing && theme.palette.background.NYUpurpleLight }}>
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
        <TableCell sx={{ background: isPreviewing && theme.palette.background.NYUpurpleLight }}>
          {selectedVersionOfThisDataset?.size}
        </TableCell>
      </TableRow>
    </>
  )
}

const PreviewDataset = (props) => {
  const { previewingDataset, previewingDatasetId, project, smallScreen } = props;
  const downloadDatasetName = `${previewingDataset?.name}-[${previewingDataset?.version}].csv`;

  const theme = useTheme();

  const downloadPreviewingDataset = () => {
    if (!previewingDataset?.fetchedDataset) return;

    const blob = new Blob([previewingDataset?.fetchedDataset], { type: 'application/octet-stream' }); // create a Blob with the raw data
    const url = URL.createObjectURL(blob); // create a download link for the Blob
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = downloadDatasetName;
    document.body.appendChild(downloadLink);
    downloadLink.click(); // simulate a click on the download link
    URL.revokeObjectURL(url); // clean up by revoking the object URL
    document.body.removeChild(downloadLink);
  };

  return (
    <Stack spacing={1}>
      <Box >
        <Chip
          icon={<VisibilityIcon />}
          label="Preview"
          size="small"
          sx={{
            '& .MuiChip-label': {
              fontFamily: "monospace !important"
            },
            backgroundColor: theme.palette.customBackground,
            borderRadius: 0,
            borderTopLeftRadius: theme.spacing(1),
            borderTopRightRadius: theme.spacing(1),
            p: 1,
            pb: 0,
            mb: -1
          }}
        />
        <Box
          component="pre"
          sx={{
            overflowX: 'auto',
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.customBackground,
            p: 2,
            borderRadius: theme.spacing(1),
            borderTopLeftRadius: 0,
            minHeight: "5rem",
            fontFamily: "monospace !important",
            width: smallScreen ? '100%' : 'unset',
            marginTop: 0
          }}
        >
          {previewingDataset?.fetchedDataset}
        </Box>
      </Box>

      <Box textAlign="center">
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            textAlign: 'left',
            lineHeight: 1.1,
            px: 1.5,
            py: 1
          }}
          onClick={() => {
            downloadPreviewingDataset();
            Tracking.sendEventAnalytics(Tracking.Events.rawDatasetDownloaded, {
              project_id: project.id,
              dataset_id: previewingDatasetId,
              dataset_name: previewingDataset.name,
              dataset_version: previewingDataset.version
            });
          }}
        >
          <DownloadIcon sx={{ fontSize: '1.25rem' }} />&nbsp;
          {downloadDatasetName} <Box sx={{ ml: 2 }}>({previewingDataset?.size})</Box>
        </Button>
      </Box>
    </Stack >

  )
}