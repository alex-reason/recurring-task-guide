import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, Login, Signup, Create, Guide, Search } from './pages';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import { useThemeContext } from './hooks/useThemeContext';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const { mode } = useThemeContext();
  const { authIsReady, user } = useAuthContext();

  return (
    <div className={`app app${mode}`}>
      {authIsReady &&
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route
              path='/create'
              element={user ? <Create /> :(<Navigate to='/login' />)}
            />
            <Route
              path='/guides/:id'
              element={user ? <Guide /> : (<Navigate to='/login' />)}
            />
            <Route 
            path='/search' 
            element={user ? <Search/> : (<Navigate to='/login' />)}
            />

          </Routes>
        </BrowserRouter>}
    </div>
  )
};

export default App;