// disable eslint for this file
/* eslint-disable */

import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

export const LastUpdate = (props) => {
    const { spreadsheetId, lastUpdateGID } = props;
    const [lastUpdate, setLastUpdate] = useState("Loading...");
    const notFoundString = "Timestamp of last update not found";

    // Google Sheets API to get the last modified date of the project's spreadsheet
    useEffect(() => {
        gapi.load('client', () => {
            gapi.client.init({
                apiKey: 'AIzaSyCjVRS9swFZFN8FQq9ChM0FHWb_kRc0LCI',
                discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            }).then(() => {
                // Get all the sheets inside the Google Sheets document to find the name of 
                // the sheet with gid === lastUpdateGID
                // This sheet contains the last modified date of the visualized data
                gapi.client.sheets.spreadsheets.get({
                    spreadsheetId: spreadsheetId,
                    includeGridData: false,
                }).then((response) => {
                    const metadataSheet = response.result.sheets.filter(
                        function (s) { return s.properties.sheetId == Number(lastUpdateGID) }
                    )[0] || null;
                    const sheetName = metadataSheet?.properties?.title;
                    if (!metadataSheet || !sheetName) {
                        setLastUpdate(notFoundString);
                        return;
                    }
                    // Now fetch the cell data
                    const range = `${sheetName}!A2:A2`;
                    gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: spreadsheetId,
                        range: range,
                    }).then((response) => {
                        const result = response.result;
                        if (result.values && result.values.length > 0) {
                            // The cell value should be in the first row and column of the values array
                            const cellValue = result.values[0][0];
                            setLastUpdate(cellValue);
                        } else {
                            setLastUpdate(notFoundString);
                            return;
                        }
                    }).catch((error) => {
                        setLastUpdate(notFoundString);
                        return;
                    });
                }).catch((error) => {
                    setLastUpdate(notFoundString);
                    return;
                });
            });
        });
        console.log(lastUpdate)
    }, [spreadsheetId, lastUpdateGID]);

    return (<>{lastUpdate}</>);
};