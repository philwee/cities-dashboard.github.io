// disable eslint for this file
/* eslint-disable */
import { colors } from '@mui/material';

const darkShade = 400;
const lightShade = 600;
const darkShadeColorAxis = 300;

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
                    monochromatic: [colors.purple[darkShade-200], colors.purple[darkShade-100], colors.purple[darkShade], colors.purple[darkShade+100], colors.purple[darkShade+200], colors.purple[darkShade+300], colors.purple[darkShade+400]],
                    multiColor: [colors.blue[darkShade], colors.pink[darkShade], colors.amber[darkShade], colors.teal[darkShade], colors.blueGrey[darkShade]],
                    grayscale: [colors.grey[darkShade - 100], colors.grey, colors.grey[darkShade + 100]],
                    rainbow: [colors.red[darkShade], colors.orange[darkShade], colors.amber[darkShade], colors.green[darkShade], colors.blue[darkShade], colors.indigo[darkShade], colors.deepPurple[darkShade]]
                },
                colorAxisFirstColor: colors.grey[darkShadeColorAxis], 
                axisTitle: colors.grey[darkShade - 100],
                axisText: colors.grey[darkShade],
                gridlines: colors.grey[darkShade + 200],
                annotationBoxFill: colors.blueGrey[100]
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
                    monochromatic: [colors.purple[darkShade+300], colors.purple[darkShade+200], colors.purple[darkShade+100], colors.purple[darkShade], colors.purple[darkShade-100], colors.purple[darkShade-200], colors.purple[darkShade-300]],
                    multiColor: [colors.blue[lightShade], colors.pink[lightShade], colors.amber[lightShade], colors.teal[lightShade], colors.blueGrey[lightShade]],
                    grayscale: [colors.grey[lightShade + 100], colors.grey, colors.grey[lightShade + 100]],
                    rainbow: [colors.red[lightShade], colors.orange[lightShade], colors.amber[lightShade], colors.green[lightShade], colors.blue[lightShade], colors.indigo[lightShade], colors.deepPurple[lightShade]]
                },
                colorAxisFirstColor: colors.common.white, 
                axisTitle: colors.grey[lightShade + 100],
                axisText: colors.grey[lightShade],
                gridlines: colors.grey[lightShade - 200],
                annotationBoxFill: colors.blueGrey[100]
            }
        }
    },
    universal: {
        palette: {
            NYUpurple: "#57068c"
        },
        typography: {
            fontFamily: "'IBM Plex Sans', sans-serif !important"
        }
    }
}

export default CustomThemes;