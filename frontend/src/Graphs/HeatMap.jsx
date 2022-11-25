export default function HeatMap({sheetLink}){
    const embedLink = `https://docs.google.com/spreadsheets/d/e/${sheetLink}&amp;single=false&amp;widget=false&amp;headers=false`;
    return(
        <iframe style={{'width':'100%', 'border':'none'}} src={embedLink}></iframe>
    );
}

// https://docs.google.com/spreadsheets/d/e/2PACX-1vTN1TnqxRYhVu1SXrxaQOa9S5sgpKalPyB5RpfknuBn4xwN_pafHtnF91Y96W09FNKkR271ObS2w9fC/pubhtml?gid=1398234006&single=false&widget=true&headers=false