// disable eslint for this file
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { Box, Link, Typography, Stack, Select, FormControl, MenuItem, Grid, Chip, Dialog, Button, DialogActions, DialogContent, useMediaQuery, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { RawDatasetsMetadataContext } from '../../ContextProviders/RawDatasetsMetadataContext';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import * as Tracking from '../../Utils/Tracking';
import { fetchDataFromURL } from './DatasetFetcher';

export default function DatasetDownloadDialog(props) {
  const { project } = props;
  const rawDatasetsMetadata = useContext(RawDatasetsMetadataContext);
  const [datasets, setDatasets] = useState();

  useEffect(() => {
    if (!project || !rawDatasetsMetadata) return;
    console.log(rawDatasetsMetadata);
    setDatasets(rawDatasetsMetadata[project?.id]); // get all the dataset(s) of this project
  }, [project, rawDatasetsMetadata]);

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function getOwnerString(owners) {
    if (!owners || owners.length === 0) {
      return 'the relevant owners';
    } else if (owners.length === 1) {
      return owners[0];
    } else if (owners.length === 2) {
      return owners.join(' and ');
    } else {
      const lastOwner = owners.pop();
      const oxfordCommaOwners = owners.join(', ');
      return `${oxfordCommaOwners}, and ${lastOwner}`;
    }
  }


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
        <DataObjectIcon sx={{ fontSize: '1rem' }} />&nbsp;Raw Dataset
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        fullScreen={smallScreen}
        keepMounted
      >
        {(
          smallScreen &&
          <DialogActions justifyContent="flex-start">
            <Button autoFocus onClick={handleClose}>
              <ChevronLeftIcon sx={{ fontSize: '1rem' }} />Back
            </Button>
          </DialogActions>
        )}

        <DialogContent sx={{
          px: smallScreen ? 2 : 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          height: '100%'
        }}>
          <Chip label={project.title} size="small" sx={{ mb: 1 }} />
          <Typography variant="h6" >
            Preview and download raw dataset(s)
          </Typography>
          <DatasetSelectorAndPreviewer datasets={datasets} smallScreen={smallScreen} project={project} />
          {
            datasets &&
            <Typography variant="caption" sx={{ mb: 3, fontStyle: 'italic' }} >
              This dataset is provided by the CITIES Dashboard with the support of {getOwnerString(project.owners)}. Should you intend to utilize this dataset for your project, research, or publication, we kindly request that you notify us at <Link href='mailto:nyuad.cities@nyu.edu'>nyuad.cities@nyu.edu</Link> to discuss citation requirements.
            </Typography>
          }
        </DialogContent>
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
      fetchDataFromURL(datasets[0]?.versions[0]?.rawLink, 'csv').then((data) => {
        setPreviewingDataset({ ...datasets[0]?.versions[0], fetchedDataset: data });
      });
    }
  }, [datasets]);

  return (
    <Grid container justifyContent="center" alignItems="start" spacing={3}>
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
        {datasets?.map((dataset) => (
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
      fetchDataFromURL(selectedVersion.rawLink, 'csv').then((data) => {
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

  const formatFileSize = (sizeInBytes) => {
    if (!sizeInBytes) return;

    if (sizeInBytes < 1024 * 1024) {
      return (sizeInBytes / 1024).toFixed(1) + " KB";
    } else {
      return (sizeInBytes / (1024 * 1024)).toFixed(1) + " MB";
    }
  }

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
          {formatFileSize(selectedVersionOfThisDataset?.sizeInBytes)}
        </TableCell>
      </TableRow>
    </>
  )
}

const PreviewDataset = (props) => {
  const { previewingDataset, previewingDatasetId, project, smallScreen } = props;
  const downloadDatasetName = `[${project.id}] ${previewingDataset?.name}-${previewingDataset?.version}.csv`;

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

  const [formattedData, setFormattedData] = useState('');
  const [rowIndices, setRowIndices] = useState('');
  const numFirstLastRowsToPreview = 5;

  useEffect(() => {
    if (!previewingDataset?.fetchedDataset) return;

    const csvData = previewingDataset?.fetchedDataset;
    const lines = csvData.split('\n');
    const numRows = lines.length;

    if (numRows <= numFirstLastRowsToPreview * 2) {
      setFormattedData(csvData);
      setRowIndices(Array.from({ length: numRows }, (_, index) => index + 1).join('\n')); // +1 because rowNumber starts at 1 while index starts at 0
    } else {

      const firstRows = lines.slice(0, numFirstLastRowsToPreview);
      const lastRows = lines.slice(numRows - numFirstLastRowsToPreview);

      const numOfHiddenRows = numRows - 2 * numFirstLastRowsToPreview;

      const middleRow = [`... [${numOfHiddenRows} rows hidden] ...`];

      setFormattedData(firstRows.concat(middleRow).concat(lastRows).join('\n'));
      setRowIndices(
        Array.from({
          length: numFirstLastRowsToPreview * 2 + 1 // +1 to account for the middleRow
        },
          (_, index) => {
            const rowIndex = index + 1; // +1 because rowNumber starts at 1 while index starts at 0
            // Indices for the first rows
            if (rowIndex < numFirstLastRowsToPreview + 1) {
              return rowIndex;
            }
            // No index for the middle row
            else if (rowIndex == numFirstLastRowsToPreview + 1) {
              return '';
            }
            // Indices for the last rows
            else {
              return numOfHiddenRows + rowIndex - 1;
            }
          })
          .join('\n'));
    }

  }, [previewingDataset]);

  return (
    <Stack spacing={1}>
      <Box sx={{ '& *': { fontFamily: "monospace !important" } }}>
        <Chip
          icon={<VisibilityIcon />}
          label={`Previewing${previewingDataset && `: ${previewingDataset.name} (${previewingDataset?.version})`}`}
          size="small"
          sx={{
            backgroundColor: theme.palette.customBackground,
            borderRadius: 0,
            borderTopLeftRadius: theme.spacing(1),
            borderTopRightRadius: theme.spacing(1),
            p: 1,
            pb: 0,
          }}
        />
        <Box
          component="pre"
          sx={{
            overflowX: 'auto',
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.customBackground,
            p: 2,
            pt: 1.5,
            borderRadius: theme.spacing(1),
            borderTopLeftRadius: 0,
            minHeight: "5rem",
            width: smallScreen ? '100%' : 'unset',
            marginTop: 0
          }}
        >
          <Stack direction="row" sx={{ fontSize: smallScreen ? '0.625rem !important' : '0.8rem !important' }}>
            <Box sx={{ mr: 2, userSelect: 'none' }}>
              {rowIndices}
            </Box>
            <Box>
              {formattedData}
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box textAlign="center" >
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
          disabled={!previewingDataset}
        >
          <DownloadIcon sx={{ fontSize: '1.25rem', mr: 0.5 }} />
          {previewingDataset ? downloadDatasetName : "No dataset available to download"}
        </Button>
      </Box>
    </Stack >
  )
}