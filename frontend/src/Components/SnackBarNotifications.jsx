// disable eslint for this file
/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Snackbar, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material/';

function SimpleSnackBar({ message, open, handleClose, autoHideDuration }) {
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <Close color="secondary" fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            size='small'
            open={open}
            onClose={handleClose}
            autoHideDuration={autoHideDuration ?? autoHideDuration}
            message={<Typography variant='caption'>{message}</Typography>}
            action={action}
        />
    );
};

export default function DeviceOrientationNotification() {
    // Default is to hide the notification
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(orientation: portrait)');

        // If the device orientation is portrait --> show the notification, and vice versa
        const handleOrientationChange = (e) => {
            (e.matches) ? setOpen(true) : setOpen(false);
        };

        handleOrientationChange(mediaQuery);

        mediaQuery.addEventListener('change', handleOrientationChange);

        return () => {
            mediaQuery.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    const handleClose = (event, reason) => {
        // If the user click away from the notification, don't close it
        // Only close when clicking on the X button
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <SimpleSnackBar
            message='The dashboard is best experienced on computers'
            open={open}
            handleClose={handleClose}
            autoHideDuration={10000}
        />
    );
}
