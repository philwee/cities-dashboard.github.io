// disable eslint for this file
/* eslint-disable */

import { useState, useEffect, createContext } from "react";
import { gapi } from "gapi-script";

export const SheetsDataContext = createContext();

export const SheetsDataProvider = (props) => {
    const [sheetData, setSheetData] = useState({});

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                apiKey: "AIzaSyCjVRS9swFZFN8FQq9ChM0FHWb_kRc0LCI",
                discoveryDocs: [
                    "https://sheets.googleapis.com/$discovery/rest?version=v4",
                ],
            }).then(() => {
                getLastUpdateData().then((data) => {
                    setSheetData(data);
                });
            }).catch(err => {
                console.error(err);
            });
        });
    }, []);

    const getLastUpdateData = async () => {
        let sheetDataMap = {};
        try {
            const spreadsheetId = "1ddbsEukjKPX3tApu2nYRDoQpLMGpqFdrZ9jh_JYh5Tk";
            const response = await gapi.client.sheets.spreadsheets.get({ spreadsheetId });

            // Create an array of ranges
            const ranges = response.result.sheets.map(sheet => `${sheet.properties.title}!A2:A2`);
            // Use batchGet to get all ranges in a single Google Sheet document
            // Avoid calling get multiple times --> Only 1 API call
            const dataResponse = await gapi.client.sheets.spreadsheets.values.batchGet({
                spreadsheetId,
                ranges,
            });

            dataResponse.result.valueRanges.forEach((range, index) => {
                if (range.values && range.values.length > 0) {
                    const sheetName = getSheetNameFromRange(ranges[index]);
                    sheetDataMap[sheetName] = range.values[0][0];
                }
            });
            return sheetDataMap;
        } catch (err) {
            console.error(err);
            return sheetDataMap;
        }
    };

    const getSheetNameFromRange = (range) => {
        return range.split('!')[0]; // Range format: [sheetName]![A2:A2] 
    };

    return (
        <SheetsDataContext.Provider value={[sheetData]}>
            {props.children}
        </SheetsDataContext.Provider>
    );
};
