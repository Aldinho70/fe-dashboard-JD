import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#e8931c',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#1f2937',
            secondary: '#4b5563',
        },
        background: {
            default: '#f3f4f6',
            paper: '#ffffff',
        },
        divider: '#d1d5db',
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f2bd4b',
            contrastText: '#111827',
        },
        text: {
            primary: '#f3f4f6',
            secondary: '#cbd5e1',
        },
        background: {
            default: '#111827',
            paper: '#1f2937',
        },
        divider: '#475569',
    },
});