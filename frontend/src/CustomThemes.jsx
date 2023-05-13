// disable eslint for this file
/* eslint-disable */
import { colors } from '@mui/material';

const darkShade = 400;
const lightShade = 600;
const darkShadeColorAxis = 300;

const maroon = {
    '50': 'f0e0e5',
    '100': 'd8b3bd',
    '200': 'bf8091',
    '300': 'a54d65',
    '400': '912644',
    '500': '7e0023',
    '600': '76001f',
    '700': '6b001a',
    '800': '610015',
    '900': '4e000c',
    'A100': 'ff8189',
    'A200': 'ff4e5a',
    'A400': 'ff1b2a',
    'A700': 'ff0212'
}

const CustomThemes = {
    dark: {
        palette: {
            mode: "dark",
            primary: {
                main: "#893ebd"
            },
            background: {
                paper: "#202020",
                default: "#303030"
            },
            customBackground: "#202020",
            customAlternateBackground: "#303030",
            chart: {
                optionsColors: {
                    monochromatic: [colors.purple[darkShade - 100], colors.purple[darkShade + 200]],
                    multiColor: [colors.blue[darkShade], colors.pink[darkShade], colors.amber[darkShade], colors.teal[darkShade], colors.grey[darkShade]],
                    grayscale: [colors.grey[darkShade + 100], colors.grey[darkShade + 300]],
                    rainbow: [colors.red[darkShade], colors.orange[darkShade], colors.amber[darkShade], colors.green[darkShade], colors.blue[darkShade], colors.indigo[darkShade], colors.deepPurple[darkShade]],
                    aqi: [colors.green[darkShade], colors.yellow[darkShade + 200], colors.orange[darkShade], colors.red[darkShade], colors.purple[darkShade], maroon[darkShade], maroon[darkShade], colors.grey[darkShade], colors.grey[darkShade + 200]]
                },
                colorAxisFirstColor: colors.grey[darkShadeColorAxis],
                aqiColorAxis: {
                    minValue: 0,
                    maxValue: 500,
                    colors: [colors.green[darkShade], colors.green[darkShade], colors.yellow[darkShade + 200], colors.yellow[darkShade + 200], colors.orange[darkShade], colors.orange[darkShade], colors.red[darkShade], colors.red[darkShade], colors.purple[darkShade], colors.purple[darkShade], maroon[darkShade], maroon[darkShade]],
                    values: [0, 50, 51, 100, 101, 150, 151, 200, 201, 300, 301, 500]
                },
                axisTitle: colors.grey[darkShade - 100],
                axisText: colors.grey[darkShade],
                gridlines: colors.grey[darkShade + 200],
                annotationBoxFill: colors.blueGrey[600]
            }
        }
    },
    light: {
        palette: {
            mode: "light",
            primary: {
                main: "#57068c"
            },
            customBackground: "#f6f6f6",
            customAlternateBackground: "#ffffff",
            chart: {
                optionsColors: {
                    monochromatic: [colors.purple[lightShade], colors.purple[lightShade - 300]],
                    multiColor: [colors.blue[lightShade], colors.pink[lightShade], colors.amber[lightShade], colors.teal[lightShade], colors.grey[lightShade]],
                    grayscale: [colors.grey[lightShade - 100], colors.grey[lightShade + 200]],
                    rainbow: [colors.red[lightShade], colors.orange[lightShade], colors.amber[lightShade], colors.green[lightShade], colors.blue[lightShade], colors.indigo[lightShade], colors.deepPurple[lightShade]],
                    aqi: [colors.green[lightShade], colors.yellow[lightShade], colors.orange[lightShade - 100], colors.red[lightShade], colors.purple[lightShade], maroon[lightShade], maroon[lightShade], colors.grey[lightShade], colors.grey[lightShade + 200]]
                },
                colorAxisFirstColor: colors.common.white,
                aqiColorAxis: {
                    minValue: 0,
                    maxValue: 500,
                    colors: [colors.green[lightShade], colors.green[lightShade], colors.yellow[lightShade], colors.yellow[lightShade], colors.orange[lightShade - 100], colors.orange[lightShade - 100], colors.red[lightShade], colors.red[lightShade], colors.purple[lightShade], colors.purple[lightShade], maroon[lightShade], maroon[lightShade]],
                    values: [0, 50, 51, 100, 101, 150, 151, 200, 201, 300, 301, 500]
                },
                axisTitle: colors.grey[lightShade + 100],
                axisText: colors.grey[lightShade],
                gridlines: colors.grey[lightShade - 200],
                annotationBoxFill: colors.blueGrey[800]
            }
        }
    },
    universal: {
        palette: {
            NYUpurple: "#57068c",
            backgroundColorForNavLink: "rgba(0, 0, 0, 0.2)",
        },
        typography: {
            fontFamily: "'IBM Plex Sans', sans-serif !important"
        }
    }
}

export default CustomThemes;