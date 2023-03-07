import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthContextProvider } from './context/AuthContext';
import './styles/index.scss';

const root = createRoot(document.querySelector('#root'));
root.render(
    <AuthContextProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </AuthContextProvider>
)