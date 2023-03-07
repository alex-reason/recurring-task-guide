import { useContext } from 'react';
import {ThemeContext} from '../context/ThemeContext'

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("use this hook inside a ThemeProvider only")
    }
    return context;
};