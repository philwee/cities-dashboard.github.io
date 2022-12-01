// disable eslint for this file
/* eslint-disable */
export default function HeatMap({ sheetLink }) {
  const embedLink = `https://docs.google.com/spreadsheets/d/e/${sheetLink}&amp;single=false&amp;widget=false&amp;headers=false`;

  return <iframe style={{ width: '100%', border: 'none' }} src={embedLink} />;
}
