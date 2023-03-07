import { createContext, useReducer } from 'react';
import { themeReducer } from './ThemeReducer';
//context
export const ThemeContext = createContext();

//provider
export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, {
        bgColor: '',
        mode: 'dark'
    });

    const changeColor = (bgColor) => {
        dispatch({ type: 'CHANGE_COLOR', payload: bgColor })
    };

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    };

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}
