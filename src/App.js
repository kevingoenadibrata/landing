import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import { ThemeProvider } from 'evergreen-ui';
import appTheme from './appTheme';

function App() {
    return (
        <div>
            <ThemeProvider value={appTheme}>
                <Routes>
                    <Route path="/view/:id" element={<Landing />} />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
