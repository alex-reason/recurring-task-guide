import { useThemeContext } from "../hooks/useThemeContext"
import darkLightIcon from '../assets/dark-light.svg';

const ThemeSelector = () => {
    const { changeColor, changeMode, mode } = useThemeContext();
    const themeColors = ['', '-blue', '-purple', '-red'];

    const renderedButtons = themeColors.map((color) => (
        <div
            className={`selector${color}`}
            key={`color-${color}`}
            onClick={() => changeColor(color)}
        />
    ));

    const toggleMode = () => {
        changeMode(mode === '-dark' ?'' : '-dark')
    };

    return (
        <div className='theme-select'>
            <div className='theme-select__mode'>
                <img
                    src={darkLightIcon}
                    onClick={toggleMode}
                    alt='dark or light'
                    style={{filter: mode === '-dark' ? 'invert(100%)' : 'invert(20%)'}}
                />
            </div>

            <div className='theme-select__buttons'>
                {renderedButtons}
            </div>
        </div>
    )
};

export default ThemeSelector;