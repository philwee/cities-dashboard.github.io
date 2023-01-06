// disable eslint for this file
/* eslint-disable */
import { React } from 'react'

import './ChartComponent.css';

export default function HeatMap({ publishedSheetId, gid, height }) {
  const embedLink = `https://docs.google.com/spreadsheets/d/e/${publishedSheetId}/pubhtml?gid=${gid}&single=true&widget=true&headers=false&chrome=false`;
  return (
    <iframe
      className="heat-map-iframe"
        style={{ width: '100%', height: "100%", height: height, border: 'none' }}
        src={embedLink}
        ></iframe>
  );
}
