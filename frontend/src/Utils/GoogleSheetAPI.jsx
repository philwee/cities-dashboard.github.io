// disable eslint for this file
/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { gapi } from "gapi-script";

export const LastUpdate = ({ projectName }) => {
    const [lastUpdate, setLastUpdate] = useState("Loading...");
    const notFoundString = "Timestamp of last update not found";

    useEffect(() => {
        const fetchData = async () => {
            try {
                await gapi.load("client:auth2", async () => {
                    await gapi.client.init({
                        apiKey: "AIzaSyCjVRS9swFZFN8FQq9ChM0FHWb_kRc0LCI",
                        discoveryDocs: [
                            "https://sheets.googleapis.com/$discovery/rest?version=v4",
                        ],
                    });
                    const spreadsheetId = "1ddbsEukjKPX3tApu2nYRDoQpLMGpqFdrZ9jh_JYh5Tk";
                    const response = await gapi.client.sheets.spreadsheets.get({
                        spreadsheetId: spreadsheetId,
                    });
                    const metadataSheet = response.result.sheets.find(
                        (sheet) => sheet.properties.title === projectName
                    );
                    if (!metadataSheet) {
                        setLastUpdate(notFoundString);
                        return;
                    }
                    const sheetName = metadataSheet.properties.title;
                    const dataResponse = await gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: spreadsheetId,
                        range: `${sheetName}!A2:A2`,
                    });
                    if (
                        dataResponse.result.values &&
                        dataResponse.result.values.length > 0
                    ) {
                        // console.log(dataResponse.result.values[0][0]);
                        setLastUpdate(dataResponse.result.values[0][0]);
                    } else {
                        setLastUpdate(notFoundString);
                    }
                });
            } catch (err) {
                console.error(err);
                setLastUpdate(notFoundString);
            }
        };

        fetchData();
    }, [projectName]);

    return <div>{lastUpdate}</div>;
};