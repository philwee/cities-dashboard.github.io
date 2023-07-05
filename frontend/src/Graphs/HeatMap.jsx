import { React } from 'react';

export default function HeatMap({ publishedSheetId, gid, range }) {
  const embedLink = `https://docs.google.com/spreadsheets/d/e/${publishedSheetId}/pubhtml?gid=${gid}&single=true&widget=false&headers=false&chrome=false&range=${range}`;
  return (
    <iframe
      title="Heatmap-iframe"
      className="heat-map-iframe"
      style={{ width: '100%', height: '100%', border: 'none' }}
      src={embedLink}
    >
      Loading...

    </iframe>
  );
}
