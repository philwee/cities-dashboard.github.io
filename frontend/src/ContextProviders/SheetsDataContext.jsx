// disable eslint for this file
/* eslint-disable */

import React, { useState, useEffect, createContext, useContext } from "react";
import { gapi } from "gapi-script";

const SheetsDataContext = createContext();

export const getSheetsMetaData = () => useContext(SheetsDataContext);

export const SheetsDataProvider = ({ children }) => {
    const [sheetData, setSheetData] = useState({});

    useEffect(() => {
        getLastUpdateData().then((data) => {
            setSheetData(data);
        });
    }, []);

    const getLastUpdateData = async () => {
        let sheetDataMap = {};
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
                for (const sheet of response.result.sheets) {
                    const sheetName = sheet.properties.title;
                    const dataResponse = await gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: spreadsheetId,
                        range: `${sheetName}!A2:A2`,
                    });
                    if (dataResponse.result.values && dataResponse.result.values.length > 0) {
                        sheetDataMap[sheetName] = dataResponse.result.values[0][0];
                    }
                }
            });
            return sheetDataMap;
        } catch (err) {
            console.error(err);
            return sheetDataMap;
        }
    };

    return (
        <SheetsDataContext.Provider value={sheetData}>
            {children}
        </SheetsDataContext.Provider>
    );
};
