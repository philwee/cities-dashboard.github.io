// disable eslint for this file
/* eslint-disable */

export default function HeatMap({ publishedSheetId, gid }) {
  const embedLink = `https://docs.google.com/spreadsheets/d/e/${publishedSheetId}/pubhtml?gid=${gid}&single=false&widget=true&headers=false&chrome=false`;

  return (
    <iframe
      style={{ display: 'block', width: '100%', maxWidth: '450px', height: '100%', marginTop: '1rem', border: 'none' }}
      src={embedLink}
    ></iframe>
  );
}
